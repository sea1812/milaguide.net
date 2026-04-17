# MilaWeb 智者领地转型实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 MilaWeb 从技术文档站转型为「有温度的智者领地」，完成内容分类结构重建、i18n 精简、视觉风格重塑。

**Architecture:**
- 内容按 logic/epoch/stills/echoes/vault 五分类组织
- 前端路由统一为 `/${lang}/${category}/${slug}` 格式
- 只保留 zh-hans 和 en 两种语言
- 视觉采用大地色系（象牙白背景 + 深青岩文字）

**Tech Stack:** Astro 5.x, Content Collections, CSS Variables

---

## 文件结构

```
src/
├── content/
│   ├── config.ts              # 更新：统一 schema，新增分类
│   ├── logic/                 # 技术文章（现有 knowledge 迁移）
│   ├── epoch/                 # 空目录
│   ├── stills/                # 空目录
│   ├── echoes/                # 空目录
│   ├── vault/                 # 工具推荐（空目录）
│   └── (删除 knowledge/ 目录)
├── layouts/
│   └── Layout.astro           # 修改：视觉样式、导航、版权
├── pages/
│   └── [lang]/
│       ├── index.astro        # 修改：移除 KB 残留链接
│       ├── logic/[slug].astro # 新建：通用详情页
│       ├── epoch/[slug].astro # 新建：通用详情页
│       ├── stills/[slug].astro # 新建：通用详情页
│       ├── echoes/[slug].astro # 新建：通用详情页
│       ├── vault/index.astro  # 新建：工具推荐页
│       ├── (删除 kb/[slug].astro)
│       └── (删除 tags/[tag].astro 或保留)
├── styles/
│   └── global.css             # 修改：配色、字体
└── content/knowledge/         # 删除：迁移内容后删除

需删除的内容：
- src/content/knowledge/
- src/content/articles/
- src/content/products/
- src/pages/[lang]/kb/
- src/pages/[lang]/p/
- src/pages/[lang]/a/
```

---

## Task 1: 更新 CSS 配色和字体

**Files:**
- Modify: `src/styles/global.css:1-10`

- [ ] **Step 1: 更新 CSS 变量**

```css
:root {
  --color-bg: #FDFCF8;
  --color-text: #2C3E50;
  --color-accent: #8B7355;
  --color-muted: #7F8C8D;
  --color-border: #E8E4DE;
  --font-family: 'Noto Sans', 'Noto Sans SC', sans-serif;
  --font-family-serif: Georgia, 'Noto Serif SC', serif;
}
```

- [ ] **Step 2: 添加标题 serif 字体样式**

在 `h1, h2, h3` 样式块后添加：
```css
h1, h2, h3 {
  font-family: var(--font-family-serif);
  font-weight: 600;
}
```

- [ ] **Step 3: 更新 .site-title 样式**

在 `header .site-title` 样式块（约 line 88-97）添加：
```css
header .site-title {
  font-family: var(--font-family-serif);
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
}
```

- [ ] **Step 4: 提交**

```bash
git add src/styles/global.css
git commit -m "style: update color palette to warm earth tones"
```

---

## Task 2: 更新 Layout.astro 视觉和导航

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: 更新 languages 和 langNames（只保留中英）**

将 line 13-20 的 languages 数组和 langNames 对象替换为：
```javascript
const languages = ['zh-hans', 'en'];
const langNames: Record<string, string> = {
  'zh-hans': '简体中文',
  en: 'English'
};
```

- [ ] **Step 2: 移除 pathWithoutLang 的 ja/ko/zh-hant 匹配**

将 line 24 替换为：
```javascript
const pathWithoutLang = isTagPage ? '' : currentPath.replace(/^\/(zh-hans|en)/, '');
```

- [ ] **Step 3: 添加分类导航相关常量**

在 `tagLabels` 定义前添加：
```javascript
const categoryLabels: Record<string, Record<string, string>> = {
  'zh-hans': { logic: 'Logic', epoch: 'Epoch', stills: 'Stills', echoes: 'Echoes', vault: 'Vault' },
  en: { logic: 'Logic', epoch: 'Epoch', stills: 'Stills', echoes: 'Echoes', vault: 'Vault' }
};
```

