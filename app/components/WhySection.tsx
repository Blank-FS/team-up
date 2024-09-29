import { MessageSquare, Rocket, Users } from "lucide-react";
import React from "react";

export default function WhySection() {
  return (
    <section id="why-choose-it" className="w-full py-12 md:py-24 lg:py-32">
      <div className="w-full px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Why Choose TeamUp?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Users className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold text-center">Find Your Perfect Match</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Connect with developers, designers, and innovators who complement
              your skills.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Rocket className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold text-center">Launch Projects Faster</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Form teams quickly and efficiently, so you can focus on building
              your project.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <MessageSquare className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold text-center">Collaborate Seamlessly</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Use our built-in tools to communicate and coordinate with your
              team throughout the hackathon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
