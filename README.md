# Astro 在 Netlify 平台上的起始模板

[在线演示](https://astro-platform-starter.netlify.app/)

一个基于 Astro.js、Tailwind 和 [Netlify 核心原语](https://docs.netlify.com/core/overview/#develop)（Edge Functions、Image CDN、Blob Store）的现代化起始模板。

## Astro 命令

所有命令都在项目根目录的终端中运行：

| 命令                      | 操作                                       |
| :------------------------ | :----------------------------------------- |
| `npm install`             | 安装依赖                                   |
| `npm run dev`             | 在 `localhost:4321` 启动本地开发服务器     |
| `npm run build`           | 构建生产站点到 `./dist/` 目录              |
| `npm run preview`         | 在部署前本地预览构建                       |
| `npm run astro ...`       | 运行 CLI 命令如 `astro add`、`astro check` |
| `npm run astro -- --help` | 获取 Astro CLI 帮助                        |

## 部署到 Netlify

[![部署到 Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/astro-platform-starter)

## 本地开发

| 前置要求                                                        |
| :-------------------------------------------------------------- |
| [Node.js](https://nodejs.org/) v18.14+                          |
| （可选）[nvm](https://github.com/nvm-sh/nvm) 用于 Node 版本管理 |

1. 克隆此仓库，然后在根目录运行 `npm install`。

2. 为了确保启动器在本地具有完整功能（如边缘函数、blob 存储），请确保您安装了最新版本的 Netlify CLI。运行：

```
npm install netlify-cli@latest -g
```

3. 将您的本地仓库链接到已部署的 Netlify 站点。这将确保您在本地开发和已部署站点中使用相同的运行时版本。

```
netlify link
```

4. 然后，通过 Netlify CLI 运行 Astro.js 开发服务器：

```
netlify dev
```

如果浏览器没有自动导航到该站点，请访问 [localhost:8888](http://localhost:8888)。
