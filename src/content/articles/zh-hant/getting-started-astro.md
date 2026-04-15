---
title: "Astro入門指南"
description: "學習如何使用Astro建構現代網站"
tags: ["教程", "Web開發", "Astro"]
publishedAt: 2026-04-09
---

Astro是一個現代靜態站點構建器，以其獨特的"island架構"而聞名。

## 為什麼選擇Astro？

Astro將HTML放在首位，預設情況下不發送JavaScript，使網站尽可能快。

## 核心概念

### 內容集合

Astro的內容集合提供了一種強型別的方式來管理內容。

### Island架構

Astro允許你只對需要互動的組件使用JavaScript。

### 組件整合

Astro支持React、Vue、Svelte等多種框架。

## 快速開始

```bash
npm create astro@latest my-site
cd my-site
npm run dev
```

## 專案結構

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

- 閱讀官方文檔
- 加入社群Discord
- 探索主題模板