import * as z from "zod";

export const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  link: z.string().nullish(),
  studioId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createLocationSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be atleast 3 characters" }),
  link: z.string().nullish(),
});

export const updateLocationSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be atleast 3 characters" }),
  link: z.string().nullish(),
});
