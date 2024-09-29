import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import { User, Skill, Team } from "../types";
import { UserForm, UserSkillForm } from "../forms";

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
  const user = session?.user as User;
  return user;
}

export async function getUserById(userID: string): Promise<User | null> {
  const session = await getSession();
  const userRs = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      teams: true,
      skills: true
    }
  });

  if (userRs == null) {
    return null;
  }

  let user: User = {
    id: userRs.id,
    user_name: userRs.user_name,
    first_name: userRs.first_name,
    last_name: userRs.last_name,
    email: userRs.email,
    school: userRs.school,
    teamIDs: new Set(userRs.teamIDs),
    skills: new Set(userRs.skills)
  };

  return user;
}

export async function addUserSkill(
  userSkillForm: UserSkillForm
) {
  const session = await getSession();
  const user = session?.user as User;

  const updatedUser = await prisma.user.update({
    where: { id: userSkillForm.userID },
    data: {
      skills: {
        connectOrCreate: [
          {
            where: {
              skill_name: userSkillForm.skill.id,
            },
            create: userSkillForm.skill,
          },
        ],
      }
    },
  });

}