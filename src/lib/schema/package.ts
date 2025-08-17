import * as z from "zod";

export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  studioId: z.string(),
  image: z.string().nullish(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  locations: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
  _count: z.object({
    orders: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const popularPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  studioId: z.string(),
  image: z.string().nullish(),
  studio: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  locations: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
  _count: z.object({
    orders: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const packageStoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  studioId: z.string(),
  image: z.string().nullish(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  locations: z
    .object({
      id: z.string(),
      name: z.string(),
      address: z.string(),
      link: z.string().nullish(),
    })
    .array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const createPackageSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  description: z.string().nullish(),
  price: z.coerce.number(),
  image: z.string().nullish(),
  studioId: z.string(),
  categoryId: z.string(),
  locationsId: z.string().array(),
});

export const updatePackageSchema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  description: z.string().nullish(),
  price: z.number(),
  image: z.string().nullish(),
  studioId: z.string(),
  categoryId: z.string(),
  locationsId: z.string().array(),
});
