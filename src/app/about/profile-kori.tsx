import LinkWithIcon from "@/components/link-with-icon";
import TextWithDot from "@/components/text-with-dot";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PanelTop } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import BilibiliIcon from "@/components/icons/bilibili";
import DiscordIcon from "@/components/icons/discord";
import AvatarKori from "./avatar-kori";

const ProfileKori = () => {
  return (
    <Card className="flex flex-col items-center justify-center pt-4">
      <AvatarKori />
      <CardTitle className="mt-4">Kori Sama</CardTitle>
      <CardDescription className="text-center">
        Full Stack Developer
      </CardDescription>
      <Separator className="my-4" />
      <CardContent>
        <TextWithDot>本站站长</TextWithDot>
        <TextWithDot>你交在读23级人工智能</TextWithDot>
        <div className="mt-6 flex flex-col items-start justify-center gap-3">
          <p>联系方式:</p>
          <div className="flex flex-col gap-2 pl-6">
            <LinkWithIcon
              href="https://korisama.top"
              icon={<PanelTop size={24} />}
            >
              个人网站
            </LinkWithIcon>{" "}
            <LinkWithIcon
              href="https://github.com/Kori-Sama"
              icon={<GithubIcon />}
            >
              Github
            </LinkWithIcon>
            <LinkWithIcon
              href="https://space.bilibili.com/17371684"
              icon={<BilibiliIcon />}
            >
              Bilibili
            </LinkWithIcon>
            <LinkWithIcon
              href="https://discord.gg/eejZ6SGq28"
              icon={<DiscordIcon />}
            >
              Discord
            </LinkWithIcon>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileKori;
