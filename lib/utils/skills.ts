import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import { User, Skill, Team } from "../types";

export async function addSkill(skill_name: string) {
  const session = await getSession();

  const skill = await prisma.skill.create({
    data: {
      skill_name: skill_name,
    },
  });
}

export async function getSkillByName(
  skill_name: string
): Promise<Skill | null> {
  const session = await getSession();
  const skill = await prisma.skill.findUnique({
    where: {
      skill_name: skill_name,
    },
  });

  return skill;
}
