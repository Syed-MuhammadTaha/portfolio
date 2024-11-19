import Card from '@/components/custom/Card';
import Navbar from '@/components/custom/Navbar';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Landing() {
  return (
    <>

        <div className="min-h-screen py-2 bg-[#2A3435]">
            <Navbar />
            <ShootingStars />
            <StarsBackground />
        </div>

      
    </>
    
  );
}
