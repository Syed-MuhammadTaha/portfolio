"use client";

import { useRef } from "react";
import { projects } from "@/lib/content";
import { reducedMotion } from "@/lib/gsap";
import CodeLink from "@/components/CodeLink";

/**
 * Selected projects as a terminal list. Hovering (or focusing) a project opens it and types out
 * a command and its result, with a blinking cursor; the summary and stack sit underneath.
 */
export default function Projects() {
  const timers = useRef(new Map<number, ReturnType<typeof setInterval>>());

  const type = (i: number, el: HTMLElement | null) => {
    if (!el) return;
    const p = projects[i];
    const full = `${p.command}   ${p.result}`;
    clearInterval(timers.current.get(i));
    if (reducedMotion()) {
      el.textContent = full;
      return;
    }
    let k = 0;
    el.textContent = "";
    timers.current.set(
      i,
      setInterval(() => {
        el.textContent = full.slice(0, ++k);
        if (k >= full.length) clearInterval(timers.current.get(i));
      }, 18)
    );
  };

  return (
    <section id="projects" className="wrap proj" aria-labelledby="proj-title">
      <div className="proj-head">
        <h2 id="proj-title" data-split>
          Selected <em>projects</em>
        </h2>
        <p className="small" data-reveal>
          Hover a project to run it.
        </p>
      </div>

      <ul className="proj-list">
        {projects.map((p, i) => (
          <li
            key={p.name}
            className="prow"
            data-reveal
            onPointerEnter={(e) => type(i, e.currentTarget.querySelector(".typed"))}
            onFocus={(e) => type(i, e.currentTarget.querySelector(".typed"))}
          >
            <span className="n dot" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>
              {p.name} {p.nameItalic && <em>{p.nameItalic}</em>}
            </h3>
            <CodeLink href={p.repo}>GitHub ↗</CodeLink>
            <div className="shell">
              <div>
                <p className="line" aria-hidden="true">
                  <span className="p">~</span>
                  <span className="typed">
                    {p.command}   {p.result}
                  </span>
                  <span className="cur" />
                </p>
                <p className="sum">{p.summary}</p>
                <div className="tags mono">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
