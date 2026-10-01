"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";

/**
 * Shared scroll reveals for server-rendered markup:
 *   data-split   heading lines rise from behind a mask
 *   data-reveal  fades up on entering the viewport (batched, staggered)
 */
export default function Motion() {
  useGSAP(() => {
    if (reducedMotion()) return;
    document.documentElement.classList.add("motion-ready");

    const splits: SplitText[] = [];
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              // Pad masks so descenders (g, p, y) aren't clipped.
              gsap.set(self.masks, { paddingBottom: ".14em", marginBottom: "-.14em" });
              return gsap.from(self.lines, {
                yPercent: 120,
                duration: 1.2,
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              });
            },
          })
        );
      });
      ScrollTrigger.refresh();
    });

    gsap.set("[data-reveal]", { autoAlpha: 0, y: 24 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%",
      once: true,
      onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06, overwrite: true }),
    });

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
    };
  });
  return null;
}
