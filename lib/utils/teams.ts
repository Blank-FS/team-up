import { Team, User } from "@prisma/client";
import prisma from "../../prisma/db";
import { TeamExtra } from "../types";
import { Users } from "lucide-react";
import { getAllUserSkill } from "./users";

export async function getAllTeams(): Promise<TeamExtra[] | null> {
   const teams = await prisma.team.findMany({
      include: {
         users: true
      }
   });

   return teams;
}

export async function addTeam(team_name: string) {
   const skill = await prisma.team.create({
      data: {
         team_name: team_name
      },
   });
}

export async function getTeamByName(team_name: string): Promise<TeamExtra | null> {
   const team = await prisma.team.findUnique({
      where: {
         team_name: team_name,
      },
      include: {
         users: true
      }
   });


   return team;
}

export async function getTeamUsers(team_name: string): Promise<User[] | null> {
   const team = await prisma.team.findUnique({
      where: {
         team_name: team_name
      },
      select: {
         users: true
      }
   });

   return team?.users as User[];
}

export async function getAllTeamSkills(team_name: string): Promise<Set<string> | null> {
   const users = await getTeamUsers(team_name) as User[];
   let skills: Set<string> = new Set();

   for (const user of users) {
      let userSkills = await getAllUserSkill(user.user_id) as string[];
      userSkills.forEach(userSkill => {
         skills.add(userSkill);
      });
   }

   return skills as Set<string>;
}