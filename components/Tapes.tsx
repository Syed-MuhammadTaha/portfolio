"use client";

import { useRef } from "react";
import { tapeWords } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";

const run = Array.from({ length: 6 }, () => tapeWords).flat();

/** Three crossing tapes that drift; fast scrolling briefly speeds them up, then they ease back. */
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
      {[
        ["t1", "-1"],
        ["t2", "1"],
        ["t3", "-1"],
      ].map(([cls, dir]) => (
        <div key={cls} className={`tape ${cls}`}>
          <div className="run" data-dir={dir}>
            {run.map((w, i) => (
              <span key={i}>
                <i className="sq" />
                {w}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
