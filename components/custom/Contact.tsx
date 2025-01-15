import React from "react";
import { BackgroundGradientAnimation } from "@/components/Acceternity/LavaLamp";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white m-10">

        <div className="p-10 mx-auto max-w-xl backdrop-blur-md bg-black/60 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-neutral-400">Lets's <span className="text-[#eb4e27]">Connect</span>!</h1>
          <form className="space-y-4">
            <input type='text' placeholder='Name'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" />
            <input type='email' placeholder='Email'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" />
            <input type='text' placeholder='Subject'
              className="w-full rounded-sm p-4 bg-neutral-900 focus:border-black text-sm outline-none transition-all" />
            <textarea placeholder='Message' rows={4} className="w-full bg-neutral-900 rounded-sm text-sm px-4 pt-3 outline-none transition-all mb-5"></textarea>
            <button type='button' className="text-black bg-[#b3dec1] tracking-wide text-sm font-bold rounded-sm p-4 w-full outline-none mt-4 hover:text-white">Send</button>
          </form>
        </div>

      </div>
      
    </BackgroundGradientAnimation>
  );
}

export default BackgroundGradientAnimationDemo;
