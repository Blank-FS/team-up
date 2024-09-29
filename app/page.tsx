import MongoTest from "./components/MongoTest";
import { Button } from "@/components/ui/button";
import HeroSection from "./components/HeroSection";
import Navigation from "./components/Navigation";
import HowSection from "./components/HowSection";
import WhySection from "./components/WhySection";
import ReadySection from "./components/ReadySection";
import Footer from "./components/Footer";

export default function LandingPage() {
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
