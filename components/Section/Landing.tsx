"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Custom/Navbar";
import { StarsBackground } from "@/components/Acceternity/Stars";
import ScrollText from "@/components/Custom/HorizontalScroll";
import BentoUI from "@/components/Custom/BentoUI";
import Experience from "@/components/Custom/Experience";
import Projects from "@/components/Custom/Projects";
import Image from "next/image";
import Img from "@/assets/photo.png";
import Contact from "@/components/Custom/Contact"


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
      <div className="bg-background">
        <div className="min-h-screen relative">
          <div className="flex sticky top-0 z-[999] h-[50vh] align-center items-center absolute">
            <div className="w-1/2 hidden sm:block md:block lg:block">
              <Navbar />
            </div>

            <div className="w-3/4 sm:w-1/2 md:w-1/2 lg:w-1/2 flex items-center justify-center mx-auto">
              <div><Image src={Img} alt="profile" className="h-full w-full sm:w-3/4 md:w-3/4 lg:w-3/4 mx-auto" /></div>
            </div>
          </div>
          <div className="max-w-[100vw]">
            <ScrollText />
          </div>

          <StarsBackground />
        </div>

        <div className="min-h-screen">
          <BentoUI />
        </div>

        <div className="min-h-screen" id="experience">
          <Experience />
        </div>

        <div id="project">
          <Projects />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
      
    </>
  );
}
