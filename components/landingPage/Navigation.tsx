"use client";

import { Button } from "../ui/button";
import { ThemeSwitch } from "../theme-switch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MAIZE } from "@/lib/constants";
import { BLUE } from "@/lib/constants";

export default function Navigation() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogin = () => {
    router.push("/api/auth/login");
  };

  const handleLogout = () => {
    router.push("/api/auth/logout");
  };

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
              <Link
                href="/home"
                className="text-[#FFCB05] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              
              <Link
                href="#why-choose-it"
                className="text-[#FFCB05] hover:text-white px-3 py-2 rounded-md text-sm font-medium"  
              >
                Why Choose TeamUp
              </Link>
              
              <Link
                href="#how-it-works"
                className="text-[#FFCB05] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                How TeamUp Works
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <ThemeSwitch />
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar className="hover:cursor-pointer" onClick={() => router.push("/home")}>
                  <AvatarImage
                    src={user.picture ?? ""}
                    alt={user.name ?? "User"}
                  />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <>
                <div className="hidden md:block">
            <Link 
                href="/api/auth/login"
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                <Button className = "bg-[#FFCB05] text-[#00274C] hover:bg-[#375A7F] hover:text-[#FDFD96] px-4 py-2 rounded">Get started</Button>
              </Link>
          </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
