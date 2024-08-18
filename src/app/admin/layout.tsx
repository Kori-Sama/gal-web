import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AdminSideBar from "./sidebar";
import { headers } from "next/headers";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isDesktop = true;
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const subPath = pathname?.split("/")[1];

  console.log(pathname);

  return (
    <div className="m-auto max-w-7xl">
      <div className="relative top-16 grid grid-cols-1 gap-4 p-0 md:top-0 md:grid-cols-5 md:p-0 lg:grid-cols-4 lg:p-4">
        <div className="top-4 order-2 hidden bg-white bg-opacity-0 p-2 max-md:hidden md:order-1 md:col-span-1 md:inline">
          {isDesktop && (
            <>
              <AdminSideBar />
            </>
          )}
        </div>
        <div className="order-1 col-span-3 bg-white bg-opacity-0 p-2 md:order-2 md:col-span-4 lg:col-span-3">
          <Card>
            <CardTitle>{subPath}</CardTitle>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;