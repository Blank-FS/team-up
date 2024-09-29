"use client";

import { Button } from "@/components/ui/button";
import { getInfo } from "@/lib/utils/users";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../components/landingPage/Footer";
import HowSection from "../components/landingPage/HowSection";
import Navigation from "../components/landingPage/Navigation";
import ReadySection from "../components/landingPage/ReadySection";
import WhySection from "../components/landingPage/WhySection";
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";

export default function LandingPage() {
  getInfo();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [photo1, photo2, photo3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full min-h-[70vh] flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary/20 to-primary/30 p-8 flex flex-col justify-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-5xl font-bold mb-6">TeamUp</h1>
              <p className="text-2xl mb-8">
                Form your dream hackathon team with ease. Connect, collaborate,
                and create amazing projects together.
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
        <div className="flex flex-col item-center justify-center">
          <div>
            <WhySection />
          </div>
          <div>
            <HowSection />
          </div>
          <div>
            <ReadySection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
