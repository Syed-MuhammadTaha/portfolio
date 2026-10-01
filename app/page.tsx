import SmoothScroll from "@/components/SmoothScroll";
import Motion from "@/components/Motion";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Tapes from "@/components/Tapes";
import Statement from "@/components/Statement";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Motion />
      <Loader />
      <div id="top" />
      <Hero />
      <main id="main" className="night">
        <Tapes />
        <Statement />
        <Experience />
        <Research />
        <Contact />
      </main>
    </>
  );
}
