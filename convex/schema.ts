import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  languages: defineTable({
    name: v.string(),
    icon: v.string(),
    description: v.string(),
    purpose: v.string(),
    concepts: v.array(v.object({
      title: v.string(),
      description: v.string(),
      example: v.string(),
    })),
    resources: v.object({
      websites: v.array(v.object({
        name: v.string(),
        url: v.string(),
        description: v.string(),
      })),
      videos: v.array(v.object({
        name: v.string(),
        url: v.string(),
        description: v.string(),
      })),
      books: v.array(v.object({
        name: v.string(),
        author: v.string(),
        description: v.string(),
      })),
    }),
    slug: v.string(),
  }).index("by_slug", ["slug"]),
  
  chatMessages: defineTable({
    userId: v.id("users"),
    message: v.string(),
    response: v.string(),
    languageSlug: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  
  userBookmarks: defineTable({
    userId: v.id("users"),
    languageSlug: v.string(),
  }).index("by_user", ["userId"])
    .index("by_user_and_language", ["userId", "languageSlug"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
