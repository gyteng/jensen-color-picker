# 黄仁勋拾色器

一个基于 Vue 3 和 Vite 的趣味拾色器。选择预设或自定义颜色，查看中文色名、为皮衣换色，并复制 HEX 色值。

**在线体验：[jensen-color-picker.pages.dev](https://jensen-color-picker.pages.dev/)**

## 本地开发与构建

需要 Node.js 20.19+ 或 22.12+。

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

构建产物位于 `dist`，可部署到 Cloudflare Pages 等静态托管服务。

皮衣换色蒙版针对当前肖像绘制；更换肖像时需调整 `src/utils/jacket.js` 中的路径。
