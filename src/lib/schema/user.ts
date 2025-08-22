import { z } from "zod";

export type User = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phone?: string | null | undefined;
  image?: string | null | undefined;
};

export function makeDeleteUserSchema(email: string) {
  return z.object({
    email: z.literal(email, {
      errorMap: () => ({ message: "The email does not match" }),
    }),
    confirm: z.literal("delete my account", {
      errorMap: () => ({ message: "The verification text does not match" }),
    }),
  });
}
