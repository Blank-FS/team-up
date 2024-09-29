import { Button } from "../../components/ui/button";
import Link from "next/link";
import React from "react";
import { MAIZE } from "@/lib/constants";
import { BLUE } from "@/lib/constants";

export default function Navigation() {
  return (
    <nav style={{ backgroundColor: BLUE}} className="dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg style={{ color: MAIZE}}
                className="h-8 w-8 text-primary mr-2"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="30" r="8" fill="currentColor" />
                <circle cx="50" cy="20" r="6" fill="currentColor" />
                <circle cx="80" cy="30" r="8" fill="currentColor" />
                <circle cx="35" cy="60" r="7" fill="currentColor" />
                <circle cx="65" cy="60" r="7" fill="currentColor" />
                <circle cx="50" cy="85" r="6" fill="currentColor" />
                <path d="M20 30 L35 60" stroke="currentColor" strokeWidth="2" />
                <path d="M20 30 L50 20" stroke="currentColor" strokeWidth="2" />
                <path d="M50 20 L80 30" stroke="currentColor" strokeWidth="2" />
                <path d="M80 30 L65 60" stroke="currentColor" strokeWidth="2" />
                <path d="M35 60 L50 85" stroke="currentColor" strokeWidth="2" />
                <path d="M65 60 L50 85" stroke="currentColor" strokeWidth="2" />
                <path d="M35 60 L65 60" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span style={{ color: MAIZE}} className="text-xl font-bold text-primary">TeamUp</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link style={{ color: MAIZE}}
                href="#"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link style={{ color: MAIZE}}
                href="#"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </Link>
              <Link style={{ color: MAIZE}}
                href="#"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                How It Works
              </Link>
              <Link style={{ color: MAIZE}}
                href="#"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2">
              Login
            </Button>
            <Button style={{ backgroundColor: "#4B5563" }}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
