import Link from "next/link";
import React from "react";

interface LinkWithIconProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const LinkWithIcon = ({ href, icon, children }: LinkWithIconProps) => {
  return (
    <div className="flex items-center justify-start gap-2">
      {icon}
      <Link href={href} className="hover:underline">
        {children}
      </Link>
    </div>
  );
};

export default LinkWithIcon;
