"use client";

import { useRef } from "react";
import type { Field } from "@/lib/content";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { unlitGrid, ambientFps } from "@/lib/dots";

/** Grid: N × N dots per tile. */
const N = 30;

/** Deterministic noise in [0, 1) for a pair of integers. */
const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/** Distance from (x, y) to the segment a→b. */
const seg = (x: number, y: number, [ax, ay]: number[], [bx, by]: number[]) => {
  const dx = bx - ax, dy = by - ay;
  const t = Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
};

/** A left curly brace as a polyline, centred on x = 0, from y = 0.12 to 0.88. */
const BRACE = [
  [0.1, 0.12], [0.03, 0.14], [0, 0.2], [0, 0.42], [-0.03, 0.48], [-0.08, 0.5],
  [-0.03, 0.52], [0, 0.58], [0, 0.8], [0.03, 0.86], [0.1, 0.88],
];

/** Fields that move. They take the time in seconds, and hold a fixed frame for reduced motion. */
const ANIMATED: Partial<Record<Field, true>> = { leak: true };
const STILL_T = 7.3;

/** Greyscale fields in [0, 1]; each dot on the grid swells with the field's value at its centre. */
const fields: Record<Field, (x: number, y: number, t: number) => number> = {
  // A waffle of 100 requests in order of the small model's confidence. Small dots are answered by the
  // small model, large blocks escalate to the large one. 67 of 100 stay small.
  escort(x, y) {
    const c = Math.floor(x * 30), r = Math.floor(y * 30);
    const i = Math.floor(r / 3) * 10 + Math.floor(c / 3), u = c % 3, v = r % 3;
    if (i < 67) return u === 1 && v === 1 ? 0.55 : 0;
    return u < 2 && v < 2 ? 0.95 : 0;
  },
  // Large teacher distilled into a small student.
  distil(x, y) {
    const teacher = Math.max(0, 1 - Math.hypot(x - 0.34, y - 0.5) / 0.3);
    const student = Math.max(0, 1 - Math.hypot(x - 0.8, y - 0.5) / 0.12);
    const beam = x > 0.34 && x < 0.8 && Math.abs(y - 0.5) < 0.06 * (1 - (x - 0.34) / 0.5) ? 0.45 : 0;
    return Math.min(1, teacher * 0.9 + student + beam);
  },
  // Two big curly braces, the shape of a tool call.
  amend(x, y) {
    let d = 9;
    for (const [cx, dir] of [[0.27, 1], [0.73, -1]])
      for (let i = 0; i < BRACE.length - 1; i++) {
        const [ax, ay] = BRACE[i], [bx, by] = BRACE[i + 1];
        d = Math.min(d, seg(x, y, [cx + dir * ax, ay], [cx + dir * bx, by]));
      }
    return d < 0.03 ? 1 : d < 0.045 ? 0.2 : 0;
  },
  // Encrypted traffic as code rain. Every other column drips a stream with a bright head and a
  // flickering tail that fades out.
  leak(x, y, t) {
    const c = Math.floor(x * 30), r = Math.floor(y * 30);
    if (c % 2) return 0;
    const speed = 5 + 7 * hash(c, 11), len = 9 + Math.floor(10 * hash(c, 23));
    const span = 30 + len + 14 * hash(c, 37);
    const d = ((hash(c, 51) * span + t * speed) % span) - r;
    if (d < 0 || d >= len) return 0;
    if (d < 1) return 1;
    if (hash(c * 31 + r, Math.floor(t * 8)) < 0.2) return 0;
    return 0.08 + 0.55 * Math.pow(1 - d / len, 1.4);
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
    // Value at each dot centre, sampled once, or every frame for a moving field.
    const vals = new Float32Array(N * N);
    const sample = (t: number) => {
      for (let k = 0; k < N * N; k++) vals[k] = f(((k % N) + 0.5) / N, (Math.floor(k / N) + 0.5) / N, t);
    };
    sample(STILL_T);
    const state = { progress: reducedMotion() ? 1 : 0, lens: 0, lx: -999, ly: -999 };
    let w = 0, grid: HTMLCanvasElement | null = null, queued = 0;

    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = w ? unlitGrid(N, w, dpr) : null;
    };
    const draw = () => {
      queued = 0;
      const pitch = w / N, rMax = pitch * 0.46, rMin = pitch * 0.07;
      ctx.clearRect(0, 0, w, w);
      // Unlit grid, drawn once per size and stamped.
      if (grid) ctx.drawImage(grid, 0, 0, w, w);
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
    // The lens follows the pointer at most once per frame; it swells in on entry and out on leave.
    const queue = () => (queued ||= requestAnimationFrame(draw));
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      state.lx = e.clientX - b.left;
      state.ly = e.clientY - b.top;
      queue();
    };
    const enter = () => gsap.to(state, { lens: 1, duration: 0.35, overwrite: "auto", onUpdate: queue });
    const leave = () => gsap.to(state, { lens: 0, duration: 1, overwrite: "auto", onUpdate: queue });
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerenter", enter);
    canvas.addEventListener("pointerleave", leave);

    // A moving field runs only while on screen, at the ambient frame rate, and not behind the menu.
    let raf = 0, visible = false, drawn = 0;
    const t0 = performance.now() - STILL_T * 1000, step = 1000 / ambientFps();
    const loop = (now: number) => {
      raf = visible ? requestAnimationFrame(loop) : 0;
      if (now - drawn < step - 2 || document.documentElement.classList.contains("menu-open")) return;
      drawn = now;
      sample((now - t0) / 1000);
      draw();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    if (ANIMATED[field]) io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(queued);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerenter", enter);
      canvas.removeEventListener("pointerleave", leave);
    };
  });

  return <canvas ref={cv} role="img" aria-label={label} />;
}
