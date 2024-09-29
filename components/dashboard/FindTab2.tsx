"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useState } from "react";
import { FocusCards } from "../ui/focus-cards";
import { ExpandableCard } from "./ExpandableCard";
import { Badge } from "../ui/badge";
import { UserExtra } from "@/lib/types";
import ProfileCard from "./ProfileCard";
import { cn } from "@/lib/utils";
import { ExpandableCard1 } from "./ExpandableCard1";

interface FindTabProps {
  availableUsers: UserExtra[];
}

const FindTab2: React.FC<FindTabProps> = ({ availableUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const cards = filteredUsers.map((user) => ({
    title: `${user.first_name} ${user.last_name}`,
    src: user.avatar,
    description: (
      <div>
        <p className="mb-2">{user.email}</p>
        <div className="flex flex-row gap-1 items-center justify-center">
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{user.user_name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{user.role}</Badge>
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <strong>School:</strong> {user.school}
        </CardContent>
      </Card>
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
      <ExpandableCard1
        cards={cards}
        active={
          cards.find(
            (card) =>
              card.title ===
              `${activeUser?.first_name} ${activeUser?.last_name}`
          ) || null
        }
        setActive={(card) => {
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
    </div>
  );
};

export default FindTab2;
