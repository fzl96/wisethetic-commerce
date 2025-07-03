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
      message: "Invalid data. Could not create category",
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

// export async function updateLocation(
//   id: string,
//   values: z.infer<typeof updateLocationSchema>,
// ) {
//   const validatedFields = updateLocationSchema.safeParse(values);
//
//   console.log(validatedFields.data);
//
//   if (!validatedFields.success) {
//     console.log("test");
//     return {
//       success: false,
//       message: "Invalid data. Could not update category.",
//     };
//   }
//
//   const { name, address, link } = validatedFields.data;
//
//   try {
//     await prisma.location.update({
//       where: { id },
//       data: { name, address, link },
//     });
//   } catch (error) {
//     if (
//       error instanceof Error &&
//       error.message.includes("Unique constraint failed")
//     ) {
//       return {
//         success: false,
//         message: "This location name already exists.",
//       };
//     }
//
//     return {
//       success: false,
//       message: "Database Error: Failed to update location.",
//     };
//   }
//
//   revalidatePath("/dashboard/location");
//
//   return {
//     success: true,
//     message: "Location updated successfully.",
//   };
// }
//
// export async function deleteLocation(id: string) {
//   try {
//     await prisma.location.delete({
//       where: { id },
//     });
//     // On success, revalidate the path to update the UI
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         success: false,
//         message: "Database Error: Failed to delete location.",
//       };
//     }
//     // If the database operation fails, return a structured error object.
//     return {
//       success: false,
//       message: "Database Error: Failed to delete location.",
//     };
//   }
//
//   revalidatePath("/dashboard/location");
//   return {
//     success: true,
//     message: "Location deleted successfully.",
//   };
// }
