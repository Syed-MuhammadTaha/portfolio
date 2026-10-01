"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in lockstep. */
export default function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
