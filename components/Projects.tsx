"use client";

import { useRef } from "react";
import { projects } from "@/lib/content";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import CodeLink from "@/components/CodeLink";
import ProjectArt from "@/components/ProjectArt";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected projects beside a fixed piece: the spinning donut in the site's dot matrix stays pinned on
 * the right while the projects arrive one by one on the left. The project in focus is lit, the
 * others rest dimmed.
 */
export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const steps = root.current?.querySelector<HTMLElement>(".proj-steps");
      if (!steps) return;
      const rows = Array.from(steps.querySelectorAll<HTMLElement>(".pstep"));
      const n = rows.length;
      // A step's centre crossing the focus line maps to whole numbers: 0 for the first, n - 1 for the last.
      ScrollTrigger.create({
        trigger: steps,
        start: "top 55%",
        end: "bottom 55%",
        onUpdate: (st) => {
          const i = Math.round(Math.max(0, Math.min(n - 1, st.progress * n - 0.5)));
          rows.forEach((r, k) => r.classList.toggle("on", k === i));
        },
        onEnter: () => rows[0].classList.add("on"),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="projects" className="wrap proj" aria-labelledby="proj-title">
      <div className="proj-head">
        <h2 id="proj-title" data-split>
          Selected <em>projects</em>
        </h2>
      </div>

      <div className="proj-stage">
        <ol className="proj-steps">
          {projects.map((p, i) => (
            <li key={p.name} className="pstep">
              <div className="pstep-in">
                <span className="cap mono">
                  <span className="sq" aria-hidden="true" />
                  {`{ ${pad(i + 1)} / ${pad(projects.length)} }`}
                </span>
                <h3>
                  {p.name} {p.nameItalic && <em>{p.nameItalic}</em>}
                </h3>
                <p className="sum">{p.summary}</p>
                <div className="pfoot">
                  <div className="tags mono">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <CodeLink href={p.repo}>GitHub ↗</CodeLink>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="proj-art" aria-hidden="true">
          <div className="proj-art-in">
            <ProjectArt label="" />
          </div>
        </div>
      </div>
    </section>
  );
}

