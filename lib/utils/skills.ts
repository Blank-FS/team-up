import { Skill } from "@prisma/client";
import prisma from "../../prisma/db";

export async function addSkill(skill_name: string) {
  const skill = await prisma.skill.create({
    data: {
      skill_name: skill_name,
    },
  });
}

export async function getSkillByName(
  skill_name: string
): Promise<Skill | null> {
  const skill = await prisma.skill.findUnique({
    where: {
      skill_name: skill_name,
    },
  });

  return skill;
}
