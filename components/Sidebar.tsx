import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogOutIcon, SearchIcon, UserIcon, UsersIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "Profile",
    icon: (
      <UserIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Find",
    icon: (
      <SearchIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Teams",
    icon: (
      <UsersIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

interface CustomSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CustomSidebar: React.FC<CustomSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar animate open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div style={{ backgroundColor: "2A5993"}} className="mt-8 flex flex-col gap-5">
              {links.map((link, idx) => (
                <Button
                  variant="ghost"
                  key={idx}
                  onClick={() => setActiveTab(link.label)}
                  className={
                    cn(
                      activeTab === link.label
                        ? "bg-slate-300 dark:bg-gray-700"
                        : ""
                    ) + " flex flex-row items-center justify-start hover:bg-slate-200 dark:hover:bg-slate-700"
                  }
                >
                  {link.icon}
                  {open && <span className="ml-2">{link.label}</span>}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              variant="destructive"
              className="flex flex-row items-center justify-center"
              onClick={() => router.push("/api/auth/logout")}
            >
              <LogOutIcon
                className={`h-5 w-5 flex-shrink-0 ${open ? "mr-2" : ""}`}
              />
              <span>{open ? "Logout" : ""}</span>
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};
