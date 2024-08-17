import AlertInfo from "@/components/alert/alert-info";
import { useEffect, useState } from "react";

type AlertParams = {
  message: string;
  type?: "info";
  timeout?: number;
};

export const useAlert = ({
  message,
  type = "info",
  timeout,
}: AlertParams): [(open: boolean) => void, JSX.Element | null] => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), timeout ?? 2000);
    return () => clearTimeout(timer);
  });

  return [
    setOpen,
    open ? (
      <div
        className="transition-all slide-in-from-top-40 slide-out-to-top-0
        fixed left-auto right-auto top-1/4 w-fit min-w-64"
      >
        {type === "info" ? <AlertInfo>{message}</AlertInfo> : <></>}
      </div>
    ) : null,
  ];
};
