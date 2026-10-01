"use client";

import { useRef } from "react";
import type { Field } from "@/lib/content";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

/** Grid: N × N dots per tile. */
const N = 30;

/** Greyscale fields in [0, 1]; each dot on the grid swells with the field's value at its centre. */
const fields: Record<Field, (x: number, y: number) => number> = {
  // Layer-similarity matrix.
  cka(x, y) {
    // A crisp diagonal, with the three similar blocks only faintly filled.
    const diag = Math.exp(-Math.abs(x - y) * 26) * 0.95;
    const block = Math.floor(x * 3) === Math.floor(y * 3) ? 0.035 : 0;
    return Math.min(1, diag + block);
  },
  // A stack of layers; each input's band is full until its exit point, then fades out.
  exit(x, y) {
    const layer = Math.floor(y * 10), band = (y * 10) % 1;
    const exitAt = 0.5 + 0.3 * Math.sin(layer * 1.3);
    const on = band > 0.2 && band < 0.8 ? (x < exitAt ? 1 : Math.max(0, 0.4 - (x - exitAt) * 1.6)) : 0;
    return on * (0.6 + 0.4 * (1 - layer / 10));
  },
  // Large teacher distilled into a small student.
  distil(x, y) {
    const teacher = Math.max(0, 1 - Math.hypot(x - 0.34, y - 0.5) / 0.3);
    const student = Math.max(0, 1 - Math.hypot(x - 0.8, y - 0.5) / 0.12);
    const beam = x > 0.34 && x < 0.8 && Math.abs(y - 0.5) < 0.06 * (1 - (x - 0.34) / 0.5) ? 0.45 : 0;
    return Math.min(1, teacher * 0.9 + student + beam);
  },
  // Branching reasoning steps, pruned as they deepen.
  agent(x, y) {
    let v = 0;
    const branch = (px: number, py: number, ang: number, len: number, depth: number) => {
      if (depth > 3) return;
      const ex = px + Math.cos(ang) * len, ey = py + Math.sin(ang) * len;
      const t = Math.max(0, Math.min(1, ((x - px) * (ex - px) + (y - py) * (ey - py)) / (len * len)));
      const dd = Math.hypot(x - (px + (ex - px) * t), y - (py + (ey - py) * t));
      // Strokes thin out and fade with depth, so the tips stay light.
      const weight = 1 - depth * 0.22;
      v = Math.max(v, Math.max(0, 1 - dd / (0.034 - depth * 0.006)) * weight);
      v = Math.max(v, Math.max(0, 1 - Math.hypot(x - ex, y - ey) / (0.042 - depth * 0.008)) * weight);
      // Only some branches continue: the rest are pruned.
      if (depth === 0 || (depth + Math.floor(ex * 10)) % 2 === 0) {
        branch(ex, ey, ang - 0.45, len * 0.7, depth + 1);
        branch(ex, ey, ang + 0.4, len * 0.7, depth + 1);
      }
    };
    branch(0.1, 0.5, 0, 0.3, 0);
    return v;
  },
};

/**
 * A research diagram as a dot matrix on the black page. Every grid position holds a dot; unlit dots
 * are pinpricks, lit dots swell with the picture's intensity. The picture develops left to right
 * as it scrolls in, and dots near the cursor grow a little.
 */
export default function HalftoneTile({ field, label }: { field: Field; label: string }) {
  const cv = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const f = fields[field];
    // Sample once: value at each dot centre.
    const vals = Array.from({ length: N * N }, (_, k) => f(((k % N) + 0.5) / N, (Math.floor(k / N) + 0.5) / N));
    const state = { progress: reducedMotion() ? 1 : 0, lens: 0, lx: -999, ly: -999 };
    let w = 0;

    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      const pitch = w / N, rMax = pitch * 0.46, rMin = pitch * 0.07;
      ctx.clearRect(0, 0, w, w);
      // Unlit grid first, in one pass.
      ctx.fillStyle = "rgba(236,235,231,0.14)";
      ctx.beginPath();
      for (let k = 0; k < N * N; k++) {
        const x = ((k % N) + 0.5) * pitch, y = (Math.floor(k / N) + 0.5) * pitch;
        ctx.moveTo(x + rMin, y);
        ctx.arc(x, y, rMin, 0, Math.PI * 2);
      }
      ctx.fill();
      // Lit dots: size follows the field; each column grows in as the sweep passes it.
      ctx.fillStyle = "#ecebe7";
      ctx.beginPath();
      for (let k = 0; k < N * N; k++) {
        const c = k % N, v = vals[k];
        if (v < 0.02) continue;
        const local = Math.min(1, Math.max(0, state.progress * (N + 6) - c) / 6);
        if (local <= 0) continue;
        const x = (c + 0.5) * pitch, y = (Math.floor(k / N) + 0.5) * pitch;
        let r = rMin + (rMax - rMin) * Math.sqrt(v) * local;
        if (state.lens > 0.001) r = Math.min(rMax * 1.15, r * (1 + 0.45 * state.lens * Math.exp(-((x - state.lx) ** 2 + (y - state.ly) ** 2) / (pitch * pitch * 12))));
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    size();
    draw();
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    if (reducedMotion()) return () => ro.disconnect();

    gsap.to(state, {
      progress: 1,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: draw,
      scrollTrigger: { trigger: canvas, start: "top 85%", once: true },
    });
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      state.lx = e.clientX - b.left;
      state.ly = e.clientY - b.top;
      gsap.to(state, { lens: 1, duration: 0.35, overwrite: "auto", onUpdate: draw });
      draw();
    };
    const leave = () => gsap.to(state, { lens: 0, duration: 1, overwrite: "auto", onUpdate: draw });
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  });

  return <canvas ref={cv} role="img" aria-label={label} />;
}
