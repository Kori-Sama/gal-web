import { UserInfo } from "@/lib/types";
import { create } from "zustand";

interface UserState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUser = create<UserState>()(set => ({
  userInfo: { id: "", qqNumber: "No Login", role: "normal" },
  setUserInfo: (userInfo: UserInfo) => {
    set({ userInfo });
  },
}));
