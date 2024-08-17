import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ContentCard = () => {
  return (
    <Card className="flex flex-col px-8 py-16">
      <CardTitle className="text-[3rem]">About</CardTitle>
      <Separator className="mb-6 mt-2" />
      <CardContent></CardContent>
    </Card>
  );
};

export default ContentCard;
