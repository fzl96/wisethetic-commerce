"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { signOut } from "@/lib/auth-client";

import {
  IconLogin2,
  IconCornerDownRight,
  IconSparkles,
} from "@tabler/icons-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { config as siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";
import { MobileNavToggle } from "./mobile-nav-toggle";
import { ModeToggle } from "@/components/mode-toggle";
// import { ModeToggle } from "@/components/mode-toggle";

type user =
  | {
      id: string;
      name: string;
      emailVerified: boolean;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined;
    }
  | undefined;

type studio = {
  name: string;
  id: string;
  image: string | null;
  banner: string | null;
  email: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  phoneNumber: string;
} | null;

interface NavbarProps {
  user: user;
  studio: studio;
}

export function Navbar({ user, studio }: NavbarProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const logout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <>
      <motion.header
        variants={{
          visible: {
            y: 0,
          },
          hidden: {
            y: "-100%",
          },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.2 }}
        className="sticky top-0 z-30 w-full bg-background"
      >
        <div className="flex items-center justify-between lg:px-46 px-8 py-6">
          <div className="">
            <Link
              href="/"
              className="font-firaSans uppercase tracking-[0.25em] text-primary-accent md:text-xl"
            >
              {siteConfig.name}
            </Link>
          </div>
          <nav className="hidden items-center gap-4 md:flex ">
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/studio">Studio</Link>
              </li>
              <li>
                <Link href="/popular" className="flex items-center">
                  Popular
                  <span>
                    <IconSparkles stroke={1} />
                  </span>
                </Link>
              </li>
            </ul>
            <ModeToggle />
            <span>|</span>
            <div className="flex items-center gap-2">
              {!user && (
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "default",
                  })}
                >
                  <span>
                    <IconLogin2 />
                  </span>
                  Sign in
                </Link>
              )}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="border-none outline-none"
                    asChild
                  >
                    <Button className="cursor-pointer" variant="secondary">
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="mt-2 w-40 rounded-lg border-none bg-background p-0 "
                  >
                    <DropdownMenuItem
                      className="cursor-pointer rounded-none rounded-t-lg border-b px-5 py-3"
                      asChild
                    >
                      <Link href="/account">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-none border-b px-5 py-3"
                      asChild
                    >
                      <Link href="/account/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer rounded-none rounded-b-lg px-5 py-3 text-[#FF453A] hover:text-[#FF453A]"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {user && !studio && (
                <Link
                  href="/register-studio"
                  className={buttonVariants({
                    variant: "default",
                  })}
                >
                  <span>
                    <IconCornerDownRight />
                  </span>
                  Register Studio
                </Link>
              )}
              {studio && (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "default",
                  })}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </nav>
          <div className="block md:hidden">
            <MobileNavToggle />
          </div>
        </div>
      </motion.header>
      <MobileNav />
    </>
  );
}
