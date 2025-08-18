import * as z from "zod";

export const StudioSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
  banner: z.string().nullish(),
  email: z.string(),
  phoneNumber: z.string(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const StudioExtendedSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
  banner: z.string().nullish(),
  email: z.string(),
  phoneNumber: z.string(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categories: z
    .object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    })
    .array(),
  userId: z.string(),
});

export const CreateStudioSchema = z.object({
  name: z.string().min(2, { message: "Name must have atleast 2 characters" }),
  description: z.string().nullish(),
  email: z.string().email({ message: "Enter a valid email" }),
  phoneNumber: z.string().min(3, { message: "Enter a valid phone number" }),
  username: z
    .string()
    .min(3, { message: "Name must have atleast 2 characters" }),
  userId: z.string(),
});

export const UpdateStudioSchema = z.object({
  name: z.string().min(2, { message: "Name must have atleast 2 characters" }),
  description: z.string().nullish(),
  email: z.string().email({ message: "Enter a valid email" }),
  phoneNumber: z.string().min(3, { message: "Enter a valid phone number" }),
  username: z
    .string()
    .min(3, { message: "Name must have atleast 2 characters" }),
  image: z.string().nullish(),
  banner: z.string().nullish(),
});

export function makeDeletestudioSchema(username: string) {
  return z.object({
    username: z.literal(username, {
      errorMap: () => ({ message: "The studio username does not match" }),
    }),
    confirm: z.literal("delete my studio", {
      errorMap: () => ({ message: "The verification text does not match" }),
    }),
    // username: z.string().refine((val) => val === username, {
    //   message: "The studio username does not match",
    // }),
    // confirm: z.string().refine((val) => val === "delete my studio", {
    //   message: "The verification text does not match",
    // }),
  });
}
