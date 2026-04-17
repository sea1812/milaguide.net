---
type: article
title: "修正: Cloudflare Pages Astro 522 錯誤與建構失敗"
description: "如何解決使用 Cloudflare Pages 部署 Astro 專案時的 522 錯誤和建構失敗問題"
publishedAt: 2026-04-14
tags: ["Astro", "Cloudflare Pages", "DNS", "DevOps"]
---

### 1. 現象 (The Issue)

在將 Astro 專案部署到 Cloudflare Pages 後，訪問自訂網域時出現 **Error 522 (Connection timed out)**，或者在建構日誌中提示找不到 `package.json` 或 `index.html`。

### 2. 原因剖析 (Root Cause)

通常由兩個原因導致：

* **誤入 Workers 流程**：在 Cloudflare 後台錯誤選擇了「建立 Worker」而非「建立 Pages」，導致系統嘗試以腳本方式執行整個框架。
* **DNS 路由未掛載**：自訂網域雖然解析到了 Cloudflare，但未在 Pages 專案的「自訂網域」中正式初始化，導致網關無法定位源伺服器。

### 3. 解決方案 (The Fix)

#### 步驟 A：糾正專案類型

確保你在 Cloudflare 面板進入的是 **Workers 和 Pages -> Pages** 標籤頁。點擊「連接到 Git」，並選擇 **Astro** 預設，這會自動配置好 `npm run build` 命令。

#### 步驟 B：啟動自訂網域

不要只在 DNS 記錄裡手動新增 CNAME。

1. 進入 Pages 專案設定 -> **自訂網域 (Custom domains)**。
2. 點擊 **設定自訂網域**，輸入你的網域。
3. 讓 Cloudflare 自動完成初始化（顯示為綠色 Active 狀態）。

#### 步驟 C：SSL 模式匹配

前往 **SSL/TLS -> 概述**，確保加密模式設定為 **「完全 (Full)」**，以匹配 Pages 的邊緣憑證要求。