import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

const ScrollText = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 1, stiffness: 100, damping: 30 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -8000]);
  const x = useSpring(xRaw, { mass: 1, stiffness: 150, damping: 30 });

  return (
    <section
      ref={targetRef}
      className="h-[1000vh] text-[#EB4E27]"
    >
      <div className="sticky top-1/3 flex h-screen items-center inset-x-0">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap text-[18em] font-black uppercase leading-[0.85]"
        >
          Hi There! I am Syed Muhammad Taha Imam
        </motion.p>
      </div>
    </section>
  );
};

export default ScrollText;
