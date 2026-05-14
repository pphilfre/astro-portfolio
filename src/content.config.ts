import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const ctfCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/ctf' }),
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
