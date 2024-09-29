"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TeamExtra } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { UserExtra } from "../../lib/types";
import TeamCard from "./TeamCard";

interface TeamsTabProps {
  teams: TeamExtra[];
}

export default function TeamsPage({ teams }: TeamsTabProps) {
  const [user, setUser] = useState<UserExtra | null>(null);
  const { toast } = useToast();
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const [newTeam, setNewTeam] = useState({ team_name: "", description: "" });

  const handleAddTeam = () => {
    console.log("Adding new team:", newTeam);
    toast({
      title: "Team Created",
      description: `${newTeam.team_name} has been successfully created.`,
    });
    setIsAddingTeam(false);
    setNewTeam({ team_name: "", description: "" });
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch("/api/get-profile");
      const response = await data.json();
      console.log("User data:", response);
      setUser(response)
    };
    getUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="my-teams" className="w-full bg-transparent">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent value="my-teams">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {teams
                .filter((team) =>
                  team.users.some(
                    (teamUser) => teamUser.user_id === user?.user_id
                  )
                )
                .map((team) => (
                  <motion.div
                    key={team.team_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TeamCard team={team} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </TabsContent>
        <TabsContent value="others">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {teams
                .filter(
                  (team) =>
                    !team.users.some((teamUser) => teamUser.user_id === user?.user_id)
                )
                .map((team) => (
                  <motion.div
                    key={team.team_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TeamCard team={team} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddingTeam} onOpenChange={setIsAddingTeam}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
            onClick={() => setIsAddingTeam(true)}
          >
            <PlusCircle size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Team</DialogTitle>
            <DialogDescription>
              Enter the details for your new team. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team_name" className="text-right">
                Team Name
              </Label>
              <Input
                id="team_name"
                value={newTeam.team_name}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, team_name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTeam.description}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddingTeam(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
