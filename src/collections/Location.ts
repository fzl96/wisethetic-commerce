import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
  slug: "locations",
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
  ],
};

