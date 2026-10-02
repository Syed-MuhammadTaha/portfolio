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
      // Scrolling fast speeds the tapes up, then they ease back. One per-frame update eases the
      // speed toward a target set by scroll velocity, instead of new tweens on every scroll event.
      let target = 1, speed = 1;
      const st = ScrollTrigger.create({
        onUpdate(self) {
          target = 1 + gsap.utils.clamp(0, 6, Math.abs(self.getVelocity()) / 300);
        },
      });
      const tick = () => {
        target += (1 - target) * 0.04;
        const next = speed + (target - speed) * 0.12;
        if (Math.abs(next - speed) < 0.001) return;
        speed = next;
        loops.forEach((l) => l.timeScale(speed));
      };
      gsap.ticker.add(tick);
      // Off screen, the tapes stop moving entirely, so they cost nothing while you read elsewhere.
      const view = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loops.forEach((l) => l.paused(!self.isActive)),
      });
      if (!view.isActive) loops.forEach((l) => l.pause());
      gsap.from(".tape", {
        xPercent: (i) => (i % 2 ? 30 : -30),
        autoAlpha: 0,
        duration: 1.6,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        view.kill();
      };
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
