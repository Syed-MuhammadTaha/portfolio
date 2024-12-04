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

const BentoUI: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-row gap-4 h-full w-3/4">
        {/* Column 1: 30% */}
        <div className="flex-1 basis-[30%] flex flex-col gap-4">
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
        <div className="flex-1 basis-[50%] flex flex-col gap-4">
          {/* About Me */}
          <motion.div
            className="bg-[#111111] rounded-md p-4 flex items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold">ABOUT ME</h2>
          </motion.div>

          {/* Recent Experience and Current Time in Same Row */}
          <div className="flex flex-row gap-4">
            {/* Recent Experience */}
            <motion.div
              className="bg-[#4DCCBD] text-black rounded-md p-4 flex-grow basis-[75%]"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-2">RECENT EXPERIENCE</h3>
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
            className="bg-[#111111] rounded-md p-4 flex items-center justify-center space-x-4 flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide">Slide 1</div>
                <div className="embla__slide">Slide 2</div>
                <div className="embla__slide">Slide 3</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Column 3: 20% */}
        <div className="flex-1 basis-[20%] flex flex-col gap-4">
          {/* Links */}
          <motion.div
            className="rounded-md grid grid-rows-2 grid-cols-3 gap-x-2 items-center justify-center flex-grow"
            whileHover={{ scale: 1.05 }}
          >
            {/* Row 1 */}
            <div className="text-left text-3xl font-black leading-tight text-[#C7C2BF]">
              <div>LIN</div>
              <div>KS:</div>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C7C2BF] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={LinkedIn} alt="LinkedIn" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C7C2BF] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Github} alt="GitHub" className="h-12 w-12 object-contain" />
            </a>

            {/* Row 2 */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C7C2BF] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Kaggle} alt="Kaggle" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C7C2BF] rounded-md p-2 flex items-center justify-center h-3/4"
            >
              <Image src={Medium} alt="Medium" className="h-12 w-12 object-contain" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C7C2BF] rounded-md p-2 flex items-center justify-center h-3/4"
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
