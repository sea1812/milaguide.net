# MilaWeb 重构设计文档
**日期**: 2026-04-17
**状态**: 已批准

## 概述

将 MilaWeb 从「技术文档站」转型为「有温度的智者领地」，体现 Mila 三十年经验与跨界沉淀。

---

## 1. 内容分类结构

### 目录规划
```
src/content/
├── logic/     # 技术 Fix 类（保持现有技术文章）
├── epoch/     # 30年技术变迁、历史、地理思考
├── stills/    # 摄影和绘画作品
├── echoes/    # 小说碎片或文学笔记
└── vault/     # 工具推荐 (Affiliate 变现)
```

### 分类特点
- **Logic**: 技术类文章，统一 schema
- **Epoch**: 随笔类，可用简化双语（中文全文 + 英文摘要）
- **Stills**: 可选增加 `image` 字段
- **Echoes**: 文学创作，可选增加 `excerpt` 字段
- **Vault**: 工具推荐，含 `affiliateLink`, `description`, `category` 字段

### Frontmatter Schema（统一）
```yaml
---
title: string
description: string
publishedAt: date
tags: string[]
featured: boolean
type: 'product' | 'article'  # 保留用于区分展示，待移除
---
```

---

## 2. i18n 精简

### 目标语言
- `zh-hans` - 简体中文（主语言）
- `en` - English

### 删除内容
- 删除 `ja`, `ko`, `zh-hant` 语言目录
- 删除所有非中英的翻译内容
- 更新 `src/content.config.ts` 的 `languages` 数组
- 更新 Layout.astro 的 `langNames`

---

## 3. 视觉风格

### 配色方案
```css
--color-bg: #FDFCF8;        /* 象牙白 */
--color-text: #2C3E50;      /* 深青岩色 */
--color-accent: #8B7355;     /* 大地棕（替代红色） */
--color-muted: #7F8C8D;     /* 灰色 */
--color-border: #E8E4DE;    /* 暖灰边框 */
```

### 字体
- 标题：Georgia, 'Noto Serif SC', serif
- 正文：'Noto Sans', 'Noto Sans SC', sans-serif

### 布局变化
- 移除顶部 Tag 标签云
- 侧边栏改为分类导航：Logic | Epoch | Stills | Echoes | Vault
- 首页暂时无头图，保持简洁白底布局

---

## 4. URL 结构

### 新结构
```
/zh-hans/                    # 首页
/zh-hans/logic/              # 逻辑类列表
/zh-hans/logic/cloudflare-fix  # 详情页
/zh-hans/epoch/              # 时代类列表
/zh-hans/stills/             # 静谧类列表
/zh-hans/echoes/             # 回响类列表
/zh-hans/vault/              # 工具推荐页
/zh-hans/tags/[tag]/         # 标签页（保留）
```

### 旧结构（待清理）
- `/kb/` 路由 → 改用分类路由
- `/p/`, `/a/` 路由 → 已删除

---

## 5. 页面组件

### Layout.astro 改动
- 语言选择器：只显示「简体中文」「English」
- 侧边栏：从 Tag 列表改为分类导航
- 版权声明：更新为 "Written with heart and logic by Mila. No AI was used for primary creation."

### 新增页面
- `src/pages/[lang]/logic/[slug].astro` - 详情页（通用模板）
- `src/pages/[lang]/vault/index.astro` - 工具推荐页

### 移除内容
- `src/pages/[lang]/kb/[slug].astro` - 改用分类路由

---

## 6. 技术细节

### 日期格式
- 旧: `4/14/2026`
- 新: `April 14, 2026`

### 构建
- 删除 `ja`, `ko`, `zh-hant` 内容后重新构建
- 确保 404 检查通过

---

## 7. 实施顺序

1. 创建新分类目录结构 (`logic`, `epoch`, `still`, `echoes`, `vault`)
2. 更新 `src/content.config.ts`
3. 更新 `Layout.astro` 视觉样式和导航
4. 更新 CSS 变量
5. 创建新的分类路由页面
6. 删除旧内容目录和页面
7. 构建并验证
