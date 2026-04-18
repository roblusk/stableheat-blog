import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    deck: z.string(),
    category: z.string(),
    date: z.date(),
    readTime: z.string(),
    thumbVariant: z.number().int().min(1).max(10),
    // Font Awesome Free icon name without the `fa-` prefix (e.g. "building", "caravan", "snowflake").
    thumbIcon: z.string(),
    excerpt: z.string(),
    featured: z.boolean().optional(),
    // Application slugs from src/data/applications.ts (e.g. ["home", "floor"]).
    applications: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
