# Syed Muhammad Taha Imam — portfolio

Next.js 15 (App Router) · GSAP (ScrollTrigger, SplitText) · Lenis · plain CSS

```bash
npm install
npm run dev
```

## Where things live
- **Copy:** `lib/content.ts` (roles, research, papers, links). Résumé: `public/resume.pdf`.
- **Styles:** `app/globals.css` — tokens at the top, then one block per section.
- **Fonts** (`app/layout.tsx`): Bodoni Moda (display), Geist (text), Geist Mono (labels), Doto (dot-matrix, numbers/time only).
- **Sections:** `components/Hero`, `Tapes`, `Statement`, `Experience`, `Research`, `Contact`.

## Motion
One idea throughout: things move, then stop.
- `data-split` / `data-reveal` on any element get the shared reveal (`components/Motion.tsx`).
- Hero intro timeline, film grain on the portrait, scroll parallax.
- Tapes speed up with scroll velocity, then ease back.
- Experience rows show a detail card that follows the cursor.
- Research tiles are halftone diagrams that develop on scroll and react to the cursor; figures scramble then lock.
- "stop." boils like ink and freezes on hover.

Everything respects `prefers-reduced-motion`.
