"use client";
import { useAuthStore } from "@/store/auth";
import { IconHome, IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FloatingNav, IItem } from "../ui/floating-navbar";

export default function Navbar() {
  const { session, logout } = useAuthStore();
  const router = useRouter();

  let navItems: IItem[] = [
    {
      name: "Home",
      link: "/",
      onClick: undefined,
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  if (!session) {
    navItems = navItems.concat([
      {
        name: "Login",
        link: "/login",
        onClick: undefined,
        icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
      },
      {
        name: "Register",
        link: "/register",
        onClick: undefined,
        icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
      },
    ]);
  } else {
    navItems = navItems.concat([
      {
        name: "Logout",
        link: "#",
        onClick: () => {
          logout().then(() => {
            router.push("/");
          });
        },
        icon: (
          <IconLogout className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
      },
    ]);
  }

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
