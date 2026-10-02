/**
 * The unlit dot grid behind every dot-matrix canvas (research tiles, project donut). It never
 * changes, so it is drawn once per size into an offscreen canvas and stamped each frame.
 */
export function unlitGrid(n: number, w: number, dpr: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.round(w * dpr);
  c.height = Math.round(w * dpr);
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const pitch = w / n, r = pitch * 0.07;
  ctx.fillStyle = "rgba(236,235,231,0.14)";
  ctx.beginPath();
  for (let k = 0; k < n * n; k++) {
    const x = ((k % n) + 0.5) * pitch, y = (Math.floor(k / n) + 0.5) * pitch;
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fill();
  return c;
}

/** Touch devices get half the frame rate for ambient canvas loops, which keeps scrolling smooth. */
export const ambientFps = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches ? 30 : 60;
