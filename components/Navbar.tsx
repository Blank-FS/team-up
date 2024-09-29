// components/Navbar.tsx
"use client";
import { ThemeSwitch } from "./theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MAIZE } from "@/lib/constants";
import { BLUE } from "@/lib/constants";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    router.push("/api/auth/logout");
  };

  return (
    <nav style={{ backgroundColor: BLUE}} className="flex items-center justify-between p-4 bg-background text-foreground shadow-md">
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
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src={user.picture || ""} alt={user.name || ""} />
                  <AvatarFallback>{user.nickname}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className=" border-none shadow-none"
              align="center"
            >
              <DropdownMenuItem className="flex flex-col items-center justify-center focus:bg-transparent border-none">
                <Button
                  variant="destructive"
                  className="w-auto h-auto object-fill"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
