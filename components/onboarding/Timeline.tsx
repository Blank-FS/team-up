import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

interface TimelineData {
  title: string;
  content: React.ReactNode;
}

interface TimelineComponentProps {
  data: TimelineData[];
}

export function TimelineComponent({ data }: TimelineComponentProps) {
  return (
    <div className="w-screen h-screen">
      <Timeline data={data} />
    </div>
  );
}