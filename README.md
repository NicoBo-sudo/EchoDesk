# EchoDesk PWA

手机优先的 Upwork / BI 商业英语闯关工具。

- Frontend: 原生 HTML/CSS/JS + PWA
- Local progress: localStorage（手机本地）
- Backend: Vercel Serverless Function `/api/generate`
- AI: DeepSeek API
- Default model: `deepseek-v4-flash`

## Vercel

1. 导入本目录到 Vercel。
2. Project Settings → Environment Variables 添加 `DEEPSEEK_API_KEY`。
3. 可选添加 `DEEPSEEK_MODEL=deepseek-v4-flash`。
4. Redeploy。
5. iPhone 用 Safari 打开网址 → 分享 → 添加到主屏幕。

API Key 只放 Vercel 环境变量，不写进前端。
