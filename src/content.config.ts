import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
});

const logic = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logic' }),
  schema: baseSchema,
});

const epoch = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/epoch' }),
  schema: baseSchema,
});

const stills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stills' }),
  schema: baseSchema.extend({
    image: z.string().optional(),
  }),
});

const echoes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/echoes' }),
  schema: baseSchema.extend({
    excerpt: z.string().optional(),
  }),
});

const vault = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vault' }),
  schema: baseSchema.extend({
    affiliateLink: z.string().optional(),
    category: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string()
  })
});

export const collections = {
  logic,
  epoch,
  stills,
  echoes,
  vault,
  pages,
};