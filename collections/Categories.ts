import { isSuperAdmin, isUser } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: ({ req }) => !isUser(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    hidden:({user})=>isUser(user) ,
  },

  fields: [
    { name: "name", type: "text", required: true, index: true },
    // اسمی که نمایش داده میشه
    {
      name: "label",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      unique: true,

      admin: {
        description: "اعداد کوچکتر در بالای لیست نمایش داده می‌شوند.",
      },
    },
    {
      name: "logo",
      type: "text",
    },
    {
      name: "logoColor",
      type: "text",
      required: false,
      admin: {
        description: "only rgba",
      },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
    },
  ],
};
