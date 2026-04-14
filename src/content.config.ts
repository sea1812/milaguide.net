import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // 1. 引入加载器

const products = defineCollection({
  // 2. 指定去哪里找文件，匹配什么后缀
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    price: z.string(),
    verdict: z.string(),
    affiliate_link: z.string(),
  }),
});

export const collections = {
  'products': products,
};
