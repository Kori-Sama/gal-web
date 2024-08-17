"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/lib/actions";
import { UserInfo } from "@/lib/types";
import { useEffect, useState } from "react";

interface NavAvatarProps {
  userInfo: UserInfo | null;
  className?: string;
}

const DEFAULT_AVATAR =
  "https://i1.hdslb.com/bfs/face/ebcd69bd40fea51117a342a1b3e79cbb9d8bcfe3.jpg@240w_240h_1c_1s_!web-avatar-space-header.avif";

const NavAvatar = ({ userInfo, className }: NavAvatarProps) => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    if (!userInfo) {
      setUsername("No Login");
      setAvatarUrl(DEFAULT_AVATAR);
      return;
    }
    fetch(`/api/qq-info?qq=${userInfo.qqNumber}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setUsername(data.username);
        setAvatarUrl(data.avatarUrl);
      });
  }, [userInfo]);

  return (
    <div className={cn("flex items-center", className)}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full border-2 hover:border-foreground">
            <Avatar>
              <Image src={avatarUrl} width={60} height={60} alt="Avatar" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-default">
              {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/login" className="size-full text-sm font-medium ">
                  Login
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-destructive focus:bg-destructive/60">
              <AlertDialogTrigger className="w-full text-start text-sm font-medium">
                LogOut
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={logout}>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/60 w-full"
                type="submit"
              >
                Confirm
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NavAvatar;
