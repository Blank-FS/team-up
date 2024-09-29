// components/Navbar.tsx
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
    <nav className="flex items-center justify-between p-4 bg-background text-foreground shadow-md">
      <h1 className="text-2xl font-bold">TeamUp</h1>
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
            <DropdownMenuContent className=" border-none shadow-none" align="center">
              <DropdownMenuItem className="flex flex-col items-center justify-center focus:bg-transparent border-none">
                <Button variant="destructive" className="w-auto h-auto object-fill" onClick={handleLogout}>Sign out</Button>
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
