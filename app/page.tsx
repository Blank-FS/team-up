"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/landingPage/Footer";
import HowSection from "@/components/landingPage/HowSection";
import HeroSection from "@/components/landingPage/HeroSection";
import Navigation from "@/components/landingPage/Navigation";
import ReadySection from "@/components/landingPage/ReadySection";
import WhySection from "@/components/landingPage/WhySection";
import { useRef } from "react";

export default async function LandingPage() {
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation whyChooseRef={whyChooseRef} howItWorksRef={howItWorksRef} />
      <main className="flex-1">
        <div className="flex flex-col item-center justify-center">
          <HeroSection />
          <div ref={whyChooseRef}>
            <WhySection />
          </div>
          <div ref={howItWorksRef}>
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
