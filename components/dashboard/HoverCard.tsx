import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Badge } from "../ui/badge";

interface ProfileCardProps {
  pfp: string;
  name: string;
  skills: string[];
  username: string;
}

const HoverCard = ({ pfp, name, skills, username }: ProfileCardProps) => {
  return (
    <div className="relative z-50">
      <div className="flex gap-2 justify-self-center p-4">
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
                className="bg-black dark:bg-[#CFC096] dark:text-slate-600 text-slate-400"
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

export default HoverCard;
