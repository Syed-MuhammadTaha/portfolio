"use client";

import { useEffect, useRef } from "react";
import { links, profile } from "@/lib/content";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import CodeLink from "@/components/CodeLink";

const FRAMES = 5;

/**
 * Closing section. The word "stop." boils like hand-drawn ink (stepped turbulence frames, after
 * Aceternity's squiggly text) and goes perfectly still while you hover it.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const squig = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = squig.current;
    if (!el || reducedMotion()) return;
    let frame = 0, timer: ReturnType<typeof setInterval> | null = null, visible = false, held = false;
    const run = () => {
      if (timer || held || !visible) return;
      timer = setInterval(() => {
        frame = (frame + 1) % FRAMES;
        el.style.filter = `url(#sq${frame})`;
      }, 80);
    };
    const halt = () => {
      if (timer) clearInterval(timer);
      timer = null;
      el.style.filter = "none";
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) run();
      else halt();
    });
    io.observe(el);
    const enter = () => {
      held = true;
      halt();
    };
    const leave = () => {
      held = false;
      run();
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      halt();
      io.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  // The giant name rises out of the floor as you reach the bottom.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".giant", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: ".giant", start: "top bottom", end: "bottom bottom", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} id="contact" aria-labelledby="contact-title">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        {Array.from({ length: FRAMES }, (_, i) => (
          <filter key={i} id={`sq${i}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} seed={i * 7 + 3} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={7} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
      </svg>

      <div className="wrap outro">
        <div>
          <h2 id="contact-title">
            Let’s build something
            <br />
            that knows when to{" "}
            <span ref={squig} className="squig">
              stop.
            </span>
          </h2>
          <p className="small">
            {profile.status} Email is fastest at <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
        <nav className="linkcols" aria-label="Footer">
          <ul>
            <li><CodeLink href="#top">Home</CodeLink></li>
            <li><CodeLink href="#work">Experience</CodeLink></li>
            <li><CodeLink href="#research">Research</CodeLink></li>
            <li><CodeLink href={profile.resume}>Résumé</CodeLink></li>
            <li><CodeLink href={profile.academicCv}>Academic CV</CodeLink></li>
          </ul>
          <ul>
            <li><CodeLink href={links.github}>GitHub</CodeLink></li>
            <li><CodeLink href={links.linkedin}>LinkedIn</CodeLink></li>
            <li><CodeLink href={links.medium}>Medium</CodeLink></li>
          </ul>
          <ul>
            <li><CodeLink href={`mailto:${profile.email}`}>Email</CodeLink></li>
          </ul>
        </nav>
      </div>
      <div className="giant" aria-hidden="true">
        Syed Taha
      </div>
      <span className="legal mono">© {new Date().getFullYear()} · All rights reserved</span>
    </footer>
  );
}
