import { getUserByName, getAllUsers } from "@/lib/utils/users";
import { getAllTeams } from "@/lib/utils/teams";
import ProfileTab from "@/components/dashboard/Profile";
import FindTab from "@/components/dashboard/Find";
import TeamsTab from "@/components/dashboard/Teams";
import { CustomSidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { UserExtra } from "@/lib/types";
import { useState } from "react";

export default async function Dashboard() {
  const currentUser: UserExtra | null = await getUserByName("kennyli306");
  const availableUsers = await getAllUsers();
  const teams = await getAllTeams();

  const [activeTab, setActiveTab] = useState("Profile");

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
}
