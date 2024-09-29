
export type UserForm = {
   user_id: string;
   user_name: string;
   first_name: string;
   last_name: string;
   avatar: string;
   role: string;
   bio: string;
   email: string;
   school: string;
   skills: string[];
};

export type UserSkillForm = {
   userID: string;
   skill_name: string;
};

export type UserTeamForm = {
   userID: string;
   teamID: string;
};