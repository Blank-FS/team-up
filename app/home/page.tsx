import { getUserByEmail, getAllUsers, getInfo } from "@/lib/utils/users";
import { getAllTeams } from "@/lib/utils/teams";
import { UserExtra } from "@/lib/types";
import { User } from "@prisma/client";
import Tab from "@/components/dashboard/Tab";

export default async function Dashboard() {
  const currSessionUser = await getInfo();
  const currentUser: UserExtra | null = await getUserByEmail(currSessionUser.email);
  const availableUsers : User[] | null = await getAllUsers();
  const teams = await getAllTeams();

  return (
    <Tab
      currentUser={currentUser}
      availableUsers={availableUsers}
      teams={teams}
    />
  );
}
