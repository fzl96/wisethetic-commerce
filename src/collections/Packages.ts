import type { CollectionConfig } from "payload";

export const Packages: CollectionConfig = {
  slug: "packages",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: false,
    },
    {
      name: "price",
      required: true,
      type: "number"
    },
    {
      name: "category",
      required: true,
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    },
  ],
};

