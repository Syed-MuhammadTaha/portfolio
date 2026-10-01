import { forwardRef } from "react";

/**
 * The mark: “Taha” (طه) in square Kufic, drawn as one stroke on a 7×7 grid (cell centre = 14 + 12c).
 * Read right to left: ط (ascender + bowl), the joining baseline, then ه (square loop).
 */
export const LOGO_PATH = "M62 14 V86 M62 50 H86 V86 M14 86 H86 M14 50 H38 V86 M14 50 V86";

type Props = React.SVGProps<SVGSVGElement> & { size?: number | string; title?: string };

const Logo = forwardRef<SVGSVGElement, Props>(function Logo({ size = 28, title = "Syed Taha", ...rest }, ref) {
  return (
    <svg ref={ref} viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={title} {...rest}>
      <path
        d={LOGO_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  );
});

export default Logo;
