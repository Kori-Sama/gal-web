"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminSideBar = () => {
  const pathname = usePathname();
  const linkClassName = " bg-secondary rounded-md p-2 hover:bg-secondary/60";

  return (
    <Card className="flex flex-col items-center py-8">
      <CardTitle className="mb-8">Admin Dashboard</CardTitle>
      <CardContent className="flex w-full flex-col">
        <nav className="flex flex-col gap-4">
          <Link
            href="/admin"
            className={cn(
              linkClassName,
              pathname === "/admin" && "bg-secondary/60",
            )}
          >
            管理主页
          </Link>
          <Link
            href="/admin/vote"
            className={cn(
              linkClassName,
              pathname === "/admin/vote" && "bg-secondary/60",
            )}
          >
            投票管理
          </Link>
          <Link
            href="/admin/rank"
            className={cn(
              linkClassName,
              pathname === "/admin/rank" && "bg-secondary/60",
            )}
          >
            投票排行
          </Link>
          <Link
            href="/admin/vote-log"
            className={cn(
              linkClassName,
              pathname === "/admin/vote-log" && "bg-secondary/60",
            )}
          >
            投票记录
          </Link>
        </nav>
      </CardContent>
    </Card>
  );
};

export default AdminSideBar;
