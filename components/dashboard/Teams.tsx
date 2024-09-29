import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/lib/types";

interface TeamsTabProps {
  teams: Team[];
}

const TeamsTab: React.FC<TeamsTabProps> = ({ teams }) => {
  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <Card key={team.team_id}>
          <CardHeader>
            <CardTitle>{team.team_name}</CardTitle>
            <CardDescription>{team.team_description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Members:</h3>
            <div className="flex gap-2">
              {team.team_members.map((member) => (
                <Avatar key={member.user_id}>
                  <AvatarFallback>
                    {member.username
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
