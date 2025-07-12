"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  createLocationSchema,
  updateLocationSchema,
} from "@/lib/schema/location";
import * as z from "zod";

export async function createLocation(
  studioId: string,
  values: z.infer<typeof createLocationSchema>,
) {
  const validateFields = createLocationSchema.safeParse(values);

  if (!validateFields.success || !studioId) {
    return {
      success: false,
      message: "Invalid data. Could not create category",
    };
  }

  const { name, address, link } = validateFields.data;

  try {
    await prisma.location.create({
      data: {
        name,
        address,
        link,
        studioId,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constrant failed")
    ) {
      return {
        success: false,
        message: "This location name already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to location category.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard/locations");

  // 4. Return a success state
  return {
    success: true,
    message: `Added location: ${name}`,
  };
}

export async function updateLocation(
  id: string,
  values: z.infer<typeof updateLocationSchema>,
) {
  const validatedFields = updateLocationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid data. Could not update category.",
    };
  }

  const { name, address, link } = validatedFields.data;

  try {
    await prisma.location.update({
      where: { id },
      data: { name, address, link },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return {
        success: false,
        message: "This location name already exists.",
      };
    }

    return {
      success: false,
      message: "Database Error: Failed to update location.",
    };
  }

  revalidatePath("/dashboard/location");

  return {
    success: true,
    message: "Location updated successfully.",
  };
}

export async function deleteLocation(id: string) {
  try {
    await prisma.location.delete({
      where: { id },
    });
    // On success, revalidate the path to update the UI
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Database Error: Failed to delete location.",
      };
    }
    // If the database operation fails, return a structured error object.
    return {
      success: false,
      message: "Database Error: Failed to delete location.",
    };
  }

  revalidatePath("/dashboard/location");
  return {
    success: true,
    message: "Location deleted successfully.",
  };
}
