"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { playIntro } from "@/lib/intro";
import { LOGO_PATH } from "@/components/Logo";

/** First visit of a session: the mark draws itself stroke by stroke, holds, then the curtain lifts. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (!playIntro()) {
        el.remove();
        return;
      }
      el.style.display = "grid";
      const paths = gsap.utils.toArray<SVGPathElement>("path", el);
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap
        .timeline({ onComplete: () => el.remove() })
        .to(paths, { strokeDashoffset: 0, duration: 0.55, stagger: 0.12, ease: "power2.inOut" })
        .to(el.querySelector(".loader-name"), { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "+=0.15");
    },
    { scope: root }
  );

  // Each stroke of the mark is its own path, so they draw in sequence (ط, then the baseline, then ه).
  const strokes = LOGO_PATH.split(" M").map((d, i) => (i ? `M${d}` : d));

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader-inner">
        <svg viewBox="0 0 100 100" width="96" height="96">
          {strokes.map((d) => (
            <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth={12} strokeLinecap="square" />
          ))}
        </svg>
        <span className="loader-name mono">Syed Taha</span>
      </div>
    </div>
  );
}
