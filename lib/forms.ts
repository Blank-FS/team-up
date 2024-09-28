import { User, Skill, Team } from "./types";

export type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  teams: Set<Team>;
  skills: Set<Skill>;
};

export type UserSkillForm = {
   userID: string;
   skill: Skill;
};

export type UserTeamForm = {
   userID: User;
   team: Team;
};