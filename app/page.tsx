import { Button } from "@/components/ui/button";
import { getInfo } from "@/lib/utils/users";
import Footer from "@/components/landingPage/Footer";
import HowSection from "@/components/landingPage/HowSection";
import Navigation from "@/components/landingPage/Navigation";
import ReadySection from "@/components/landingPage/ReadySection";
import WhySection from "@/components/landingPage/WhySection";
import ImageCarousel from "@/components/landingPage/imageCarousel";
import MongoTest from "./components/MongoTest";
export default async function LandingPage() {
  const data = await getInfo();
  console.log(data);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <MongoTest />
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
          <ImageCarousel />
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
