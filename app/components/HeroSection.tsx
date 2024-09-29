"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import { Button } from "../../components/ui/button";

export default function Footer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [photo1, photo2, photo3, photo4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full min-h-[80vh] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary/20 to-primary/30 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-5xl font-bold mb-6">TeamUp</h1>
          <p className="text-lg mb-8">
            Form your dream hackathon team with ease. <br />
            Connect, collaborate, and create amazing projects together.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Start Teaming Up
          </Button>
        </div>
      </div>
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
    </section>
  );
}
