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

const BentoUI: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [AutoScroll({
      playOnInit: true,
    })]
  )


  return (
    <div className="bg-black text-[#C7C2BF] min-h-screen flex items-center justify-center">
      <div className="flex flex-row gap-4 h-full w-3/4">
        {/* Column 1: 30% */}
        <div className="flex-1 basis-[25%] flex flex-col gap-4">
          {/* Profile Image */}
          <motion.div
            className="bg-[#111111] rounded-md flex items-center justify-center flex-grow overflow-hidden"
            onHoverStart={() => setIsHovered(true)} // Start hover
            onHoverEnd={() => setIsHovered(false)}  // End hover
          >
            <Image
              src={isHovered ? BentoGif : BentoPic} // Toggle image
              alt="Profile"
              className="object-cover"
              width={200}
              height={200}
            />
          </motion.div>

          {/* Roles */}
          <motion.div
            className="p-4 flex items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold">ROLES</h3>
          </motion.div>
        </div>

        {/* Column 2: 50% */}
        <div className="flex-1 basis-[60%] flex flex-col gap-4">
          <motion.div
            className="bg-[#111111] rounded-md p-5 flex flex-col items-start justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-[#f1dabf]">ABOUT ME</h2>
            <p className="text-lg font-playfair text-[#C7C2BF]">
              I am a software engineer with a passion for building products that solve real-world
              problems. I am looking to break into ML.
            </p>
          </motion.div>

          {/* Recent Experience and Current Time in Same Row */}
          <div className="flex flex-row gap-4">
            {/* Recent Experience */}
            <motion.div
              className="bg-[#eb4e27] text-black rounded-md p-4 flex-grow basis-[75%]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-2">RECENT EXPERIENCE</h3>
              <div className="text-sm">
                <div className="mb-2">
                  <span className="font-bold">Freelance</span> <br />
                  Software Engineer <br />
                  Sep 2023 - Nov 2023
                </div>
                <div>
                  <span className="font-bold">Freelance</span> <br />
                  Software Engineer <br />
                  Sep 2024 - Nov 2024
                </div>
              </div>
            </motion.div>

            {/* Current Time */}
            <motion.div
              className="rounded-md flex flex-col flex-grow basis-[25%]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-4xl font-bold">5:44</h3>
              <span className="text-lg">PM</span>
              <span className="text-sm mt-2">Current local time</span>
            </motion.div>
          </div>

          {/* Stack */}
          <motion.div
            className="bg-[#111111] rounded-md p-4 w-full flex flex-grow items-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1/4">
              <h3 className="text-2xl font-bold px">STACK</h3>
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
        <div className="flex-1 basis-[20%] flex flex-col gap-4">
          {/* Links */}
          <motion.div
            className="rounded-md grid grid-rows-2 grid-cols-3 gap-x-2 items-center justify-center flex-grow"
          >
            {/* Row 1 */}
            <div className="text-left text-3xl font-black leading-tight text-[#B3DEC1]">
              <div>LIN</div>
              <div>KS:</div>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B3DEC1] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={LinkedIn} alt="LinkedIn" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B3DEC1] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Github} alt="GitHub" className="h-12 w-12 object-contain" />
            </a>

            {/* Row 2 */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B3DEC1] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Kaggle} alt="Kaggle" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B3DEC1] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Medium} alt="Medium" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B3DEC1] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={WhatsApp} alt="WhatsApp" className="h-12 w-12 object-contain" />
            </a>
          </motion.div>

          {/* Projects Created */}
          <motion.div
            className="bg-[#111111] rounded-md p-4 flex items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-2xl font-bold">3+</h3>
              <p>Projects Created</p>
            </div>
          </motion.div>

          {/* Years of Experience */}
          <motion.div
            className="bg-[#111111] rounded-md p-4 flex items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-2xl font-bold">2+</h3>
              <p>Years of Experience</p>
            </div>
          </motion.div>

          {/* Download Resume */}
          <motion.div
            className="p-4 flex items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-200">
              DOWNLOAD MY RESUME
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BentoUI;
