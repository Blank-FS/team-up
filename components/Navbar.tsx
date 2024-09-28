// components/Navbar.tsx
import { ThemeSwitch } from "./theme-switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-background text-foreground shadow-md">
      <h1 className="text-2xl font-bold">TeamUp</h1>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
