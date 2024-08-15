import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface WorkCardProps {
  title: string;
  linkUrl: string;
  coverImage: string;
}

const WorkCard = ({ title, linkUrl, coverImage }: WorkCardProps) => {
  return (
    <Card
      className="
    flex justify-start items-center sm:w-[600px] sm:h-[240px] w-5/6
    bg-muted border-b-4  transition-transform transform hover:scale-105
    px-4
    "
    >
      <Image
        src={coverImage}
        alt={title}
        width={130}
        height={0}
        className="rounded-lg m-2 mr-8"
      />
      <div className="flex flex-col justify-between w-full h-full pb-2">
        <CardTitle className="my-8 p-6">
          <Link className="hover:underline" href={linkUrl}>
            {title}
          </Link>
        </CardTitle>
        <CardFooter className="flex gap-6 items-center justify-start">
          {/* <Button>Vote</Button> */}
        </CardFooter>
      </div>
    </Card>
  );
};

export default WorkCard;
