import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",

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
