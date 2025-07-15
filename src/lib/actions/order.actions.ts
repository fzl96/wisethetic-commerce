"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/schema/order";
import * as z from "zod";

export async function createOrder(
  date: Date,
  values: z.infer<typeof createOrderSchema>,
) {
  const validateFields = createOrderSchema.safeParse(values);

  if (!validateFields.success || !date) {
    return {
      success: false,
      message: "Invalid data. Could not create order",
    };
  }

  const pkgQuery = prisma.package.findUnique({
    where: {
      id: validateFields.data.packageId,
    },
  });

  const locationQuery = prisma.location.findUnique({
    where: {
      id: validateFields.data.locationId,
    },
  });

  const [pkg, location] = await prisma.$transaction([pkgQuery, locationQuery]);

  if (!pkg || !location) {
    return {
      success: false,
      message: "Invalid data. Could not create order",
    };
  }

  try {
    await prisma.order.create({
      data: {
        date,
        userId: validateFields.data.userId,
        customerName: validateFields.data.customerName,
        email: validateFields.data.email,
        phoneNumber: validateFields.data.phoneNumber,
        packageId: validateFields.data.packageId,
        packageName: pkg.name,
        packagePrice: pkg.price,
        packageDescription: pkg.description,
        packageImage: pkg.image,
        locationId: location.id,
        locationName: location.name,
        locationAddress: location.address,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Database error: Failed to create category.",
    };
  }

  revalidatePath("/");
  return {
    success: true,
    message: "Booked!",
  };
}
