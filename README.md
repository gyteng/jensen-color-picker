# 黄仁勋拾色器

基于 Vue 3 和 Vite 的中文趣味拾色器。页面保留本地卡通肖像；默认显示“黄仁勋”，提供 39 种预设颜色，其他预设使用完整颜色名称，自定义颜色匹配最接近的中文色名。字色、色块和 HEX 同步更新，“仁勋”的位置保持不变。

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

使用 npm 和 `package-lock.json` 管理依赖。构建结果位于 `dist`。颜色分类逻辑在 `src/utils/colors.js`，拾色器在 `src/components/ColorPicker.vue`，页面样式在 `src/style.css`。肖像使用压缩后的 `src/jensen-portrait.webp`，根目录 PNG 保留为原始素材。

## 皮衣颜色联动与本地预览

预设色与自定义色同时更新姓名、色块和肖像皮衣。`JacketPortrait.vue` 使用原图坐标下的局部蒙版与明暗映射保留皮革纹理，脸部、背景、内搭和主要金属配件不参与换色。蒙版针对当前肖像绘制，更换肖像时需重新调整 `src/utils/jacket.js` 中的路径。

局域网开发预览：`npm run dev -- --host 0.0.0.0 --port 5180`。本次仅本地预览，未经用户确认不得部署、上传或发布。

如果环境禁止 Vite/esbuild 创建子进程，可运行 `node scripts/local-preview.mjs --serve`，通过 Vue 官方编译器生成 `.local-preview` 并在 `0.0.0.0:5180` 提供静态预览；此模式修改源码后需重启。验证命令为 `node --test --test-isolation=none`。该后备方式不会修改 `dist` 或访问线上服务。

## 部署到 Cloudflare Pages

在 Cloudflare 控制台创建 Pages 项目并连接此项目的 Git 仓库，构建命令填写 `npm run build`，构建输出目录填写 `dist`，部署环境设置满足上述要求的 Node.js 版本。Cloudflare 会安装依赖并构建；肖像由 Vite 打包进输出目录。生产部署只使用本次构建的 `dist`，不要上传 `.local-preview`。部署后检查页面及静态资源是否来自同一次构建。

也可以先运行 `npm install` 和 `npm run build`，然后将 `dist` 上传到 Pages，或在完成 Wrangler 登录并创建项目后运行：

```sh
npx wrangler pages deploy dist --project-name <项目名>
```

页面包含 Open Graph 和 X 分享卡片标签，分享图位于 `public/social-preview-v2.png`；`public/robots.txt` 和 `public/sitemap.xml` 供搜索引擎发现页面。更换域名时，请同步更新 `index.html` 中的规范地址和分享地址，以及这两个文件中的网址。

API token 等凭据不要提交到仓库。
