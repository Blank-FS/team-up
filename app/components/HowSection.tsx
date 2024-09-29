import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Rocket,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";

export default function HowSection() {
  return (
    <section className="w-screen py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="w-full px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          How TeamUp Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 md:mb-0">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
              <UserPlus className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign up and showcase your skills
            </p>
          </div>
          <ArrowRight className="hidden md:block h-6 w-6 text-gray-400" />
          <div className="flex flex-col items-center text-center mb-8 md:mb-0">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Your Team</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse profiles or get matched
            </p>
          </div>
          <ArrowRight className="hidden md:block h-6 w-6 text-gray-400" />
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Start Collaborating</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Build your project together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
