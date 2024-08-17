export type Role = "normal" | "admin" | "root";

export type UserInfo = {
  id: string;
  qqNumber: string;
  role: Role;
};
