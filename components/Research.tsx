"use client";

import { useRef } from "react";
import { metrics, papers, researchIntro, tiles } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import HalftoneTile from "@/components/HalftoneTile";
import CodeLink from "@/components/CodeLink";

const GLYPHS = "0123456789%.–≥";

export default function Research() {
  const root = useRef<HTMLElement>(null);

  // Figures scramble like a running computation, then lock to the result, left to right.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".metric .v").forEach((el) => {
        const final = el.dataset.final ?? el.textContent ?? "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter() {
            const o = { p: 0 };
            gsap.to(o, {
              p: 1,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                const locked = Math.floor(o.p * final.length);
                el.textContent = [...final].map((c, i) => (i < locked ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
              },
              onComplete: () => {
                el.textContent = final;
              },
            });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="research" className="wrap lab" aria-labelledby="lab-title">
      <div className="lab-head">
        <h2 id="lab-title" data-split>
          Inside the <em>research</em>
        </h2>
        <p className="small" data-reveal>
          {researchIntro}
        </p>
      </div>

      <div className="tiles">
        {tiles.map((t) => (
          <figure key={t.field} className="tile" data-reveal>
            <HalftoneTile field={t.field} label={t.label} />
            <figcaption>
              <span className="cap mono">
                <span className="sq" aria-hidden="true" />
                {t.title}
              </span>
              <p className="note">{t.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <dl className="metrics">
        {metrics.map((m) => (
          <div key={m.value} className="metric" data-reveal>
            <dt className="sr-only">{m.label}</dt>
            <dd className="v" data-final={m.value} aria-label={m.value}>
              {m.value}
            </dd>
            <dd className="k" aria-hidden="true">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>

      <ol className="papers">
        {papers.map((p) => (
          <li key={p.id} className="paper" data-reveal>
            <span className="mono">{p.id}</span>
            <div>
              <h3 className="t">{p.title}</h3>
              <p className="a">
                {p.authors.map((a, i) => (
                  <span key={a}>
                    {i > 0 && ", "}
                    {a === "Taha" ? <b>{a}</b> : a}
                  </span>
                ))}
                {p.authors.length > 0 && ", "}
                {p.venue}
              </p>
            </div>
            {p.href ? (
              <CodeLink className="s" href={p.href}>
                DOI ↗
              </CodeLink>
            ) : (
              <span className="s mono">{p.status}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
