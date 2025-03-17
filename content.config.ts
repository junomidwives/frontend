import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        date: z.string(),
        heroText: z.string(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
      }),
    }),
  },
});
