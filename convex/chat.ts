import { action, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";

export const getChatHistory = query({
  args: { languageSlug: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    let query = ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    const messages = await query.collect();
    
    if (args.languageSlug) {
      return messages.filter(msg => msg.languageSlug === args.languageSlug);
    }
    
    return messages;
  },
});

export const sendMessage = action({
  args: { 
    message: v.string(),
    languageSlug: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated");
    }

    // Get language context if provided
    let languageContext = "";
    if (args.languageSlug) {
      const language = await ctx.runQuery(api.languages.getLanguageBySlug, { 
        slug: args.languageSlug 
      });
      if (language) {
        languageContext = `The user is asking about ${language.name}. ${language.description}`;
      }
    }

    // Create system prompt for programming learning assistant
    const systemPrompt = `You are CodeKickstart AI, a friendly and helpful programming learning assistant. Your role is to:

1. Help beginners learn programming languages
2. Explain concepts in simple, easy-to-understand terms
3. Provide practical examples and code snippets
4. Suggest learning resources and next steps
5. Encourage and motivate learners
6. Answer questions about programming concepts, syntax, and best practices

${languageContext ? `Context: ${languageContext}` : ""}

Keep your responses concise, encouraging, and beginner-friendly. Use emojis occasionally to make the conversation more engaging. If asked about topics outside of programming, politely redirect the conversation back to learning programming.`;

    try {
      // Use the bundled OpenAI API
      const response = await fetch(`${process.env.CONVEX_OPENAI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CONVEX_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-nano",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: args.message }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

      // Save the conversation to the database
      await ctx.runMutation(internal.chat.saveMessage, {
        userId,
        message: args.message,
        response: aiResponse,
        languageSlug: args.languageSlug,
      });

      return aiResponse;
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return "I'm having trouble connecting right now. Please try again in a moment! 🤖";
    }
  },
});

export const saveMessage = internalMutation({
  args: {
    userId: v.id("users"),
    message: v.string(),
    response: v.string(),
    languageSlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chatMessages", {
      userId: args.userId,
      message: args.message,
      response: args.response,
      languageSlug: args.languageSlug,
    });
  },
});
