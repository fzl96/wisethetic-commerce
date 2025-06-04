import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    // Email added by default
    {
      name: "name",
      required: true,
      unique: true,
      type: "text",
      label: "Studio Name",
      admin: {
        description: "This is the name of the studio (e.g. Wisthethic Studio)"
      }
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "This is the subdomain for the studio (e.g. [slug].wisetheticlab.store)"
      }
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    },
  ],
}