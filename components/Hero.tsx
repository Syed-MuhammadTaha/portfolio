"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import portrait from "@/assets/bento.png";
import { profile, links } from "@/lib/content";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import Clock from "@/components/Clock";
import CodeLink from "@/components/CodeLink";
import Grain from "@/components/Grain";
import Logo from "@/components/Logo";
import { playIntro, INTRO_DELAY } from "@/lib/intro";

const menuItems = [
  { href: "#work", label: "Experience", em: "two tracks" },
  { href: "#research", label: "Research", em: "so far" },
  { href: "#projects", label: "Projects", em: "built" },
  { href: "#contact", label: "Contact", em: "say hi" },
];

/** Four columns spell T · A · H · A; the portrait fills column two, under a film grain. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Intro: columns wipe up, letters rise, dot-matrix indices tick 00 → 0n. Scroll adds gentle parallax.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const idx = gsap.utils.toArray<HTMLElement>(".col .idx");
      const intro = playIntro();
      gsap
        .timeline({ delay: intro ? INTRO_DELAY : 0 })
        .from(".col", { clipPath: "inset(100% 0 0 0)", duration: 1.4, stagger: 0.1, ease: "expo.inOut" })
        .from(".big .in", { yPercent: 105, duration: 1.4, stagger: 0.12 }, 0.6)
        .add(() => {
          idx.forEach((el, i) => {
            const o = { v: 0 };
            gsap.to(o, {
              v: i + 1,
              duration: 0.8,
              ease: `steps(${i + 1})`,
              onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(2, "0")),
            });
          });
        }, 0.8)
        .from(`.blurb, .col .idx, ${intro ? ".burger" : ".topbar"}, .vert, .hero-tag, .clockbar`, { autoAlpha: 0, y: 12, duration: 1, stagger: 0.04 }, 1.1);

      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".portrait", { yPercent: 10, ease: "none", scrollTrigger: st });
      gsap.to(".big.knock", { yPercent: -18, ease: "none", scrollTrigger: st });
    },
    { scope: root }
  );

  // Menu: wipe in, stagger links, lock scroll, Escape to close, return focus.
  useGSAP(
    () => {
      const m = menuRef.current;
      if (!m) return;
      const reduce = reducedMotion();
      document.documentElement.classList.toggle("menu-open", open);
      if (open) {
        window.__lenis?.stop();
        gsap.set(m, { display: "flex" });
        if (!reduce) {
          gsap.fromTo(m, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
          gsap.fromTo(
            m.querySelectorAll("nav a"),
            { yPercent: 100, clipPath: "inset(0% -10% 100% -10%)" },
            {
              yPercent: 0,
              clipPath: "inset(-40% -10% -60% -10%)",
              duration: 1,
              stagger: 0.06,
              delay: 0.3,
              clearProps: "clipPath",
            }
          );
        }
        m.querySelector<HTMLElement>("nav a")?.focus({ preventScroll: true });
      } else if (m.style.display === "flex") {
        window.__lenis?.start();
        if (reduce) gsap.set(m, { display: "none" });
        else
          gsap.to(m, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(m, { display: "none" });
            },
          });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openBtn.current?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header ref={root} className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">
          {profile.name}, {profile.role}
        </h1>

        <div className="clockbar">
          <Clock />
          <span className="mono">PKT · Karachi</span>
        </div>
        <div className="topbar">
          <a href="#top" className="mark" aria-label="Syed Taha, back to top">
            <Logo width={84} title="" aria-hidden="true" />
          </a>
          <button
            ref={openBtn}
            type="button"
            className="burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>

        <div className="cols" aria-hidden="true">
          <div className="col">
            <span className="big" style={{ left: "10%", top: "30%" }}>
              <span className="in">T</span>
            </span>
            <span className="idx dot">01</span>
          </div>
          <div className="col photo">
            <div className="portrait">
              <Image src={portrait} alt="" fill priority sizes="25vw" />
            </div>
            <Grain />
            <span className="hero-tag mono">
              {profile.heroTag[0]}
              <br />
              {profile.heroTag[1]}
            </span>
            <span className="big knock" style={{ left: "10%", top: "42%" }}>
              <span className="in">A</span>
            </span>
            <span className="idx dot">02</span>
          </div>
          <div className="col">
            <span className="big" style={{ left: "12%", top: "12%" }}>
              <span className="in">H</span>
            </span>
            <p className="blurb">
              {profile.heroBlurb}
              <span className="arr">↙</span>
            </p>
            <span className="idx dot">03</span>
          </div>
          <div className="col">
            <span className="big" style={{ left: "12%", bottom: "6%" }}>
              <span className="in">A</span>
            </span>
            <span className="idx dot">04</span>
            <span className="vert mono">
              {profile.name} © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </header>

      <div ref={menuRef} id="menu" className="menu glass" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-top">
          <span className="mark"><Logo width={72} title="" aria-hidden="true" /></span>
          <button type="button" className="burger" aria-label="Close menu" onClick={() => setOpen(false)}>
            <i />
            <i style={{ width: 22 }} />
            <i />
          </button>
        </div>
        <nav aria-label="Primary">
          <ul>
            {menuItems.map((m) => (
              <li key={m.href}>
                <a href={m.href} onClick={() => setOpen(false)}>
                  {m.label} <em>{m.em}</em>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot">
          <CodeLink href={profile.resume}>Résumé</CodeLink>
          <CodeLink href={profile.academicCv}>Academic CV</CodeLink>
          <CodeLink href={links.github}>GitHub</CodeLink>
          <CodeLink href={links.linkedin}>LinkedIn</CodeLink>
          <CodeLink href={`mailto:${profile.email}`}>Email</CodeLink>
        </div>
      </div>
    </>
  );
}
