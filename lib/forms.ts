import { Skill } from "@prisma/client";

export type UserForm = {
   user_name: string
   first_name: string;
   last_name: string;
   email: string;
   school: string;
};

export type UserSkillForm = {
   userID: string;
   skillID: string;
}

export type UserTeamForm = {
   userID: string;
   teamID: string;
};