import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface ContentCardProps {
  title: string;
  children?: React.ReactNode;
}

const ContentCard = ({ title, children }: ContentCardProps) => {
  return (
    <Card className="flex flex-col px-8 py-16">
      <CardTitle className="text-[3rem]">{title}</CardTitle>
      <Separator className="mb-6 mt-2" />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentCard;
