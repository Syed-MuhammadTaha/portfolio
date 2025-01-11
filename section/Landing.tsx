"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/custom/Navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import ScrollText from "@/components/custom/ScrollText";
import BentoUI from "@/components/custom/BentoUI";
import Experience from "@/components/custom/Experience";
import Projects from "@/components/custom/Projects";
import Image from "next/image";
import Img from "@/assets/photo.png";

export default function Landing() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Adjust for smoother or faster easing
    });

    lenisRef.current = lenis;

    // Hook Lenis into requestAnimationFrame
    const handleRaf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(handleRaf);
    };
    requestAnimationFrame(handleRaf);

    // Cleanup Lenis on component unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="scroll-container">
        <div className="min-h-screen bg-neutral-950 relative scroll-section">
          <div className="flex sticky top-0 z-[999] h-[50vh] align-center items-center absolute">
            <div className="w-1/2">
              <Navbar />
            </div>

            <div className="w-1/2 text-[#D7D9CE] font-playfair flex items-center justify-center">
              <div className="w-1/2"><Image src={Img} alt="profile" className="h-full" /></div>
              
            </div>
          </div>
          <div className="w-100">
            <ScrollText />
          </div>

          <StarsBackground />
        </div>

        <div className="min-h-screen scroll-section">
          <BentoUI />
        </div>

        <div className="min-h-screen scroll-section">
          <Experience />
        </div>

        <div className="scroll-section">
          <Projects />
        </div>
      </div>
    </>
  );
}
