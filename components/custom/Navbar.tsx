'use client'; 
import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <section className="flex flex-col gap-1 px-8 py-8 font-bold text-[#928688] justify-end items-end z-[9999] relative opacity-30">
      <FlipLink href="#">About</FlipLink>
      <FlipLink href="#">Experience</FlipLink>
      <FlipLink href="#">Projects</FlipLink>
      <FlipLink href="#">Contact</FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl uppercase"
      style={{ lineHeight: 1 }} // Ensure line height is consistent
    >
      {/* First (normal) text */}
      <div className="relative">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Second (flipped) text */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};


export default Navbar;