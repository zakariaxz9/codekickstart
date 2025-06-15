import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserBookmarks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("userBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const toggleBookmark = mutation({
  args: { languageSlug: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated");
    }

    const existing = await ctx.db
      .query("userBookmarks")
      .withIndex("by_user_and_language", (q) => 
        q.eq("userId", userId).eq("languageSlug", args.languageSlug)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false; // Removed bookmark
    } else {
      await ctx.db.insert("userBookmarks", {
        userId,
        languageSlug: args.languageSlug,
      });
      return true; // Added bookmark
    }
  },
});

export const isBookmarked = query({
  args: { languageSlug: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }

    const bookmark = await ctx.db
      .query("userBookmarks")
      .withIndex("by_user_and_language", (q) => 
        q.eq("userId", userId).eq("languageSlug", args.languageSlug)
      )
      .unique();

    return !!bookmark;
  },
});
