import { Skill, Team, User } from "./types";

export type UserSkillForm = {
   userID: string;
   skill: Skill;
};

export type UserTeamForm = {
   userID: User;
   team: Team;
};