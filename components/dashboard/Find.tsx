import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";

interface FindTabProps {
  availableUsers: User[];
}

const FindTab: React.FC<FindTabProps> = ({ availableUsers }) => {
  return (
    <div className="space-y-4">
      <Input placeholder="Search users or teams..." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableUsers.map((user) => (
          <Card key={user.user_id}>
            <CardHeader>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>View Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindTab;
