import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import { addUserTeam, createProfile, getAllUserSkill, getInfo, getUpdateUserFormByEmail, removeUserTeam, updateUser } from "@/lib/utils/users";
import { addTeam, getAllTeamSkills, getTeamUsers } from "@/lib/utils/teams";
import { User } from "@prisma/client";
import { UserForm } from "@/lib/forms";

export default async function MongoTest() {
  
  addUserTeam({userID: "22b55180-2caf-4636-8f2c-c5d56d11ad6a", teamID: "30c62429-eda7-4d1b-a5ae-dbca4aca63cc"});
  console.log(await getAllTeamSkills("TeamUp"));


  return <p></p>;
}
