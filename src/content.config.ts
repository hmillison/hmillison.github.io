import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {z} from 'astro/zod';

const notes = defineCollection({
  loader: glob({pattern: '**/*.{md,mdx}', base: './src/content/notes'}),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {notes};
