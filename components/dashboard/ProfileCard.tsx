import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../ui/badge";

interface ProfileCardProps {
  pfp: string;
  name: string;
  skills: string[];
  username: string;
}

const ProfileCard = ({ pfp, name, skills, username }: ProfileCardProps) => {
  return (
    <div className="">
      <div className="flex gap-2 justify-self-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={pfp} alt={name} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between h-[80%]">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">
            {name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                className="bg-black dark:bg-[#CFC096] dark:text-slate-600"
                key={index}
                variant="outline"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
