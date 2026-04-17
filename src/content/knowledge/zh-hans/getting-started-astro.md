---
type: article
title: "Astro入门指南"
description: "学习如何使用Astro构建现代网站"
tags: ["教程", "Web开发", "Astro"]
publishedAt: 2026-04-09
---

Astro是一个现代静态站点构建器，以其独特的" island架构"而闻名。

## 为什么选择Astro？

Astro将HTML放在首位，默认情况下不发送JavaScript，使网站尽可能快。

## 核心概念

### 内容集合

Astro的内容集合提供了一种强类型的方式来管理内容。

### Island架构

Astro允许你只对需要交互的组件使用JavaScript。

### 组件集成

Astro支持React、Vue、Svelte等多种框架。

## 快速开始

```bash
npm create astro@latest my-site
cd my-site
npm run dev
```

## 项目结构

```
my-site/
├── src/
│   ├── pages/
│   │   └── index.astro
│   └── layouts/
│       └── Layout.astro
├── public/
└── astro.config.mjs
```

## 下一步

- 阅读官方文档
- 加入社区Discord
- 探索主题模板