- [ ] **Step 4: 替换侧边栏标签导航为分类导航**

将 line 88-105 的 sidebar 部分替换为：
```astro
<aside class="sidebar">
  <h3>{categoryLabels[lang].logic}</h3>
  <div class="sidebar-tags">
    <a href={`/${lang}/logic`} class={`sidebar-tag ${currentPath.includes('/logic') ? 'active' : ''}`}>
      {categoryLabels[lang].logic}
    </a>
    <a href={`/${lang}/epoch`} class={`sidebar-tag ${currentPath.includes('/epoch') ? 'active' : ''}`}>
      {categoryLabels[lang].epoch}
    </a>
    <a href={`/${lang}/stills`} class={`sidebar-tag ${currentPath.includes('/stills') ? 'active' : ''}`}>
      {categoryLabels[lang].stills}
    </a>
    <a href={`/${lang}/echoes`} class={`sidebar-tag ${currentPath.includes('/echoes') ? 'active' : ''}`}>
      {categoryLabels[lang].echoes}
    </a>
    <a href={`/${lang}/vault`} class={`sidebar-tag ${currentPath.includes('/vault') ? 'active' : ''}`}>
      {categoryLabels[lang].vault}
    </a>
  </div>
</aside>
```

- [ ] **Step 5: 更新版权声明**

将 footer 中的 `&copy; 2026 MilaGuide` 替换为：
```astro
<p>Written with heart and logic by Mila. No AI was used for primary creation.</p>
```

- [ ] **Step 6: 提交**

```bash
git add src/layouts/Layout.astro
git commit -m "refactor: update layout for sage persona - categories nav, simplified i18n"
```

---

## Task 3: 创建统一详情页模板

**Files:**
- Create: `src/pages/[lang]/[category]/[slug].astro`

- [ ] **Step 1: 创建通用详情页模板**

```astro
---
import Layout from '../../../layouts/Layout.astro';
import { getCollection, render } from 'astro:content';
import { getRelatedItems } from '../../../utils/tagSimilarity';

export async function getStaticPaths() {
  const languages = ['zh-hans', 'en'];
  const categories = ['logic', 'epoch', 'stills', 'echoes'];
  const paths = [];

  for (const lang of languages) {
    for (const category of categories) {
      const items = await getCollection(category, ({ id }) => id.startsWith(`${lang}/`));
      for (const item of items) {
        const slug = item.id.replace(`${lang}/`, '').replace(/\.md$/, '');
        paths.push({
          params: { lang, category, slug },
          props: { item, category }
        });
      }
    }
  }

  return paths;
}

const { lang, category, slug } = Astro.params;
const { item } = Astro.props;

const { Content } = await render(item);

const allItems = await getCollection(category, ({ id }) => id.startsWith(`${lang}/`));
const relatedItems = getRelatedItems(item, allItems, 10);

const backLabels: Record<string, string> = {
  'zh-hans': '← 返回',
  en: '← Back'
};

const relatedLabels: Record<string, { title: string }> = {
  'zh-hans': { title: '相关' },
  en: { title: 'Related' }
};

const featuredLabels: Record<string, string> = {
  'zh-hans': '精选',
  en: 'Featured'
};

function getItemUrl(item: any, lang: string, cat: string) {
  return `/${lang}/${cat}/${item.id.replace(`${lang}/`, '').replace(/\.md$/, '')}`;
}
---

<Layout title={item.data.title} lang={lang}>
  <a href="#" onclick="window.history.back(); return false;" class="back-link">{backLabels[lang]}</a>

  <article>
    <h1>
      {item.data.title}
      {item.data.featured && <span class="featured-badge">{featuredLabels[lang]}</span>}
    </h1>
    <div class="meta">
      <time>{item.data.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
    </div>
    {item.data.tags && item.data.tags.length > 0 && (
      <div class="tags">
        {item.data.tags.map(tag => (
          <a href={`/${lang}/tags/${tag}`} class="tag">{tag}</a>
        ))}
      </div>
    )}
    <div class="content-body">
      <Content />
    </div>
  </article>

  {relatedItems.length > 0 && (
    <section class="related-section">
      <h2>{relatedLabels[lang].title}</h2>
      <div class="related-list">
        {relatedItems.map(ri => (
          <a href={getItemUrl(ri, lang, category)} class="related-item">
            <span class="related-title">{ri.data.title}</span>
          </a>
        ))}
      </div>
    </section>
  )}
</Layout>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/\[lang\]/\[category\]/\[slug\].astro
git commit -m "feat: add unified detail page template for all categories"
```

