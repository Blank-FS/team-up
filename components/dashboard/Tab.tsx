"use client";

import FindTab from "@/components/dashboard/FindTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import TeamsTab from "@/components/dashboard/TeamsTab";
import Navbar from "@/components/Navbar";
import { CustomSidebar } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import InvitesCard from "./PendingTab";

export default function Tab({ currentUser, availableUsers, teams }: any) {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab currentUser={currentUser} />;
      case "Find":
        return <FindTab availableUsers={availableUsers} />;
      case "Teams":
        return <TeamsTab teams={teams} />;
      case "Pending":
        return <InvitesCard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <CustomSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Separator className="h-full mb-auto" orientation="vertical" />
        <main className="flex-1 p-6 overflow-auto bg-slate-200 dark:bg-slate-800 text-foreground">
          <h2 className="text-3xl font-bold mb-4">{activeTab}</h2>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
