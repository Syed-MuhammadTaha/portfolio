import Image from "next/image";
import React from "react";
import Timeline from "@/components/Timeline";
import kalambot from "@/assets/kalambot.png";
import seqdance from "@/assets/seqdance.png";
import meme from "@/assets/meme.jpg";

const Experience = () => {
  const data = [
    {
      title: "Sep 2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-400 text-2xl mb-8 font-bold">
            ML Intern, RapidsAI
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Integrated RAG-based chatbot on Kalambot website with Streamlit UI hosted on Streamlit Cloud.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Improved responses by adding prompt engineering techniques like COT and contextual prompting
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Cut OpenAI API costs by 50% with a RAG-based model for specialized responses and a lightweight model for
generic queries.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Designed FastAPI endpoint for chatbot responses, enabling user session management and contextual
interactions.
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Executed inference on specialized open-source models for protein sequence analysis and interaction-based
queries.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={kalambot}
              alt="kalambot"
              width={500}
              height={500}
              className="rounded-lg object-cover object-top h-25 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

            />
            <Image
              src={seqdance}
              alt="seqdance"
              width={500}
              height={500}
              className="rounded-lg object-cover object-top h-25 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

            />
          </div>
        </div>
      ),
    },
    {
      title: "Jan 2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-400 text-2xl mb-8 font-bold">
            Seeking Summer 2025 Internship
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
                src={meme}
                alt="meme"
                width={500}
                height={500}
                className="rounded-lg object-cover object-top h-25 md:h-44 lg:h-96 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

              />
          </div>
        </div>
      ),
    },
    
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}


export default Experience;