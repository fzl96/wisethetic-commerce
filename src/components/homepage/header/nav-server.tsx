import { getUser } from "@/server/user";
import { prisma } from "@/lib/prisma";
import { Navbar } from "./navbar";

async function getStudio(userId: string | undefined) {
  if (!userId) return null;
  return await prisma.studio.findFirst({
    where: {
      userId: userId,
    },
  });
}

export async function NavServer() {
  const user = await getUser();
  const studio = await getStudio(user?.id);

  return <Navbar user={user} studio={studio} />;
}
