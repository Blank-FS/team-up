"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TeamExtra, UserExtra } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExpandableCard } from "./ExpandableCard";
import ProfileCard from "./ProfileCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../ui/drawer"; // Assuming you have a drawer component
import { getUserByEmail } from "@/lib/utils/users";

interface FindTabProps {
  availableUsers: UserExtra[];
}

const FindTab: React.FC<FindTabProps> = ({ availableUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<TeamExtra[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [inviteUser, setInviteUser] = useState<UserExtra | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/get-user-teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleInvite = async () => {
    if (!selectedTeamId || !inviteUser) return;

    try {

      const user_email_response = await fetch('/api/get-user-by-email?email=' + user?.email);
      const userByEmail = await user_email_response.json();

      const response = await fetch("/api/send-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_id: selectedTeamId,
          sender_id: userByEmail?.user_id,
          receiver_id: inviteUser.user_id,
        }),
      });

      if (response.ok) {
        toast({
          title: "Invitation Sent",
          description: `An invitation has been sent to ${inviteUser.user_name}.`,
        });
        setIsDrawerOpen(false);
      } else {
        toast({
          title: "Error",
          description: "There was an error sending the invitation.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending the invitation.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
        user.first_name !== "")
  );

  const cards = filteredUsers.map((user) => ({
    title: `${user.first_name} ${user.last_name}`,
    src: user.avatar,
    description: (
      <div>
        <p className="mb-2">{user.email}</p>
        <div className="flex flex-row gap-1 items-center flex-wrap border-none">
          <Badge variant="secondary">{user.role}</Badge>
          {user.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    ),
    ctaText: "Close",
    ctaLink: "",
    content: (
      <div className="max-h-96 overflow-y-auto p-4">
        <h3 className="text-xl">
          <strong>School:</strong> {user.school}
        </h3>
        {user.bio && <p>{user.bio}</p>}
        <Button
          className="mt-4 bg-green-500 text-white"
          onClick={() => {
            setInviteUser(user);
            setIsDrawerOpen(true);
          }}
        >
          Invite
        </Button>
      </div>
    ),
    normal: (
      <ProfileCard
        pfp={user.avatar}
        username={user.user_name}
        name={cn(user.first_name, " ", user.last_name)}
        skills={user.skills}
      ></ProfileCard>
    ),
  }));

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users by name, email, or skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ExpandableCard
        cards={cards}
        active={
          cards.find(
            (card) =>
              card.title ===
              `${activeUser?.first_name} ${activeUser?.last_name}`
          ) || null
        }
        setActive={(card: any) => {
          if (card) {
            const user = availableUsers.find(
              (u) => `${u.first_name} ${u.last_name}` === card.title
            );
            setActiveUser(user || null);
          } else {
            setActiveUser(null);
          }
        }}
      />
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select a Team</DrawerTitle>
            <DrawerDescription>
              Choose a team to send an invitation to {inviteUser?.user_name}.
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.team_id}>
                <input
                  type="radio"
                  id={team.team_id}
                  name="team"
                  value={team.team_id}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                />
                <label htmlFor={team.team_id}>{team.team_name}</label>
              </div>
            ))}
          </div>
          <DrawerClose>
            <Button onClick={handleInvite}>Send Invite</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FindTab;
