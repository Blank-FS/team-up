import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogOutIcon, SearchIcon, UserIcon, UsersIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "Profile",
    icon: UserIcon,
  },
  {
    label: "Find",
    icon: SearchIcon,
  },
  {
    label: "Teams",
    icon: UsersIcon,
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
      <style jsx global>{`
        :root {
          --sidebar-bg: #2A5993;
        }
        .dark {
          --sidebar-bg: #2A5993;
        }
        .sidebar-container {
          background-color: var(--sidebar-bg) !important;
        }
      `}</style>
      <Sidebar animate open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 sidebar-container">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-5">
              {links.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Button
                    variant="ghost"
                    key={idx}
                    onClick={() => setActiveTab(link.label)}
                    className={cn(
                      "flex flex-row items-center justify-start",
                      "hover:bg-emerald-200 dark:hover:bg-emerald-800",
                      "text-[#FFCB05] dark:text-[#FFCB05]",
                      "group",
                      activeTab === link.label
                        ? ""
                        : ""
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 text-[#FFCB05] dark:text-[#FFCB05] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    {open && <span className="ml-2">{link.label}</span>}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              variant="destructive"
              className="flex flex-row items-center justify-center bg-red-600 hover:bg-red-700 text-white group"
              onClick={() => router.push("/api/auth/logout")}
            >
              <LogOutIcon className="h-5 w-5 flex-shrink-0 group-hover:text-red-200 transition-colors" />
              {open && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};