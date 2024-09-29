import { Button } from "@/components/ui/button";
import Footer from "@/components/landingPage/Footer";
import HowSection from "@/components/landingPage/HowSection";
import HeroSection from "@/components/landingPage/HeroSection";
import Navigation from "@/components/landingPage/Navigation";
import ReadySection from "@/components/landingPage/ReadySection";
import WhySection from "@/components/landingPage/WhySection";
import ImageCarousel from "@/components/landingPage/imageCarousel";
import MongoTest from "./components/MongoTest";
export default async function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MongoTest />
      <Navigation />
      <main className="flex-1">
        <div className="flex flex-col item-center justify-center">
          <HeroSection />
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
