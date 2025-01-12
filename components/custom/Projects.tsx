"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import funoon from "@/assets/funoon.png";
import transformer from "@/assets/transformer.png";
import unet from "@/assets/unet.png";
const Projects = () => {
  return <HeroParallax products={products} />;
}
export const products = [
  
  {
    title: "Transformer from scratch",
    link: "https://github.com/Syed-MuhammadTaha/TransformerFromScratch",
    thumbnail:
      transformer,
  },
  {
    title: "Funoon",
    link: "https://funoonartisans.vercel.app",
    thumbnail:
      funoon,
  },
  {
    title: "Pet Segmentation using U-Net",
    link: "https://github.com/Syed-MuhammadTaha/ImageSegmentationUNet",
    thumbnail:
      unet,
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
];

export default Projects;