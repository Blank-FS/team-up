
type User = {
   id: number;
   user_name: string;
   password: string;
   first_name: string;
   last_name: string;
   email: string;
   school: string;
   teams: Team[];
   skills: Skill[];
};

type Team = {
   id: number;
   team_name: string;
   users: User[];
   skills: Skill[];
};

type Skill = {
   id: number;
   skill_name: string;
   category: String;
}