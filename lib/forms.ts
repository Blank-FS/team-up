import { User, Skill, Team } from "./types";

export type UserForm = {
   user_name: string
   first_name: string;
   last_name: string;
   email: string;
   school: string;
};

export type UserSkillForm = {
   userID: string;
   skill: Skill;
};

export type UserTeamForm = {
   userID: string;
   teamID: string;
};