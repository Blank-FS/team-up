import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";

export default async function MongoTest() {
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
  return <p>Hello World</p>;
}
