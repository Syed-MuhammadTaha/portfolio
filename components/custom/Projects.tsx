"use client";
import React from "react";
import HeroParallax from "@/components/acceternity/ProjectParallax";
import funoon from "@/assets/funoon.png";
import transformer from "@/assets/transformer.png";
import unet from "@/assets/unet.png";
import mlops from "@/assets/mlops.jpg";
import inception from "@/assets/inception.png";
import facial from "@/assets/facial.png"; 
import faryaad from "@/assets/faryaad.png";

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
    title: "Neural Style Transfer",
    link: "https://github.com/Syed-MuhammadTaha/TFHubNeuralStyleTransfer",
    thumbnail:
      facial,
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
    title: "Transfer Learning on Chest X-Rays",
    link: "https://algochurn.com",
    thumbnail:
      inception,
  },
  {
    title: "Hugging Face CI/CD",
    link: "https://github.com/Syed-MuhammadTaha/mlops",
    thumbnail:
      mlops,
  },
  {
    title: "Faryaad",
    link: "https://faryaad.netlify.app",
    thumbnail:
      faryaad,
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
];

export default Projects;