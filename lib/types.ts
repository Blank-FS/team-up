export type User = {
  id?: string;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  teamIDs: Set<string>;
  skills: Set<Skill>;
};

export type Team = {
  id?: string;
  team_name: string;
  userIDs: Set<string>;
  skills:  Set<Skill>;
};

export type Skill = {
  id?: string;
  skill_name: string;
};
