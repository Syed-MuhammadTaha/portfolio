import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const dot = Doto({ subsets: ["latin"], weight: ["800"], variable: "--font-dot", display: "swap" });

const description =
  "AI engineer and researcher. Ships agentic AI systems in production; researches efficient models with statistical guarantees.";

export const metadata: Metadata = {
  title: `${profile.name} — AI Engineer & Researcher`,
  description,
  authors: [{ name: profile.name }],
  openGraph: { title: profile.name, description, type: "profile" },
};

export const viewport: Viewport = { themeColor: "#e4e3df" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${dot.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide reveal targets before first paint only when motion is allowed. If the motion layer
            never starts (JS error, slow network), show everything after 3s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion-ok')},3000)}",
          }}
        />
      </head>
      <body>
        <a className="skip mono" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
