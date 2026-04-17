---
type: article
title: "Astro入門"
description: "Astroフレームワークでウェブサイトを構築する初心者向けガイド"
tags: ["チュートリアル", "Web開発", "Astro"]
publishedAt: 2026-04-12
---

Astroは、デフォルトでゼロJavaScriptを提供する最新の静的サイトビルダーです。

## なぜAstroなのか？

- 部分ハイドレーション
- コンテンツコレクション
- 組み込みi18n
- 優れたパフォーマンス

## クイックスタート

```bash
npm create astro@latest
```

テンプレートを選択して構築開始！

## プロジェクト構造

```
my-site/
├── src/
│   ├── pages/
│   ├── layouts/
│   └── content/
├── public/
└── astro.config.mjs
```

##  주요概念

### アイランドアーキテクチャ

Astroは対話性のために「アイランド」アーキテクチャを使用します。JavaScriptが必要なコンポーネントのみがハイドレーションされます。

### コンテンツコレクション

組み込みのスキーマ検証を備えたMarkdownファイルのタイプセーフなコンテンツ管理。
