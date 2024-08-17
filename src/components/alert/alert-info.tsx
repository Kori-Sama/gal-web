import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactElement } from "react";

const AlertInfo = ({ children }: { children: ReactElement | string }) => {
  return (
    <Alert variant="default">
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

export default AlertInfo;
