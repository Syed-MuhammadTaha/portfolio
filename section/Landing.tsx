"use client"
import Navbar from "@/components/custom/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import ScrollText from "@/components/custom/ScrollText";
import SwipeCards from "@/components/custom/SwipeCards";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen bg-black relative">
        <div className="flex sticky top-0 z-[999] h-[50vh] align-center items-center absolute">
          <div className="w-1/2">
            <Navbar />
          </div>

          <div className="w-1/2 text-[#D7D9CE] font-playfair text-5xl flex">
            <p className="w-3/4">A programmer with an aesthetic sense looking to break into ML</p>
          </div>
        </div>
        <div className="w-100">
          <ScrollText />
        </div>
        
        
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="min-h-screen bg-[#ccc]">

      </div>
    </>

  );
}
