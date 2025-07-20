import { z } from "zod";

export type Order = {
  id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  date: Date;
  result?: string | null;
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "CANCEL" | "REFUNDED";
  paymentStatus: "PENDING" | "SUCCESS";
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
  studioId?: string | null;
  packageId?: string | null;
  locationId?: string | null;
  studioName?: string | null;
  packageName?: string | null;
  packageDescription: string | null;
  packagePrice: number;
  packageImage?: string | null;
  locationName: string;
  locationAddress: string;
};

export const createOrderSchema = z.object({
  customerName: z.string(),
  email: z.string().email({ message: "Enter a valid email" }),
  phoneNumber: z.string().min(3, { message: "Enter a valid phone number" }),
  userId: z.string(),
  packageId: z.string(),
  locationId: z.string(),
  studioId: z.string(),
});
