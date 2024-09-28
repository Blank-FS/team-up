import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";

export default async function MongoTest() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return <></>;
}
