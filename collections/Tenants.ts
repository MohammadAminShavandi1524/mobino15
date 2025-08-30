import { isSuperAdmin, isUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",

  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    hidden: ({ user }) => isUser(user),
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
