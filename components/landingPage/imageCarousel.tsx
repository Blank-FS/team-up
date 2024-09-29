// components/ImageCarousel.tsx
"use client";

import photo1 from "@/app/assets/photo1.jpg";
import photo2 from "@/app/assets/photo2.jpg";
import photo3 from "@/app/assets/photo3.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [photo1, photo2, photo3];

export default function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Hackathon team ${index + 1}`}
          width={800}
          height={600}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
