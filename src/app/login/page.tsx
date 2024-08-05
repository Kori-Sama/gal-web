import LoginTableWithImage from "@/app/login/login-table-with-img";

const LoginPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-20">
      <div className="h-0" />
      <h1 className="cursor-default text-[40px] font-bold ">0721の私人Impart</h1>
      <LoginTableWithImage />
      <div className="h-20" />
    </main>
  );
};

export default LoginPage;
