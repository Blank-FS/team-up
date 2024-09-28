type User = {
  user_id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  skills?: string[];
  bio: string;
};

type Team = {
  team_id: number;
  team_name: string;
  team_description?: string;
  team_members: User[];
};

export type { User, Team };
