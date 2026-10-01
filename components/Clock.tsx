"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const now = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: profile.timeZone, hour: "2-digit", minute: "2-digit", hour12: false })
    .format(new Date())
    .split(":");

/** Local time in Karachi, dot-matrix, with a blinking colon. */
export default function Clock() {
  const [t, setT] = useState<string[] | null>(null);
  useEffect(() => {
    setT(now());
    const id = setInterval(() => setT(now()), 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="t dot" suppressHydrationWarning aria-label={t ? `${t[0]}:${t[1]} in Karachi` : undefined}>
      {t ? t[0] : "--"}
      <span className="c" aria-hidden="true">
        :
      </span>
      {t ? t[1] : "--"}
    </time>
  );
}
