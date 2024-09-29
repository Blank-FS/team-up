import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import { User, Skill, Team } from "../types";
import { UserForm } from "../forms";

// Check if current user in session has profile, return true if user has profile
export async function hasProfile() {
  const session = await getSession();
  const user = session?.user;
  const email = user?.email;
  const profile = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return profile ? true : false;
}

export async function createProfile(formData: User) {
  if (await hasProfile()) return "Profile Exists";
  const session = await getSession();
  const user = session?.user as User;

  const profile = await prisma.user.create({
    data: {
      email: user.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      user_name: formData.user_name,
      school: formData.school,
    },
  });
}

export async function getInfo() {
  const session = await getSession();
  const user = session?.user as User;
  return user;
}
