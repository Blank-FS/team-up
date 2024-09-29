"use client";

import { useState } from "react";
import mocks from "@/lib/mocks";
import ProfileTab from "@/components/dashboard/Profile";
import FindTab from "@/components/dashboard/Find";
import TeamsTab from "@/components/dashboard/Teams";
import { CustomSidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const {
    mockCurrentUser: currentUser,
    mockAvailableUsers: availableUsers,
    mockTeams: teams,
  } = mocks;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab currentUser={currentUser} />;
      case "Find":
        return <FindTab availableUsers={availableUsers} />;
      case "Teams":
        return <TeamsTab teams={teams} />;
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
        <main className="flex-1 p-6 overflow-auto bg-background text-foreground">
          <h2 className="text-3xl font-bold mb-4">{activeTab}</h2>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
