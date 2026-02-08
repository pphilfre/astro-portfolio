import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const ctfCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    platform: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  ctf: ctfCollection,
};
