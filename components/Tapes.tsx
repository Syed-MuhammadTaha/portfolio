"use client";

import { useRef } from "react";
import { tapes } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";


/** Skills as three crossing tapes (engineering, research, shared stack) that drift; fast scrolling briefly speeds them up, then they ease back. */
export default function Tapes() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const loops = gsap.utils.toArray<HTMLElement>(".run").map((el) => {
        const left = el.dataset.dir === "-1";
        return gsap.fromTo(el, { xPercent: left ? 0 : -50 }, { xPercent: left ? -50 : 0, duration: 60, ease: "none", repeat: -1 });
      });
      let settle: gsap.core.Tween | undefined;
      ScrollTrigger.create({
        onUpdate(self) {
          const boost = 1 + gsap.utils.clamp(0, 6, Math.abs(self.getVelocity()) / 300);
          loops.forEach((l) => gsap.to(l, { timeScale: boost, duration: 0.3, overwrite: true }));
          settle?.kill();
          settle = gsap.delayedCall(0.3, () => loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 1.2, overwrite: true })));
        },
      });
      gsap.from(".tape", {
        xPercent: (i) => (i % 2 ? 30 : -30),
        autoAlpha: 0,
        duration: 1.6,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="tapes" aria-hidden="true">
      {tapes.map((t, i) => {
        // Repeat the label + words enough times to fill the loop seamlessly.
        const reps = Math.max(2, Math.ceil(24 / (t.words.length + 1)));
        return (
          <div key={t.label} className={`tape t${i + 1}`}>
            <div className="run" data-dir={i % 2 ? "1" : "-1"}>
              {Array.from({ length: reps * 2 }, (_, r) => (
                <span key={r} className="seq">
                  <span className="lbl">{t.label}</span>
                  {t.words.map((w) => (
                    <span key={w}>
                      <i className="sq" />
                      {w}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
