import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import { addUserTeam, createProfile, getAllUserSkill, getInfo, getUpdateUserFormByEmail, removeUserTeam, updateUser } from "@/lib/utils/users";
import { addTeam, getAllTeamSkills, getTeamUsers } from "@/lib/utils/teams";
import { User } from "@prisma/client";
import { UserForm } from "@/lib/forms";

export default async function MongoTest() {
  
  console.log(await getAllTeamSkills("TeamUp"));

  return <p></p>;
}
