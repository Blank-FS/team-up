import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamExtra } from "@/lib/types";


interface TeamsTabProps {
  teams: TeamExtra[];
}

const TeamsTab: React.FC<TeamsTabProps> = ({ teams }) => {
  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <Card key={team.team_id}>
          <CardHeader>
            <CardTitle>{team.team_name}</CardTitle>
            <CardDescription textColor="text-[#00274C] dark:text-gray">{team.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Members:</h3>
            <div className="flex gap-2">
              {team.users.map((user) => (
                <Avatar key={user.user_id}>
                  <AvatarFallback>
                    {user.user_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamsTab;
