import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be lest than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens.",
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens.",
    )
    .transform((value) => value.toLocaleLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

