import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";

// Check if current user in session has profile, return true if user has profile
export async function hasProfile() {
  const session = await getSession();
  const user = session?.user;
  const email = user?.email;
  const profile = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  return profile ? true : false;
}
