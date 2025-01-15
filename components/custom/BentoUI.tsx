import React, { useState } from "react";
import { motion } from "framer-motion";
import BentoPic from "@/assets/bento.png";
import BentoGif from "@/assets/bento.gif";
import Image from "next/image";
import Github from "@/assets/GitHub.png";
import Kaggle from "@/assets/Kaggle.png";
import LinkedIn from "@/assets/LinkedIn.png";
import Medium from "@/assets/Medium.png";
import WhatsApp from "@/assets/WhatsApp.png";
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import tf from '@/assets/tf.png'
import jupyter from '@/assets/jupyter.png'
import mongo from '@/assets/mongo.png'
import node from '@/assets/node.png'
import react from '@/assets/react.png'
import sql from '@/assets/sql.png'
import CurrentTime from "@/components/Custom/CurrentTime";
import { TextHoverEffect } from "@/components/Acceternity/text-hover-effect";

const BentoUI: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [AutoScroll({
      playOnInit: true,
      speed: 1,
    })]
  );
  


  return (
    <div className="text-neutral-400 min-h-screen flex items-center justify-center w-3/4 mx-auto" id="bento">
  <div className="flex flex-col sm:flex-row gap-4 h-full w-full">
    {/* Column 1: 30% */}
    <div className="flex-1 basis-[25%] flex flex-col gap-4">
      {/* Profile Image */}
      <motion.div
        className="bg-foreground rounded-md flex items-center justify-center overflow-hidden hidden sm:block md:block lg:block h-3/4"
        onHoverStart={() => setIsHovered(true)} // Start hover
        onHoverEnd={() => setIsHovered(false)}  // End hover
      >
            <Image
              src={isHovered ? BentoGif : BentoPic} // Toggle image
              alt="Profile"
              className="object-cover m-auto"
              width={200}
              height={200}
            />
          </motion.div>
  
          {/* Roles */}
          <motion.div
            className="p-2 flex items-center justify-center flex-grow hidden sm:block md:block lg:block pt-5"
            
          >
            <h3 className="text-xl font-bold text-center">Machine Learning Engineer</h3>
          </motion.div>
        </div>
  
        <div className="flex-1 basis-[60%] flex flex-col gap-4 ">
          <motion.div
            className="bg-foreground rounded-md p-5 flex flex-col items-start justify-center flex-grow"
            
          >
            <h2 className="text-2xl font-bold mb-2 text-neutral-700">ABOUT ME</h2>
            <p className="w-75">
              
Driven by a passion for solving real-world problems through technology, I am now focused on leveraging machine learning to create innovative, data-driven solutions.
            </p>
          </motion.div>
  
          {/* Recent Experience and Current Time in Same Row */}
          <div className="flex flex-row gap-4">
            {/* Recent Experience */}
            <motion.div
              className="bg-foreground rounded-md px-4 pt-4 pb-10 flex-grow basis-[75%] shadow-lg"
            >
              {/* #eb4e27 */}
              <h3 className="text-2xl font-bold mb-4 tracking-wide text-neutral-700">CURRENTLY <span className="text-secondary">BUILDING</span></h3>
              <TextHoverEffect text="SABLE" />

            </motion.div>

  
            {/* Current Time */}
            <motion.div
              className="rounded-md flex flex-col flex-grow basis-[25%]"
              
            >
              <h3 className="text-4xl font-bold"><CurrentTime /></h3>
              <span className="text-lg mt-2">Current local time</span>
            </motion.div>
          </div>
  
          {/* Stack */}
          <motion.div
            className="bg-foreground rounded-md p-4 w-full flex flex-grow items-center overflow-hidden"
            
          >
            <div className="w-1/4">
              <h3 className="text-2xl font-bold px text-neutral-700">STACK</h3>
            </div>
  
            <div className="embla w-3/4" ref={emblaRef}>
              <div className="embla__container flex">
                <div className="embla__slide">
                  <Image src={tf} alt="tf" className="w-10" />
                </div>
                <div className="embla__slide">
                  <Image src={jupyter} alt="jupyter" className="w-10" />
                </div>
                <div className="embla__slide">
                  <Image src={node} alt="node" className="w-10" />
                </div>
                <div className="embla__slide">
                  <Image src={react} alt="react" className="w-10" />
                </div>
                <div className="embla__slide">
                  <Image src={mongo} alt="mongo" className="w-5" />
                </div>
                <div className="embla__slide">
                  <Image src={sql} alt="sql" className="w-12" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
  
        {/* Column 3: 20% */}
        <div className="flex-1 basis-[20%] flex flex-col gap-4 ">
          {/* Links */}
          <motion.div
            className="rounded-md grid grid-rows-2 grid-cols-3 gap-x-2 items-center justify-center flex-grow"
          >
            {/* Row 1 */}
            <div className="text-left text-3xl font-black leading-tight text-neutral-300">
              <div>LIN</div>
              <div>KS:</div>
            </div>
            <a
              href="https://www.linkedin.com/in/syed-muhammad-taha-imam/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-300 rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={LinkedIn} alt="LinkedIn" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="https://github.com/Syed-MuhammadTaha"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-300 rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Github} alt="GitHub" className="h-12 w-12 object-contain" />
            </a>
  
            {/* Row 2 */}
            <a
              href="https://www.kaggle.com/syedtahaluvsai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-300 rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Kaggle} alt="Kaggle" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="https://medium.com/@tahaML"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-300 rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Medium} alt="Medium" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="https://wa.me/923340518269"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-300 rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={WhatsApp} alt="WhatsApp" className="h-12 w-12 object-contain" />
            </a>
          </motion.div>
  
          {/* Projects Created */}
          <motion.div
            className="bg-foreground rounded-md p-4 flex items-center justify-center flex-grow"
            
          >
            <div className="">
              <h3 className="text-2xl font-bold">5+</h3>
              <p>Projects Created</p>
            </div>
          </motion.div>
  
          <motion.div
            className="bg-foreground rounded-md p-4 flex items-center justify-center flex-grow"
            
          >
            <div className="px-3">
              <h3 className="text-2xl font-bold">2+</h3>
              <p>years fiddling with Deep Learning</p>
            </div>
          </motion.div>
  
          <motion.div
            className="flex items-center justify-center flex-grow"
            
          >
            <a href="/resume.pdf" download="resume.pdf" className="w-full">
    
            <button className="text-primary font-bold px-5 py-5 rounded-md border border-primary hover:bg-primary hover:text-black w-full">
              Resumé
            </button></a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};  

export default BentoUI;
