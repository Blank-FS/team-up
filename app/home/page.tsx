import { getUserByName, getAllUsers } from "@/lib/utils/users";
import { getAllTeams } from "@/lib/utils/teams";
import { UserExtra } from "@/lib/types";
import Tab from "@/components/dashboard/Tab";

export default async function Dashboard() {
  const currentUser: UserExtra | null = await getUserByName("kennyli306");
  const availableUsers = await getAllUsers();
  const teams = await getAllTeams();

  return (
    <Tab
      currentUser={currentUser}
      availableUsers={availableUsers}
      teams={teams}
    />
  );
}
