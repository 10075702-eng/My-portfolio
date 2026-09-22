# 周俊行 / Junhang Zhou 作品集

Next.js App Router + Tailwind CSS 的影像作品集，可直接部署到 Vercel。

## 本地运行

```bash
npm install
npm run dev
```

## 内容与素材

- `src/config/media.ts`：唯一的媒体、短视频、明信片、社交链接入口。
- `src/config/works.ts`：正式作品、早期作品，以及每个详情页的简介、技术标签、制作过程章节。
- 制作过程章节的 `layout` 可选 `single`、`split`、`wide`；`media` 每项格式为 `{ type, src, caption }`。空媒体数组会在页面显示“此处待插入图片/视频”。

建议把真实素材放入 `public/media/`，再将配置中的 URL 改成 `/media/文件名`。

### 媒体规格

- 360 视频：严格 2:1，最大 `4096×2048`。
- 360 照片：可使用 `8192×4096`；全景展厅会显示加载状态。
- Hero：建议 `1920×1080`、8–15 秒、3–5MB、静音循环。

## 明信片墙 / Supabase

前端读取 `.env.local` 中既有的：

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

不需要数据库迁移。页面使用 `postcard_ratings`、`postcard_wants` 完成匿名评分和“想要”标记；匿名 ID 保存于浏览器 localStorage。`.env` 和 `.env*.local` 已保持忽略，不会进入 Git。

## 部署 Vercel

推送项目到 GitHub 后，在 Vercel 导入仓库。将同一组 Supabase 环境变量填入 Vercel 的 Environment Variables，然后使用默认 `npm run build` 即可。
<!-- deploy test -->
