"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
  // UpdateCategorySchema,
} from "@/lib/schema/category";
import * as z from "zod";

export async function createCategory(
  studioId: string,
  values: z.infer<typeof CreateCategorySchema>,
) {
  const validateFields = CreateCategorySchema.safeParse(values);

  if (!validateFields.success || !studioId) {
    return {
      success: false,
      message: "Invalid data. Could not create category",
    };
  }

  const { name, description } = validateFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
        description,
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
        message: "This category name already exists.",
      };
    }

    return {
      success: false,
      message: "Database error: Failed to create category.",
    };
  }
  // 3. Revalidate the cache for the categories page
  revalidatePath("/dashboard/categories");

  // 4. Return a success state
  return {
    success: true,
    message: `Added category: ${name}`,
  };
}

export async function updateCategory(
  id: string,
  values: z.infer<typeof UpdateCategorySchema>,
) {
  const validatedFields = UpdateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid data. Could not update category.",
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await prisma.category.update({
      where: { id },
      data: { name, description },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return {
        success: false,
        message: "This category name already exists.",
      };
    }

    return {
      success: false,
      message: "Database Error: Failed to update category.",
    };
  }

  revalidatePath("/dashboard/categories");

  return {
    success: true,
    message: "Category updated successfully.",
  };
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    // On success, revalidate the path to update the UI
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Database Error: Failed to delete category.",
      };
    }
    // If the database operation fails, return a structured error object.
    return {
      success: false,
      message: "Database Error: Failed to delete category.",
    };
  }

  revalidatePath("/dashboard/categories");
  return {
    success: true,
    message: "Category deleted successfully.",
  };
}
