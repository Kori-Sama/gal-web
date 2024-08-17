"use client";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

const AvatarKori = () => {
  const sound = new Audio("/audio/master-mura.mp3");
  return (
    <Avatar
      className="size-28 cursor-pointer"
      onClick={() => {
        sound.play();
      }}
    >
      <Image
        src="https://q3.qlogo.cn/headimg_dl?dst_uin=2923038671&spec=640"
        alt="KoriSama"
        width={300}
        height={300}
      />
    </Avatar>
  );
};

export default AvatarKori;
