"use client";

import { useEffect, useRef } from "react";

/**
 * Static film grain, generated once at the element's size so it never tiles or repeats.
 * Drawn once (and again only on resize). Mid-grey noise blended with `overlay`, so it lightens and
 * darkens evenly instead of greying the image.
 */
export default function Grain({ amount = 30 }: { amount?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      // Rendered below CSS resolution on purpose: the browser's smoothing turns each sample into a
      // soft ~1.6px clump, closer to printed film grain than crisp digital noise.
      const w = Math.round(canvas.clientWidth / 1.6);
      const h = Math.round(canvas.clientHeight / 1.6);
      if (!w || !h || (canvas.width === w && canvas.height === h)) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        // Sum of two uniforms ≈ triangular distribution: soft, few harsh specks.
        const v = 128 + (Math.random() + Math.random() - 1) * amount;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [amount]);

  return <canvas ref={ref} className="grain" aria-hidden="true" />;
}
