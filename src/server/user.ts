"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

export const getStudioId = async () => {
  const user = await getUser();

  if (!user) return null;
  const studio = await prisma.studio.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  return studio;
};

export type User = typeof auth.$Infer.Session.user;
