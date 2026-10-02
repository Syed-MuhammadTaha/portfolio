"use client";

import { reducedMotion } from "@/lib/gsap";

const KEY = "st-intro-seen";
let decided: boolean | null = null;

/**
 * Whether the intro (the signature signing itself) plays on this load: once per browser session, never
 * with reduced motion. Decided once so the loader and the hero agree.
 */
export function playIntro(): boolean {
  if (decided !== null) return decided;
  if (typeof window === "undefined" || reducedMotion()) return (decided = false);
  try {
    decided = sessionStorage.getItem(KEY) !== "1";
    sessionStorage.setItem(KEY, "1");
  } catch {
    decided = true;
  }
  return decided;
}

/** Seconds the hero intro waits for the loader to finish. */
export const INTRO_DELAY = 2.45;
