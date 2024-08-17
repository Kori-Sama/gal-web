import Link, { LinkProps } from "next/link";
import { cn, isAdmin } from "@/lib/utils";
import { Home, Bolt, Vote, Shield } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/store/user";

interface NavItemsProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

const NavItems = ({ ...props }: NavItemsProps) => {
  const role = useUser((s) => s.userInfo).role;

  return (
    <>
      {isAdmin(role) && (
        <LinkItem href="/admin" {...props}>
          <Shield />
          <p>Admin</p>
        </LinkItem>
      )}
      <LinkItem href="/vote" {...props}>
        <Vote />
        <p>Vote</p>
      </LinkItem>
      <LinkItem href="/about" {...props}>
        <Bolt />
        <p>About</p>
      </LinkItem>
      <LinkItem href="/" {...props}>
        <Home />
        <p>Home</p>
      </LinkItem>
    </>
  );
};
export default NavItems;

interface LinkItemProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const LinkItem = ({
  href,
  className,
  children,
  onOpenChange: onOpenChanged,
  ...props
}: LinkItemProps) => {
  const pathname = usePathname();
  const item = cn(
    buttonVariants({ variant: "ghost" }),
    className,
    "space-x-2",
    pathname === href.toString() ? "bg-accent text-accent-foreground" : ""
  );
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChanged?.(false);
      }}
      className={item}
      {...props}
    >
      {children}
    </Link>
  );
};
