import type { User } from "@/server/user";
import { NavUserClient } from "./nav-user-client";

export async function NavUser({ user }: { user: User }) {
  const userFormatted = {
    email: user.email,
    name: user.name,
    avatar: user.image ?? "",
  };

  return <NavUserClient user={userFormatted} />;
}
