import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import { getInfo } from "@/lib/utils/users";
import { addSkill } from "@/lib/utils/skills";

export default async function MongoTest() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return <p></p>;
}