---

## Task 4: 更新 src/content.config.ts

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: 读取现有配置**

```bash
cat src/content.config.ts
```

- [ ] **Step 2: 替换为新的内容集合配置**

```typescript
import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.date(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
});

const logic = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const epoch = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const stills = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    image: z.string().optional(),
  }),
});

const echoes = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    excerpt: z.string().optional(),
  }),
});

const vault = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    affiliateLink: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const collections = {
  logic,
  epoch,
  stills,
  echoes,
  vault,
};
```

- [ ] **Step 3: 提交**

```bash
git add src/content.config.ts
git commit -m "refactor: split knowledge into logic/epoch/stills/echoes/vault collections"
```

---

## Task 5: 创建 Vault 页面

**Files:**
- Create: `src/pages/[lang]/vault/index.astro`

- [ ] **Step 1: 创建 Vault 页面**

```astro
---
import Layout from '../../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [
    { params: { lang: 'zh-hans' } },
    { params: { lang: 'en' } }
  ];
}

const { lang } = Astro.params;

const vaultItems = await getCollection('vault', ({ id }) => id.startsWith(`${lang}/`));

const vaultLabels: Record<string, { title: string; subtitle: string }> = {
  'zh-hans': {
    title: 'The Vault',
    subtitle: 'Mila 的避坑工具箱 - 30年沉淀的精选工具'
  },
  en: {
    title: 'The Vault',
    subtitle: "Mila's curated toolkit - 30 years of refined tools"
  }
};
---

<Layout title={vaultLabels[lang].title} lang={lang}>
  <h1>{vaultLabels[lang].title}</h1>
  <p class="subtitle">{vaultLabels[lang].subtitle}</p>

  <div class="card-list">
    {vaultItems.map(item => (
      <article class="card">
        <h2>{item.data.title}</h2>
        <p>{item.data.description}</p>
        {item.data.affiliateLink && (
          <a href={item.data.affiliateLink} target="_blank" rel="noopener noreferrer" class="affiliate-link">
            View Tool →
          </a>
        )}
      </article>
    ))}
  </div>
</Layout>

<style>
  .subtitle {
    color: var(--color-muted);
    margin-bottom: 2rem;
  }
  .affiliate-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--color-accent);
    color: white;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  .affiliate-link:hover {
    text-decoration: none;
    opacity: 0.9;
  }
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/\[lang\]/vault/index.astro
git commit -m "feat: add Vault page for affiliate tools"
```

---

## Task 6: 创建各分类列表页

**Files:**
- Create: `src/pages/[lang]/logic/index.astro`
- Create: `src/pages/[lang]/epoch/index.astro`
- Create: `src/pages/[lang]/stills/index.astro`
- Create: `src/pages/[lang]/echoes/index.astro`

- [ ] **Step 1: 创建逻辑列表页（复用首页结构）**

```astro
---
import Layout from '../../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [
    { params: { lang: 'zh-hans' } },
    { params: { lang: 'en' } }
  ];
}

const { lang } = Astro.params;

const items = await getCollection('logic', ({ id }) => id.startsWith(`${lang}/`));
const sortedItems = items.sort((a, b) => {
  if (a.data.featured && !b.data.featured) return -1;
  if (!a.data.featured && b.data.featured) return 1;
  return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
});

const labels: Record<string, { title: string }> = {
  'zh-hans': { title: 'Logic' },
  en: { title: 'Logic' }
};

const featuredLabels: Record<string, string> = {
  'zh-hans': '精选',
  en: 'Featured'
};
---

<Layout title={labels[lang].title} lang={lang}>
  <h1>{labels[lang].title}</h1>

  <div class="card-list">
    {sortedItems.map(item => (
      <article class="card">
        <h2>
          <a href={`/${lang}/logic/${item.id.replace(`${lang}/`, '').replace(/\.md$/, '')}`}>{item.data.title}</a>
          {item.data.featured && <span class="featured-badge">{featuredLabels[lang]}</span>}
        </h2>
        <div class="meta">
          <time>{item.data.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        {item.data.description && <p>{item.data.description}</p>}
        {item.data.tags && item.data.tags.length > 0 && (
          <div class="tags">
            {item.data.tags.map(tag => (
              <a href={`/${lang}/tags/${tag}`} class="tag">{tag}</a>
            ))}
          </div>
        )}
      </article>
    ))}
  </div>
</Layout>
```

