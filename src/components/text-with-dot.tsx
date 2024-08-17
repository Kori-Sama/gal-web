import React from "react";

const TextWithDot = ({
  children,
}: {
  children: React.ReactElement | string;
}) => {
  return (
    <div className="flex items-center justify-start gap-2 text-nowrap">
      <div className="size-2 rounded-full bg-primary" />
      {children}
    </div>
  );
};

export default TextWithDot;
