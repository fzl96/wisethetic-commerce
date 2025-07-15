import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string(),
  email: z.string().email({ message: "Enter a valid email" }),
  phoneNumber: z.string().min(3, { message: "Enter a valid phone number" }),
  userId: z.string(),
  packageId: z.string(),
  locationId: z.string(),
  studioId: z.string(),
});
