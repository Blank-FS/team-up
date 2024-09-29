import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import { getInfo } from "@/lib/utils/users";

export default async function MongoTest() {
  const allUsers = await prisma.user.findMany();
  const user = await getInfo();
  console.log(allUsers, user);
  return <p></p>;
}
