import { getUser } from "@/server/user";
import { NavUserClient } from "./nav-user-client";

export async function NavUser() {
  const user = await getUser();

  if (!user) {
    return <div>-</div>;
  }

  const userFormatted = {
    email: user.email,
    name: user.name,
    avatar: user.image ?? "",
  };
  console.log(userFormatted);

  return <NavUserClient user={userFormatted} />;
}
