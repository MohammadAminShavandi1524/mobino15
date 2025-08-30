import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import { isSuperAdmin, isUser } from "@/lib/access";

const defaultTenantsArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
});

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      if (isSuperAdmin(req.user)) return true;

      return req.user?.id === id;
    },
  },
  admin: {
    hidden: ({ user }) => !isSuperAdmin(user),
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
    {
      name: "sellername",
      required: false,
      unique: true,
      type: "text",
    },

    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: "user",
      hasMany: true,
      options: ["user", "seller", "superAdmin"],
      access:{
        update:({req})=>isSuperAdmin(req.user)
      }
    },
    {
      ...defaultTenantsArrayField,
      admin: {
        ...(defaultTenantsArrayField?.admin || {}),
        position: "sidebar",
      },
    },
  ],
};
