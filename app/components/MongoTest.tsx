import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/prisma/db";
import { getInfo } from "@/lib/utils/users";

export default async function MongoTest() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  let user = await getInfo();
  console.log(user);
  return <p></p>;
}
