import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../prisma/db";
import { User, Skill, Team } from "../types";
import { UserSkillForm } from "../forms";

export async function addTeam(team_name: string) {
   const session = await getSession();

   const skill = await prisma.team.create({
      data: {
         team_name: team_name
      },
   });
}

export async function getTeamByName(team_name: string): Promise<Team | null> {
   const session = await getSession();
   const teamRs = await prisma.team.findUnique({
      where: {
         team_name: team_name,
      },
      include: {
         users: true,
         skills: true
      }
   });

   if (teamRs == null) {
      return null;
   }

   let team: Team = {
      id: teamRs.id,
      team_name: teamRs.team_name,
      userIDs: new Set(teamRs.userIDs),
      skills: new Set(teamRs.skills)
   };

   return team;
}