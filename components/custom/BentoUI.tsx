import React from "react";
import { motion } from "framer-motion";
import BentoPic from "@/assets/bento.png"
import Image from "next/image";

const BentoUI: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-8">
      <div
        className="grid gap-4 max-w-6xl"
        style={{
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          gridTemplateColumns: "repeat(5, 1fr)", // 5 columns now
        }}
      >
        {/* Profile Image (3x1) */}
        <motion.div
          className="col-span-1 row-span-3 bg-[#111111] rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={BentoPic}
            alt="Profile"
            className="rounded-lg "
            width={400}
            height={400}
          />
        </motion.div>

        {/* About Me (3x1) */}
        <motion.div
          className="col-span-3 row-span-1 bg-[#111111] rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-bold">ABOUT ME</h2>
        </motion.div>

        {/* Links (1x1) */}
        <motion.div
          className="col-span-1 row-span-1 rounded-lg p-4 grid grid-cols-2 gap-2 items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          {["linkedin", "github", "portfolio", "contact"].map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="bg-gray-700 rounded-lg p-2 text-center hover:bg-gray-600"
            >
              {link.toUpperCase()}
            </a>
          ))}
        </motion.div>

        {/* Recent Experience (2x1) */}
        <motion.div
          className="col-span-2 row-span-2 bg-orange-600 rounded-lg p-4"
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

        {/* Current Time (2x1) */}
        <motion.div
          className="col-span-1 row-span-2 p-4 flex flex-col"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-4xl font-bold">5:44</h3>
          <span className="text-lg">PM</span>
          <span className="text-sm mt-2">Current local time</span>
        </motion.div>

        {/* Projects Created (1x1) */}
        <motion.div
          className="col-span-1 row-span-1 bg-[#111111] rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <h3 className="text-2xl font-bold">3+</h3>
            <p>Projects Created</p>
          </div>
        </motion.div>

        {/* Years of Experience (1x1) */}
        <motion.div
          className="col-span-1 row-span-1 bg-[#111111] rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <h3 className="text-2xl font-bold">2+</h3>
            <p>Years of Experience</p>
          </div>
        </motion.div>

        {/* Roles (1x1) */}
        <motion.div
          className="col-span-1 row-span-1 bg-[#111111] rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold">ROLES</h3>
        </motion.div>

        {/* Stack (3x1) */}
        <motion.div
          className="col-span-3 row-span-1 bg-[#111111] rounded-lg p-4 flex items-center justify-center space-x-4"
          whileHover={{ scale: 1.05 }}
        >
          {["mongodb", "react", "node", "tensorflow", "mysql"].map((stack, idx) => (
            <img
              key={idx}
              src={`https://via.placeholder.com/40?text=${stack}`}
              alt={stack}
              className="h-10"
            />
          ))}
        </motion.div>

        {/* Resume Button (1x1) */}
        <motion.div
          className="col-span-1 row-span-1 p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <button className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200">
            DOWNLOAD MY RESUME
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoUI;
