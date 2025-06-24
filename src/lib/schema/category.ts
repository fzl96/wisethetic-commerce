import * as z from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  description: z.string().nullish(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  description: z.string().nullish(),
});
