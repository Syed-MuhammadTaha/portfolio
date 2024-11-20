import Navbar from "@/components/custom/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen bg-black relative">
        <Navbar />
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white">Hello World</h1>
      </div>
    </>
  );
}
