import Navbar from "@/components/navbar";
import { getSession, sessionToUserInfo } from "@/lib/session";

const Header = async () => {
  const session = await getSession();

  return <Navbar userInfo={session ? sessionToUserInfo(session) : null} />;
};

export default Header;
