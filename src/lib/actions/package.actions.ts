"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createPackageSchema } from "@/lib/schema/package";
import * as z from "zod";

export async function createPackage(
  studioId: string,
  values: z.infer<typeof createPackageSchema>,
) {
  const validateFields = createPackageSchema.safeParse(values);

  if (!validateFields.success || !studioId) {
    return {
      success: false,
      message: "Invalid data. Could not create package",
    };
  }

  try {
    await prisma.package.create({
      data: {
        name: validateFields.data.name,
        description: validateFields.data.description,
        price: validateFields.data.price,
        studioId: validateFields.data.studioId,
        image: validateFields.data.image,
        categoryId: validateFields.data.categoryId,
        locations: {
          connect: validateFields.data.locationsId.map((id: string) => ({
            id,
          })),
        },
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
        message: "This package name already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to create package.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard/package");

  // 4. Return a success state
  return {
    success: true,
    message: `Added package: ${validateFields.data.name}`,
  };
}

export async function updatePackage(
  studioId: string,
  packageId: string,
  values: z.infer<typeof createPackageSchema>,
) {
  const validateFields = createPackageSchema.safeParse(values);

  if (!validateFields.success || !studioId) {
    return {
      success: false,
      message: "Invalid data. Could not create package",
    };
  }

  try {
    await prisma.package.update({
      data: {
        name: validateFields.data.name,
        description: validateFields.data.description,
        price: validateFields.data.price,
        studioId: validateFields.data.studioId,
        image: validateFields.data.image,
        categoryId: validateFields.data.categoryId,
        locations: {
          connect: validateFields.data.locationsId.map((id: string) => ({
            id,
          })),
        },
      },
      where: {
        id: packageId,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constrant failed")
    ) {
      return {
        success: false,
        message: "This package name already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to create package.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard/package");

  // 4. Return a success state
  return {
    success: true,
    message: `Added package: ${validateFields.data.name}`,
  };
}

export async function deletePackage(id: string) {
  try {
    await prisma.package.delete({
      where: { id },
    });
    // On success, revalidate the path to update the UI
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Database Error: Failed to delete package.",
      };
    }
    // If the database operation fails, return a structured error object.
    return {
      success: false,
      message: "Database Error: Failed to delete package.",
    };
  }

  revalidatePath("/dashboard/package");
  return {
    success: true,
    message: "Package deleted successfully.",
  };
}
