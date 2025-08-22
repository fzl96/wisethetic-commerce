"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/server/user";

export async function updatePhone({ phone }: { phone: string }) {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      message: "Not allowed",
    };
  }
  try {
    await prisma.user.update({
      data: {
        phone,
      },
      where: {
        id: user.id,
      },
    });
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something wrong happened",
    };
  }

  return {
    success: true,
    message: "Phone number updated!",
  };
}

export async function deleteUser(
  id: string,
  values: {
    email: string;
    confirm: string;
  },
) {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  if (
    user.id !== id ||
    user.email !== values.email ||
    values.confirm !== "delete my account"
  ) {
    return {
      success: false,
      message: "Not allowed",
    };
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  return {
    success: true,
    message: "User deleted",
  };
}
