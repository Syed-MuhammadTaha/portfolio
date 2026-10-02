"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";

/** Grid: N × N dots, the same dot language as the research tiles. */
const N = 44;

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
    let w = 0, raf = 0, visible = false;
    let A = 0.9, B = 0.4;
    const z = new Float32Array(N * N);
    const lum = new Float32Array(N * N);
    const R1 = 1, R2 = 2, K2 = 5, K1 = (N * K2 * 3) / (8 * (R1 + R2));

    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const shade = () => {
      z.fill(0);
      lum.fill(0);
      const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
      for (let th = 0; th < 6.283; th += 0.05) {
        const ct = Math.cos(th), st = Math.sin(th);
        for (let ph = 0; ph < 6.283; ph += 0.02) {
          const cp = Math.cos(ph), sp = Math.sin(ph);
          const cx = R2 + R1 * ct, cy = R1 * st;
          const x = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
          const y = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
          const ooz = 1 / (K2 + cA * cx * sp + cy * sA);
          const xp = Math.floor(N / 2 + K1 * ooz * x), yp = Math.floor(N / 2 - K1 * ooz * y);
          if (xp < 0 || xp >= N || yp < 0 || yp >= N) continue;
          const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
          const k = xp + yp * N;
          if (ooz > z[k]) {
            z[k] = ooz;
            lum[k] = Math.max(0, L) / Math.SQRT2;
          }
        }
      }
    };

    const draw = () => {
      shade();
      const pitch = w / N, rMax = pitch * 0.46, rMin = pitch * 0.07;
      ctx.clearRect(0, 0, w, w);
      ctx.fillStyle = "rgba(236,235,231,0.14)";
      ctx.beginPath();
      for (let k = 0; k < N * N; k++) {
        const x = ((k % N) + 0.5) * pitch, y = (Math.floor(k / N) + 0.5) * pitch;
        ctx.moveTo(x + rMin, y);
        ctx.arc(x, y, rMin, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.fillStyle = "#ecebe7";
      ctx.beginPath();
      for (let k = 0; k < N * N; k++) {
        // The surface in shadow still shows faintly, so the whole ring reads.
        if (!z[k]) continue;
        const v = 0.05 + 0.95 * lum[k] ** 1.6;
        const r = rMin * 1.4 + (rMax - rMin * 1.4) * v;
        const x = ((k % N) + 0.5) * pitch, y = (Math.floor(k / N) + 0.5) * pitch;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      A += dt * 0.9;
      B += dt * 0.45;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
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
        last = performance.now();
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
