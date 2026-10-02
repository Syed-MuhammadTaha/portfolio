"use client";

import { useRef, useState } from "react";
import { engineering, profile, research, type Role } from "@/lib/content";
import CodeLink from "@/components/CodeLink";
import { gsap, useGSAP, finePointer } from "@/lib/gsap";

type Track = "Engineering" | "Research";
/** Render a point, setting **figures** in bold. */
function Point({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? <b key={i}>{part.slice(2, -2)}</b> : <span key={i}>{part}</span>
      )}
    </>
  );
}
const plain = (t: string) => t.replace(/\*\*/g, "");

const tracks: { key: Track; n: string; roles: Role[]; cv: { href: string; label: string } }[] = [
  { key: "Engineering", n: "01", roles: engineering, cv: { href: profile.resume, label: "Résumé" } },
  { key: "Research", n: "02", roles: research, cv: { href: profile.academicCv, label: "Academic CV" } },
];

/**
 * Engineering and research as two separate tables. On desktop, hovering a row brings up a typeset
 * detail card that trails the cursor inside that table; on touch, tapping a row opens the same detail
 * as a frosted panel under the row, one row at a time.
 */
export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const peek = useRef<HTMLElement>(null);
  const [active, setActive] = useState<{ track: Track; role: Role } | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  // Card position follows the pointer with a little lag; flips sides near the viewport edge.
  const { contextSafe } = useGSAP(
    () => {
      if (peek.current) gsap.set(peek.current, { scale: 0.96, transformOrigin: "0 0" });
    },
    { scope: root }
  );

  const movers = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const place = contextSafe((e: React.PointerEvent) => {
    const el = peek.current;
    if (!el) return;
    movers.current ??= {
      x: gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" }),
    };
    const w = el.offsetWidth, h = el.offsetHeight, m = 16;
    let x = e.clientX + 28, y = e.clientY + 20;
    if (x + w > innerWidth - m) x = e.clientX - w - 28;
    if (y + h > innerHeight - m) y = innerHeight - h - m;
    movers.current.x(x);
    movers.current.y(y);
  });
  const show = contextSafe((e: React.PointerEvent) => {
    if (!finePointer() || !peek.current) return;
    gsap.set(peek.current, { x: e.clientX + 28, y: e.clientY + 20 });
    gsap.to(peek.current, { autoAlpha: 1, scale: 1, duration: 0.45, overwrite: "auto" });
  });
  const hide = contextSafe(() => {
    if (!peek.current) return;
    gsap.to(peek.current, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: "power2.in", overwrite: "auto" });
    setActive(null);
  });

  // Each time the row changes, the card's lines stagger in.
  useGSAP(
    () => {
      if (!active || !peek.current) return;
      gsap.fromTo(
        peek.current.querySelectorAll(".peek-org, .peek-role, .peek-pts li, .peek-tags"),
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, overwrite: true }
      );
    },
    { dependencies: [active], scope: root }
  );

  return (
    <section ref={root} id="work" className="wrap exp" aria-labelledby="exp-title">
      <div className="exp-head">
        <h2 id="exp-title" data-split>
          Experience
        </h2>
        <p className="small" data-reveal>
          <span className="on-hover">Hover a row for the detail.</span>
          <span className="on-touch">Click a row for the detail.</span>
        </p>
      </div>

      {tracks.map((t) => (
        <div key={t.key} className="track">
          <div className="track-label">
            <span className="mono" aria-hidden="true">
              {`{ ${t.n} }`}
            </span>
            <h3>{t.key}</h3>
            <CodeLink className="count" href={t.cv.href}>
              {t.cv.label} ↓
            </CodeLink>
          </div>
          <ul className="rows" onPointerEnter={show} onPointerLeave={hide} onPointerMove={place}>
            {t.roles.map((r, i) => (
              <li
                key={r.org + r.when}
                className={`row${open === r.org + r.when ? " open" : ""}`}
                tabIndex={0}
                data-reveal
                aria-expanded={finePointer() ? undefined : open === r.org + r.when}
                onPointerEnter={() => finePointer() && setActive({ track: t.key, role: r })}
                onClick={() => !finePointer() && setOpen((o) => (o === r.org + r.when ? null : r.org + r.when))}
                aria-label={`${r.org} ${r.orgItalic ?? ""}, ${r.role}, ${r.when}. ${r.points.map(plain).join(". ")}`}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="org">
                  {r.org} {r.orgItalic}
                </span>
                <span className="rl">{r.role}</span>
                <span className="when">{r.when}</span>
                <span className="pm" aria-hidden="true" />
                <span className="detail">
                  <span>
                    <span className="dglass glass">
                      <i className="peek-tick" />
                      <ul className="peek-pts">
                        {r.points.map((p) => (
                          <li key={p}>
                            <span>
                              <Point text={p} />
                            </span>
                          </li>
                        ))}
                      </ul>
                      <span className="peek-tags mono">
                        {r.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <aside ref={peek} className="peek glass" aria-hidden="true">
        <i className="peek-tick" />
        {active && (
          <>
            <div className="peek-meta mono">
              <span>{`{ ${active.track} }`}</span>
              <span>{active.role.when}</span>
            </div>
            <div className="peek-org">
              {active.role.org} {active.role.orgItalic && <em>{active.role.orgItalic}</em>}
            </div>
            <div className="peek-role">{active.role.role}</div>
            <ul className="peek-pts">
              {active.role.points.map((p) => (
                <li key={p}>
                  <span>
                    <Point text={p} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="peek-tags mono">
              {active.role.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </>
        )}
      </aside>
    </section>
  );
}
