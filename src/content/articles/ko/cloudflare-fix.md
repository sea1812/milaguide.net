---
title: "수정: Cloudflare Pages Astro 522 오류 및 빌드 실패"
description: "Cloudflare Pages에 Astro 프로젝트 배포 시 522 오류 및 빌드 실패를 수정하는 방법"
publishedAt: 2026-04-14
tags: ["Astro", "Cloudflare Pages", "DNS", "DevOps"]
---

### 1. 문제 (The Issue)

Astro 프로젝트를 Cloudflare Pages에 배포한 후カスタムドメインにアクセスすると **Error 522 (Connection timed out)** 이 발생하거나、빌드 로그에 `package.json` 또는 `index.html` 을 찾을 수 없다는 오류가 표시될 수 있습니다。

### 2. 원인 (Root Cause)

보통 두 가지 이유所致：

* **Workers 프로세스 오류**: Cloudflare 대시보드에서 "Worker 생성"을 선택하여 Pages가 아닌 스크립트 방식으로 전체 프레임워크를 실행하려 합니다.
* **DNS 라우팅 미탑재**:カスタムドメインはCloudflareに解決されますが、Pagesプロジェクトの「カスタムドメイン」で正式に初期化されていないため、ゲートウェイが원본 服务器를 찾을 수 없습니다.

### 3. 해결책 (The Fix)

#### 단계 A: 프로젝트 유형 수정

Cloudflare 패널에서 **Workers and Pages -> Pages** 탭에 있는지確認してください.「Git에 연결」을 클릭하고 **Astro** 프리셋을 선택하면 `npm run build` 명령이 자동으로 구성됩니다.

#### 단계 B: 사용자 정의 도메인 활성화

DNS 레코드에 수동으로 CNAME만 추가하지 마세요.

1. Pages 프로젝트 설정 -> **사용자 정의 도메인 (Custom domains)** 으로 이동합니다.
2. **사용자 정의 도메인 설정**을 클릭하고 도메인을 입력합니다.
3. Cloudflare가 자동으로 초기화를 완료하도록 합니다 (绿色 Active 상태로 표시됩니다).

#### 단계 C: SSL 모드 일치

**SSL/TLS -> 개요**로 이동하여 암호화 모드가 **"완전 (Full)"** 으로 설정되어 있는지確認してください. 이렇게 하면 Pages의 에지 인증서 요구 사항과 일치합니다.