export type Role = "normal" | "admin" | "root";

export type UserInfo = {
  id: string;
  qqNumber: string;
  role: Role;
  username?: string;
  avatarUrl?: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

export type WorkType = {
  id: number;
  title: string;
  linkUrl: string;
  coverImage: string;
};

export type InviteKeyType = {
  id: number;
  key: string;
  generatedBy: string;
  createdAt: Date;
  expiresAt: Date;
  invitedUser: UserInfo;
};

export type VoteType = {
  id: number;
  user: UserInfo;
  category: {
    id: number;
    name: string;
  };
  work: WorkType;
  createdAt: Date;
};
