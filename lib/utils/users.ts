import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import type { User } from '@prisma/client'
import { UserSkillForm, UserTeamForm, UserForm } from "../forms";
import { UserExtra } from "../types";

// Check if current user in session has profile, return true if user has profile
export async function hasProfile(email: string) {
  const profile = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return profile ? true : false;
}

export async function createProfile(user: UserForm) {
  if (await hasProfile(user.email)) return "Profile Exists";
  const profile = await prisma.user.create({
    data: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      school: user.school,
      avatar: user.avatar,
      role: user.role,
      bio: user.bio,
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
      teams: true
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
      teams: true
    }
  });

  return user;
}

export async function getAllUsers(): Promise<UserExtra[] | null> {
  const user = await prisma.user.findMany({ include: { teams: true } });
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
        push: userSkillForm.skill_name
      },
    },
  });
}

export async function addUserTeam(
  userTeamForm: UserTeamForm
) {
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

export async function getUpdateUserFormByEmail(email: string): Promise<UserForm | null> {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      user_id: true,
      user_name: true,
      first_name: true,
      last_name: true,
      avatar: true,
      role: true,
      bio: true,
      email: true,
      school: true,
      skills: true
    }
  });

  return user;
}

export async function updateUser(
  user: UserForm
) {
  const updatedUser = await prisma.user.update({
    where: { user_id: user.user_id },
    data: {
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      role: user.role,
      bio: user.bio,
      email: user.email,
      school: user.school,
      skills: user.skills
    },
  });
}