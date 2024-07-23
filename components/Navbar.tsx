import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItemProps = {
  id: number;
  text: string;
  icon: string;
  activeIcon: string;
  route: string;
};

export function Navbar() {
  const [menuShown, setMenuShown] = useState<boolean>(false);
  const path = usePathname();

  const navItems = [
    {
      id: 1,
      text: "Links",
      icon: "/icons/link.svg",
      activeIcon: "/icons/link-purple.svg",
      route: "/",
    },
    {
      id: 2,
      text: "Profile Details",
      icon: "/icons/user.svg",
      activeIcon: "/icons/user-purple.svg",
      route: "/profile",
    },
  ];
  return (
    <nav className="px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <Image
          src="/icons/logo.svg"
          width="0"
          height="0"
          className="w-fit sm:hidden"
          alt="logo"
        />
        <Image
          src="/icons/logo-group.svg"
          width="0"
          height="0"
          className="w-fit hidden sm:block sm:w-[9rem]"
          alt="logo"
        />
      </Link>
      <div className="flex items-center">
        {navItems?.map((item: NavItemProps) => (
          <Link
            key={item.id}
            href={item.route}
            className={` ${
              path === item.route
                ? "text-purple bg-light-purple"
                : "bg-transparent text-grey"
            } md:flex gap-2 items-center px-[1.69rem] py-[0.69rem] rounded-lg`}
          >
            <Image
              src={path === item.route ? item.activeIcon : item.icon}
              width="0"
              height="0"
              className="w-6 h-6"
              alt="logo"
            />
            <span className="hidden md:block">{item.text}</span>
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="px-4 py-[0.69rem] border rounded-lg border-purple text-purple"
      >
        <Image
          src="/icons/eye.svg"
          width="0"
          height="0"
          className="w-6 md:hidden"
          alt="logo"
        />
        <span className="hidden md:block">Preview</span>
      </Link>
    </nav>
  );
}
