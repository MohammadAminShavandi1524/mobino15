import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },

  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "store Name",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      index: true,
    },
  ],
};
