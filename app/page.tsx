'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Users, Rocket, MessageSquare, CheckCircle, UserPlus, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import photo1 from "./assets/photo1.jpg"
import photo2 from "./assets/photo2.jpg"
import photo3 from "./assets/photo3.jpg"


function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg
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
              <span className="text-xl font-bold text-primary">TeamUp</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
              <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Features</Link>
              <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    photo1,
    photo2,
    photo3
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full min-h-[70vh] flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary/20 to-primary/30 p-8 flex flex-col justify-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-5xl font-bold mb-6">TeamUp</h1>
              <p className="text-2xl mb-8">Form your dream hackathon team with ease. Connect, collaborate, and create amazing projects together.</p>
              <Button size="lg" className="text-lg px-8 py-4">Start Teaming Up</Button>
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
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose TeamUp?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Find Your Perfect Match</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Connect with developers, designers, and innovators who
                  complement your skills.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Rocket className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Launch Projects Faster</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Form teams quickly and efficiently, so you can focus on
                  building your project.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <MessageSquare className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Collaborate Seamlessly</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Use our built-in tools to communicate and coordinate with your
                  team throughout the hackathon.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Form Your Dream Team?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join TeamUp today and take your hackathon experience to the next level.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 TeamUp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}