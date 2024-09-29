import { Team } from "@prisma/client";
import prisma from "../../prisma/db";
import { TeamExtra } from "../types";

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