- [ ] **Step 2: 创建 epoch/stills/echoes 列表页**

分别为 `epoch`, `stills`, `echoes` 创建相同的结构，只需替换 collection 名称和标题。

- [ ] **Step 3: 提交**

```bash
git add src/pages/\[lang\]/logic/index.astro src/pages/\[lang\]/epoch/index.astro src/pages/\[lang\]/stills/index.astro src/pages/\[lang\]/echoes/index.astro
git commit -m "feat: add category list pages for logic/epoch/stills/echoes"
```

---

## Task 7: 迁移现有 knowledge 内容到 logic

**Files:**
- Create: `src/content/logic/` (迁移自 knowledge)
- Delete: `src/content/knowledge/`

- [ ] **Step 1: 迁移 content/knowledge 到 content/logic**

```bash
mv src/content/knowledge src/content/logic
```

- [ ] **Step 2: 提交**

```bash
git add -A src/content/
git commit -m "refactor: migrate knowledge to logic collection"
```

---

## Task 8: 删除旧目录和页面

**Files:**
- Delete: `src/content/products/`
- Delete: `src/content/articles/`
- Delete: `src/pages/[lang]/kb/`
- Delete: `src/pages/[lang]/p/`
- Delete: `src/pages/[lang]/a/`

- [ ] **Step 1: 删除旧目录**

```bash
rm -rf src/content/products src/content/articles
rm -rf "src/pages/[lang]/kb" "src/pages/[lang]/p" "src/pages/[lang]/a"
```

- [ ] **Step 2: 提交**

```bash
git add -A
git commit -m "chore: remove legacy products, articles, kb, p, a directories"
```

---

## Task 9: 更新首页 index.astro

**Files:**
- Modify: `src/pages/[lang]/index.astro`

- [ ] **Step 1: 更新首页显示 logic 内容**

将 `src/pages/[lang]/index.astro` 的 `getCollection('knowledge'...)` 改为 `getCollection('logic'...)`

```bash
sed -i '' "s/getCollection('knowledge'/getCollection('logic'/g" src/pages/\[lang\]/index.astro
sed -i '' "s/\/${lang}\/kb\//\/${lang}\/logic\//g" src/pages/\[lang\]/index.astro
```

- [ ] **Step 2: 更新标签标签为 logic**

将 `src/pages/[lang]/index.astro` 中的标签文字从 "AI Tools Problems & Fixes" 更新为 "Logic" 类的标题

- [ ] **Step 3: 提交**

```bash
git add src/pages/\[lang\]/index.astro
git commit -m "refactor: update homepage to show logic content"
```

---

## Task 10: 构建并验证

- [ ] **Step 1: 运行构建**

```bash
npm run build 2>&1
```

- [ ] **Step 2: 检查是否有错误**

预期：117 pages built 或类似数字，无 ERROR

- [ ] **Step 3: 如有问题，修复后重新构建**

- [ ] **Step 4: 提交所有剩余更改**

```bash
git add -A
git commit -m "chore: complete sage persona transformation"
```

---

## 实施检查清单

- [ ] 所有页面使用统一配色 #FDFCF8 / #2C3E50
- [ ] 标题使用衬线字体
- [ ] 语言选择器只有简体中文和 English
- [ ] 侧边栏显示 Logic/Epoch/Stills/Echoes/Vault 分类
- [ ] URL 结构为 `/${lang}/${category}/${slug}`
- [ ] 版权声明已更新
- [ ] Vault 页面存在
- [ ] 日期格式为 "April 14, 2026" 格式
- [ ] 构建成功无错误
