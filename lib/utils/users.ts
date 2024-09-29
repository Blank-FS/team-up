import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import type { User } from '@prisma/client'
import { UserForm, UserSkillForm, UserTeamForm } from "../forms";
import { UserExtra } from "../types";

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

export async function createProfile(formData: UserForm) {
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
  const user = session?.user as UserExtra;
  return user;
}

export async function getUserById(user_id: string): Promise<UserExtra | null> {
  const user = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
    include: {
      teams: true,
      skills: true
    }
  });

  return user;
}

export async function getUserByName(user_name: string): Promise<UserExtra | null> {
  const user = await prisma.user.findUnique({
    where: {
      user_name: user_name,
    },
    include: {
      teams: true,
      skills: true
    }
  });

  return user;
}

export async function getAllUsers(): Promise<UserExtra[] | null> {
  const user = await prisma.user.findMany({ include: { teams: true, skills: true } });
  return user;
}

export async function addUserSkill(
  userSkillForm: UserSkillForm
) {
  const session = await getSession();
  const user = session?.user as User;

  const updatedUser = await prisma.user.update({
    where: { user_id: userSkillForm.userID },
    data: {
      skills: {
        connect: [
          {
            skill_id: userSkillForm.skill_name
          },
        ],
      }
    },
  });
}

export async function addUserTeam(
  userTeamForm: UserTeamForm
) {
  const session = await getSession();
  const user = session?.user as User;

  const updatedUser = await prisma.user.update({
    where: { user_id: userTeamForm.userID },
    data: {
      teams: {
        connect: [
          {
            team_id: userTeamForm.teamID
          },
        ],
      }
    },
  });
}