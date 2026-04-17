---
title: "Fix: Cloudflare Pages 部署 Astro 项目时的 522 错误与构建失败"
description: "如何解决使用 Cloudflare Pages 部署 Astro 项目时的 522 错误和构建失败问题"
publishedAt: 2026-04-14
tags: ["Astro", "Cloudflare Pages", "DNS", "DevOps"]
---

### 1. 现象 (The Issue)

在将 Astro 项目部署到 Cloudflare Pages 后，访问自定义域名时出现 **Error 522 (Connection timed out)**，或者在构建日志中提示找不到 `package.json` 或 `index.html`。

### 2. 原因剖析 (Root Cause)

通常由两个原因导致：

* **误入 Workers 流程**：在 Cloudflare 后台错误选择了"创建 Worker"而非"创建 Pages"，导致系统尝试以脚本方式运行整个框架。
* **DNS 路由未挂载**：自定义域名虽然解析到了 Cloudflare，但未在 Pages 项目的"自定义域"中正式初始化，导致网关无法定位源服务器。

### 3. 解决方案 (The Fix)

#### 步骤 A：纠正项目类型

确保你在 Cloudflare 面板进入的是 **Workers 和 Pages -> Pages** 标签页。点击"连接到 Git"，并选择 **Astro** 预设，这会自动配置好 `npm run build` 命令。

#### 步骤 B：激活自定义域

不要只在 DNS 记录里手动添加 CNAME。

1. 进入 Pages 项目设置 -> **自定义域 (Custom domains)**。
2. 点击 **设置自定义域**，输入你的域名。
3. 让 Cloudflare 自动完成初始化（显示为绿色 Active 状态）。

#### 步骤 C：SSL 模式匹配

前往 **SSL/TLS -> 概述**，确保加密模式设置为 **"完全 (Full)"**，以匹配 Pages 的边缘证书要求。