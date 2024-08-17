import LoginTableWithImage from "@/app/login/login-table-with-img";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const isRedirected = searchParams["is_redirected"] === "true";

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="flex h-10 flex-col justify-end pb-8 text-center">
        <h1 className="cursor-default text-[2rem] font-bold">
          {isRedirected ? "你还没登录哦" : "登录"}
        </h1>
      </div>
      <LoginTableWithImage />
      <div className="h-20" />
    </main>
  );
};

export default LoginPage;
