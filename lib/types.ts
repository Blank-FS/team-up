export type User = {
  id?: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  teams: Set<Team>;
  skills: Set<Skill>;
};

export type Team = {
  id?: string;
  team_name: string;
  users: Set<User>;
  skills:  Set<Skill>;
};

export type Skill = {
  id?: string;
  skill_name: string;
};
