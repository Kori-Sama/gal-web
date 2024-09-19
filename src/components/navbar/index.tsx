"use client";
import { ModeToggle } from "@/components/button/mode-toggle";
import NavAvatar from "@/components/navbar/nav-avatar";
import NavMenu from "@/components/navbar/nav-menu";
import NavMobile from "@/components/navbar/nav-moblie";
import useMediaQuery from "@/hook/use-media-query";
import { UserInfo } from "@/lib/types";
import { useUser } from "@/store/user";
import { useEffect } from "react";

interface NavbarProps {
  userInfo: UserInfo | null;
}

const Navbar = ({ userInfo }: NavbarProps) => {
  const isDesktop = useMediaQuery();

  const setUserInfo = useUser(s => s.setUserInfo);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  return (
    <nav className="fixed z-50 flex h-16 w-screen items-center justify-between overflow-hidden border-b-2 border-white bg-inherit p-2 px-2 shadow-md dark:border-slate-400 md:px-8">
      {isDesktop ? (
        <>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <NavAvatar className="pl-2 md:pl-4" userInfo={userInfo} />
          </div>
          <NavMenu />
        </>
      ) : (
        <>
          <NavAvatar className="pl-2 md:pl-4" userInfo={userInfo} />
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <NavMobile />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
