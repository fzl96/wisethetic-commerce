"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CreateStudioSchema, UpdateStudioSchema } from "@/lib/schema/studio";
import { getUser } from "@/server/user";
import * as z from "zod";

export async function createStudio(values: z.infer<typeof CreateStudioSchema>) {
  const validateFields = CreateStudioSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid data. Could not create studio",
    };
  }

  try {
    await prisma.studio.create({
      data: {
        ...validateFields.data,
      },
    });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message.includes("Unique constrant failed")
    ) {
      return {
        success: false,
        message: "This studio name or username already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to create studio.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard");

  // 4. Return a success state
  return {
    success: true,
    message: `Successfully register: ${validateFields.data.name}`,
  };
}

export async function updateStudio(
  studioId: string,
  values: z.infer<typeof UpdateStudioSchema>,
) {
  const validateFields = UpdateStudioSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid data. Could not update studio",
    };
  }

  try {
    await prisma.studio.update({
      data: {
        ...validateFields.data,
      },
      where: {
        id: studioId,
      },
    });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message.includes("Unique constrant failed")
    ) {
      return {
        success: false,
        message: "This studio name or username already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to update studio.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard/studio");

  // 4. Return a success state
  return {
    success: true,
    message: `Successfully updated: ${validateFields.data.name}`,
  };
}

export async function deleteStudio(
  id: string,
  values: {
    username: string;
    confirm: string;
  },
) {
  const user = await getUser();
  const studio = await prisma.studio.findUnique({
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
    where: {
      id,
    },
  });
  if (
    studio?.user.id !== user?.id ||
    studio?.username !== values.username ||
    values.confirm !== "delete my studio"
  ) {
    return {
      success: false,
      message: "Not allowed",
    };
  }

  await prisma.studio.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  return {
    success: true,
    message: "Studio deleted",
  };
}
