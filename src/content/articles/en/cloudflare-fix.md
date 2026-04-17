---
title: "Fix: Cloudflare Pages Astro 522 Error and Build Failure"
description: "How to fix Cloudflare Pages 522 error and build failures when deploying Astro projects"
publishedAt: 2026-04-14
tags: ["Astro", "Cloudflare Pages", "DNS", "DevOps"]
---

### 1. The Issue

After deploying an Astro project to Cloudflare Pages, you may encounter **Error 522 (Connection timed out)** when accessing your custom domain, or build logs may show找不到 `package.json` or `index.html`。

### 2. Root Cause

Usually caused by two issues:

* **Wrong to Workers flow**: Incorrectly selected "Create Worker" instead of "Create Pages" in Cloudflare dashboard, causing the system to try running the entire framework as a script.
* **DNS routing not mounted**: Although the custom domain resolves to Cloudflare, it hasn't been formally initialized in the Pages project's "Custom Domains", preventing the gateway from locating the origin server.

### 3. The Fix

#### Step A: Correct Project Type

Make sure you're in **Workers and Pages -> Pages** tab in the Cloudflare dashboard. Click "Connect to Git" and select the **Astro** preset, which will automatically configure the `npm run build` command.

#### Step B: Activate Custom Domain

Don't just manually add CNAME in DNS records.

1. Go to Pages project settings -> **Custom Domains**.
2. Click **Set up a custom domain**, enter your domain.
3. Let Cloudflare automatically complete initialization (shows green Active status).

#### Step C: SSL Mode Matching

Go to **SSL/TLS -> Overview**, ensure encryption mode is set to **"Full"** to match Pages edge certificate requirements.