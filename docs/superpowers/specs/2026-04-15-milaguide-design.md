# MilaGuide Website Design

**Date:** 2026-04-15
**Status:** Approved

## Overview

独立导航指南站，支持中日韩英四种语言，内容分产品和文章两类，通过 Markdown 文件手动维护。

## URL Structure

| Path | Description |
|------|-------------|
| `/{lang}/` | 首页，语言选择 |
| `/{lang}/products` | 产品列表 |
| `/{lang}/articles` | 文章列表 |
| `/{lang}/tags/{tag}` | Tag 筛选页 |
| `/{lang}/{products,articles}/{slug}` | 详情页 |

**Languages:** `en`, `ja`, `ko`, `zh`

## Content Structure

```
src/content/
├── products/
│   ├── en/example-product.md
│   ├── ja/example-product.md
│   ├── ko/example-product.md
│   └── zh/example-product.md
└── articles/
    ├── en/example-article.md
    ├── ja/example-article.md
    ├── ko/example-article.md
    └── zh/example-article.md
```

### Frontmatter Schema

```yaml
title: string
description: string
tags: string[]
publishedAt: Date
```

## Architecture

- **Framework:** Astro 4 with TypeScript
- **Routing:** Native Astro i18n with `prefixAlways: true`
- **Content:** Content Collections with Zod schema validation
- **Styling:** Plain CSS with CSS variables (no UI framework)
- **Fonts:** Noto Sans (Google Fonts)

## Design System

### Colors
- **Background:** `#ffffff`
- **Text:** `#1a1a1a`
- **Accent:** `#e63946` (red)
- **Muted:** `#6b7280`

### Typography
- Font family: `'Noto Sans', sans-serif`
- Heading scale: 2rem, 1.5rem, 1.25rem
- Body: 1rem/1.6

### Layout
- Max width: 800px centered
- Single column
- Consistent padding: 1rem

## Components

1. **Header** - Site title + language switcher
2. **Footer** - Copyright
3. **ContentCard** - Displays product/article preview
4. **TagFilter** - Filter by product/article/all
5. **LanguagePicker** - Select language from homepage

## Pages

1. **Homepage** (`/`) - Language selection grid
2. **List Pages** (`/{lang}/products`, `/{lang}/articles`) - Card list with tag filter
3. **Tag Page** (`/{lang}/tags/{tag}`) - Filtered list with type selector
4. **Detail Page** (`/{lang}/{products,articles}/{slug}`) - Full content

## Tech Stack

- Astro 4.x
- TypeScript
- Content Collections
- Zod (built into Astro)
