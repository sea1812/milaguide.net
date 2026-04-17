import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date(),
    type: z.enum(['product', 'article']),
    iherbLink: z.string().optional(),
    link: z.string().optional(),
    featured: z.boolean().optional()
  })
});

export const collections = { knowledge };