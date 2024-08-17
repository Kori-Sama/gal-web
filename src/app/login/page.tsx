import LoginTableWithImage from "@/app/login/login-table-with-img";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const isRedirected = searchParams["is_redirected"] === "true";

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="h-20 flex flex-col justify-end">
        <h1 className="cursor-default text-[30px] font-bold pb-8">
          {isRedirected ? "你还没登录哦" : "Login"}
        </h1>
      </div>
      <LoginTableWithImage />
      <div className="h-20" />
    </main>
  );
};

export default LoginPage;
