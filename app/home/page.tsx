import { getUserByEmail, getAllUsers, getInfo, createProfile } from "@/lib/utils/users";
import { getAllTeams } from "@/lib/utils/teams";
import { UserExtra } from "@/lib/types";
import { User } from "@prisma/client";
import Tab from "@/components/dashboard/Tab";
import { UserForm } from "@/lib/forms";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export default async function Dashboard() {
  const sessUser = await getInfo() as UserProfile;
  const currentUser: UserExtra | null = await getUserByEmail(sessUser.email as string);
  const availableUsers : User[] | null = await getAllUsers();
  const teams = await getAllTeams();

  if (currentUser == null) {
    let userForm : UserForm = {
      user_id: "",
      user_name: sessUser.nickname as string,
      first_name: "",
      last_name: "",
      avatar: sessUser.picture as string,
      role: "",
      bio: "",
      email: sessUser.email as string,
      school: "",
      skills: []
    }

    await createProfile(userForm);
  }

  return (
    <Tab
      currentUser={currentUser}
      availableUsers={availableUsers}
      teams={teams}
    />
  );
}
