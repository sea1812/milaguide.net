---
type: product
title: "API Gateway Lite"
description: "Lightweight API gateway for microservices"
tags: ["open-source", "api", "microservices"]
publishedAt: 2026-04-05
---

A lightweight, high-performance API gateway designed for microservices architecture.

## Features

- Request routing
- Rate limiting
- Authentication
- Load balancing
- Circuit breaker

## Installation

```bash
npm install api-gateway-lite
```

## Example Configuration

```yaml
routes:
  - path: /api/users
    target: http://users-service:3001
  - path: /api/products
    target: http://products-service:3002
```
