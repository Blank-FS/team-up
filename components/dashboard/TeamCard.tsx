import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TeamExtra } from "@/lib/types";
import { Calendar } from "lucide-react";
import { useState } from "react";

type TeamCardProps = {
  team: TeamExtra;
};

export default function TeamCard({ team }: TeamCardProps) {
  const [selectedTeam, setSelectedTeam] = useState<TeamExtra | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.team_name}</CardTitle>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Members: {team.users.length}</p>
        <p>Events: {team.events.length}</p>
      </CardContent>
      <CardFooter>
        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={() => setSelectedTeam(team)}>View Details</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>{selectedTeam?.team_name}</SheetTitle>
              <SheetDescription>{selectedTeam?.description}</SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-full py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Members</h3>
                  <div className="space-y-2">
                    {selectedTeam?.users.map((user) => (
                      <div
                        key={user.user_id}
                        className="flex items-center space-x-2"
                      >
                        <span>{user.user_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Events</h3>
                  {selectedTeam?.events.length === 0 ? (
                    <p>No events scheduled</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedTeam?.events.map((event) => (
                        <div
                          key={event.event_id}
                          className="flex items-center space-x-2"
                        >
                          <Calendar className="h-5 w-5" />
                          <span>{event.event_name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
