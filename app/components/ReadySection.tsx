import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";
import photo5 from "../assets/photo5.jpg";
import { MAIZE } from "@/lib/constants";
import { BLUE } from "@/lib/constants";

export default function ReadySection() {
  return (
    <section className="w-full py-16 md:py-28 lg:py-40 bg-cover bg-center relative" style={{backgroundImage: 'url("https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'}}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Ready to Form Your Dream Team?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-200 md:text-lg">
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
              <Button style={{ backgroundColor: MAIZE, color: BLUE}} type="submit">Sign Up</Button>
            </form>
            <p className="text-xs text-gray-300">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2 hover:text-white" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
