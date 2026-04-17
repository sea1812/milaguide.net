---
title: "修正: Cloudflare Pages Astro 522エラーとビルド失敗"
description: "Cloudflare PagesにAstroプロジェクトをデプロイする際の522エラーとビルド失敗の修正方法"
publishedAt: 2026-04-14
tags: ["Astro", "Cloudflare Pages", "DNS", "DevOps"]
---

### 1. 問題 (The Issue)

AstroプロジェクトをCloudflare Pagesにデプロイ後、カスタムドメインにアクセスすると **Error 522 (Connection timed out)** が発生したり、ビルドログで `package.json` または `index.html` が見つからないというエラーが表示される場合があります。

### 2. 原因 (Root Cause)

通常、次の2つの原因考えられます：

* **Workersフローへの誤入力**：Cloudflareダッシュボードで「Workerを作成」を選択し、Pagesではなくスクリプトとしてフレームワーク全体を実行 محاولة 했습니다。
* **DNSルーティングがマウントされていない**：カスタムドメインはCloudflareに解決されますが、Pagesプロジェクトの「カスタムドメイン」で正式に初期化されていないため、ゲートウェイが оригиналь 服务器を見つけられません。

### 3. 解決策 (The Fix)

#### ステップA：プロジェクトタイプの修正

Cloudflareパネルで **Workers and Pages -> Pages** タブことを確認してください。「Gitに接続」をクリックし、**Astro** プリセット，选择，这将自动配置 `npm run build` 命令。

#### ステップB：カスタムドメインのアクティブ化

DNSレコードに手動でCNAMEを追加するだけではしないでください。

1. Pagesプロジェクト設定 -> **カスタムドメイン (Custom domains)** に移動。
2. **カスタムドメインを設定**をクリックして、ドメイン名を入力。
3. Cloudflareが自動的に初期化を完了させ（绿色 Active 状态で表示）、让它自动完成初始化。

#### ステップC：SSLモードマッチング

**SSL/TLS -> 概要**に移動して、暗号化モードが **「完全 (Full)」** に設定されていることを確認してください。これにより、Pagesのエッジ証明書要件に一致します。