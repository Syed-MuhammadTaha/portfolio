"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { playIntro } from "@/lib/intro";
import { SIG_PATH, SIG_VIEWBOX } from "@/components/Logo";

/**
 * First visit of a session: the signature signs itself in one stroke, then glides into the logo
 * spot at the top left while the paper fades and the hero builds behind it.
 */
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
      const sig = el.querySelector("svg")!;
      const path = sig.querySelector("path")!;
      const mark = document.querySelector<SVGSVGElement>(".topbar .mark svg");
      if (mark) gsap.set(mark, { autoAlpha: 0 });
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      // Where the signature lands: the hero logo's box, matched in position, size and line weight.
      const land = () => {
        if (!mark) return null;
        const a = sig.getBoundingClientRect();
        const b = mark.getBoundingClientRect();
        const s = b.width / a.width;
        return { x: b.left - a.left, y: b.top - a.top, scale: s, weight: Number(mark.querySelector("path")?.getAttribute("stroke-width")) || 7 };
      };

      const tl = gsap.timeline({
        onComplete: () => {
          if (mark) gsap.set(mark, { autoAlpha: 1 });
          el.remove();
        },
      });
      tl.to(path, { strokeDashoffset: 0, duration: 1.8, ease: "none" })
        .to(el.querySelector(".loader-name"), { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2")
        .addLabel("fly", "+=0.25")
        .to(el.querySelector(".loader-name"), { autoAlpha: 0, y: -6, duration: 0.3 }, "fly")
        .add(() => {
          const t = land();
          if (!t) return;
          gsap.to(sig, { x: t.x, y: t.y, scale: t.scale, transformOrigin: "0 0", duration: 1, ease: "expo.inOut" });
          gsap.to(path, { attr: { "stroke-width": t.weight }, duration: 1, ease: "expo.inOut" });
        }, "fly")
        .to(el.querySelector(".loader-bg"), { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" }, "fly+=0.2")
        .to({}, { duration: 1 }, "fly");
    },
    { scope: root }
  );

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader-bg" />
      <div className="loader-inner">
        <svg viewBox={SIG_VIEWBOX} width="220" style={{ height: "auto" }}>
          <path d={SIG_PATH} fill="none" stroke="currentColor" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="loader-name mono">Syed Taha</span>
      </div>
    </div>
  );
}
