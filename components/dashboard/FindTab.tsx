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

interface FindTabProps {
  availableUsers: UserExtra[];
}

const FindTab: React.FC<FindTabProps> = ({ availableUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillIDs.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const cards = filteredUsers.map((user) => ({
    title: `${user.first_name} ${user.last_name}`,
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: user.email,
    ctaText: "View Profile",
    ctaLink: "#",
    content: (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{user.user_name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{user.role}</Badge>
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill.skill_name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <strong>School:</strong> {user.school}
        </CardContent>
      </Card>
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

export default FindTab;
