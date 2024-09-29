import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import {
  addUserTeam,
  createProfile,
  getInfo,
  getUpdateUserFormByEmail,
  updateUser,
} from "@/lib/utils/users";
import { addTeam } from "@/lib/utils/teams";
import { User } from "@prisma/client";
import { UserForm } from "@/lib/forms";

export default async function MongoTest() {
  const allUsers = await prisma.user.findMany();
  const user = await getInfo();
  console.log(allUsers, user);

  return <p></p>;
}
