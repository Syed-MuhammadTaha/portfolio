"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { unlitGrid, ambientFps } from "@/lib/dots";

/** Grid: N × N dots, the same dot language as the research tiles. */
const N = 44;

// The torus is sampled at fixed angles, so their sines and cosines are computed once, not per frame.
// Dense enough that every cell the ring covers is hit at every angle (sparser leaves streaks of gaps).
const TH = 126, PH = 315;
const cosT = new Float32Array(TH), sinT = new Float32Array(TH), cosP = new Float32Array(PH), sinP = new Float32Array(PH);
for (let i = 0; i < TH; i++) {
  cosT[i] = Math.cos((i / TH) * Math.PI * 2);
  sinT[i] = Math.sin((i / TH) * Math.PI * 2);
}
for (let j = 0; j < PH; j++) {
  cosP[j] = Math.cos((j / PH) * Math.PI * 2);
  sinP[j] = Math.sin((j / PH) * Math.PI * 2);
}

/**
 * The spinning donut (after Andy Sloane's donut.c), rendered into the site's dot matrix: a torus is
 * sampled, projected and z-buffered onto the grid, and each dot swells with how much light that
 * point of the surface catches.
 */
export default function ProjectArt({ label }: { label: string }) {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = reducedMotion();
    let w = 0, raf = 0, visible = false, grid: HTMLCanvasElement | null = null;
    let A = 0.9, B = 0.4;
    const z = new Float32Array(N * N);
    const lum = new Float32Array(N * N);
    const R1 = 1, R2 = 2, K2 = 5, K1 = (N * K2 * 3) / (8 * (R1 + R2));
    const step = 1000 / ambientFps();

    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = canvas.clientWidth;
      if (!w) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = unlitGrid(N, w, dpr);
    };

    const shade = () => {
      z.fill(0);
      lum.fill(0);
      const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
      for (let i = 0; i < TH; i++) {
        const ct = cosT[i], st = sinT[i];
        const cx = R2 + R1 * ct, cy = R1 * st;
        for (let j = 0; j < PH; j++) {
          const cp = cosP[j], sp = sinP[j];
          const x = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
          const y = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
          const ooz = 1 / (K2 + cA * cx * sp + cy * sA);
          const xp = (N / 2 + K1 * ooz * x) | 0, yp = (N / 2 - K1 * ooz * y) | 0;
          if (xp < 0 || xp >= N || yp < 0 || yp >= N) continue;
          const k = xp + yp * N;
          if (ooz > z[k]) {
            z[k] = ooz;
            const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
            lum[k] = L > 0 ? L / Math.SQRT2 : 0;
          }
        }
      }
    };

    const draw = () => {
      if (!w) return;
      shade();
      const pitch = w / N, rMax = pitch * 0.46, rMin = pitch * 0.07;
      ctx.clearRect(0, 0, w, w);
      if (grid) ctx.drawImage(grid, 0, 0, w, w);
      ctx.fillStyle = "#ecebe7";
      ctx.beginPath();
      for (let k = 0; k < N * N; k++) {
        // The surface in shadow still shows faintly, so the whole ring reads.
        if (!z[k]) continue;
        const v = 0.05 + 0.95 * lum[k] ** 1.6;
        const r = rMin * 1.4 + (rMax - rMin * 1.4) * v;
        const x = ((k % N) + 0.5) * pitch, y = (((k / N) | 0) + 0.5) * pitch;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    // Turns by elapsed time, so a lower frame rate on phones changes smoothness, not speed.
    let last = performance.now(), drawn = 0;
    const loop = (now: number) => {
      raf = visible ? requestAnimationFrame(loop) : 0;
      // Nothing to see behind the open menu.
      if (now - drawn < step - 2 || document.documentElement.classList.contains("menu-open")) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = drawn = now;
      A += dt * 0.9;
      B += dt * 0.45;
      draw();
    };
    size();
    draw();
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !still && !raf) {
        last = drawn = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={cv} role="img" aria-label={label} />;
}
