"use client";

import { useRef } from "react";
import { statement } from "@/lib/content";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import CodeLink from "@/components/CodeLink";

// "*word*" segments render dimmed.
const parts = statement.text.split(/(\*[^*]+\*)/).filter(Boolean);

/** Large caps statement whose words light up one by one as you scroll through it. */
export default function Statement() {
  const h = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !h.current) return;
      const split = SplitText.create(h.current, { type: "words", wordsClass: "w" });
      split.words.forEach((w, i, all) => {
        const dim = (w as HTMLElement).closest(".dim");
        gsap.fromTo(
          w,
          { color: "#3a3a3a" },
          {
            color: dim ? "#9a9893" : "#ecebe7",
            ease: "none",
            scrollTrigger: {
              trigger: h.current,
              start: () => `top+=${(i / all.length) * 100}% 75%`,
              end: () => `top+=${((i + 1) / all.length) * 100}% 75%`,
              scrub: true,
            },
          }
        );
      });
      return () => split.revert();
    },
    { scope: h }
  );

  return (
    <div className="wrap statement">
      <div>
        <span className="sq" aria-hidden="true" />
        <p className="small">{statement.aside}</p>
        <CodeLink href="#work">About</CodeLink>
      </div>
      <h2 ref={h} className="h-caps">
        {parts.map((p, i) =>
          p.startsWith("*") ? (
            <span key={i} className="dim">
              {p.slice(1, -1)}
            </span>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </h2>
    </div>
  );
}
