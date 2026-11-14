# QAQPM 交互式架构与使用指南

面向外部用户的展示与教学网站。银白底、石墨文字与橙色强调，包含可探索架构、17 个 Skill 的详细用法、5 种使用场景、6 步教学案例、84 个独立 Markdown 模板文件（68 个字段模板、16 个章节骨架）、7 份 S4/S6 共用拆解方法文档及安装说明。

在线地址：[QAQPM 架构与使用指南](https://perpperqaq.github.io/AIPM-QAQPM-Skills/)。

## 本地运行

```bash
npm ci
npm run dev -- --port 4174 --strictPort
```

打开终端显示的本地地址。若端口已被其他项目占用，换一个空闲端口。

```bash
npm run build
npm run preview -- --port 4175 --strictPort
```

`dist/` 是可托管的静态站点，本地默认使用相对资源路径，支持域名根目录或子目录。

## GitHub Pages

仓库使用 [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml) 发布。推送 `main` 或手动运行该工作流后，GitHub Actions 安装锁定依赖，从当前提交重新生成资源目录，按 Pages 项目子路径构建，再部署 `website/dist/`。公开页面和原文链接来自同一次提交。

工作流采用 Node.js 24、官方 Pages Actions，部署权限限定在部署 job。仓库 Settings → Pages 的来源应选择 GitHub Actions。若复制到其他仓库，需同步修改仓库链接和本页公开地址。

## 内容与来源

- Skill 与模板来自 `PerpperQAQ/AIPM-QAQPM-Skills` 仓库；内容对照版本记录在 `src/content.json` 的 `commit` 中。每份原文有独立哈希，与对照提交不同的内容标记为本地修订。
- `src/data.js`：整理后的教学文案、调用示例、场景与案例。
- `src/content.json`：按类型组织的资源目录、逐文件发布状态与内容快照，供页面检索。
- `public/source/`：可预览、复制和下载的原始文件；正文在点击后加载。
- `source-manifest.json`：130 份网页源文件的 SHA-256 清单，以及快照 ID、对照提交和文件是否有本地修订；包含拆解方法及其 HTML／脚本依赖。
- 教学案例是示意项目，不含虚构运行成绩。文档成熟度、选型、链路验证与正式验收分开说明。
- 只有与已发布 Git 提交逐文件一致的内容提供 GitHub 原文链接；本地修订和新增文件只提供当前快照的预览、复制与下载。
- 17 个正文大纲是 Skill 的章节入口，13 个共享规则独立计数，1 个 CSV 属配套文件。1 个旧名跳转文件保留兼容但不展示为模板。独立文件并不意味着完整报告；16 个章节骨架均显式标记。

7 份方法文档包括拆解入口、完整流程、体验指南、配表、技术推断、报告指南和历史案例；S4/S6 共用，不增加独立模板数量。S4 区分扫描、单功能研究与完整拆解，完整模式先取证后比较，实际操作与二手资料分别说明。

在仓库的 `website/` 中运行 `npm run sync-content`，默认从仓库根读取 `qaqpm-*` 与 `_shared`，与 Git `HEAD` 逐文件核对；内容集合的 SHA-256 用作快照版本。已有生成文件随仓库提供，直接构建不需要 Python 或额外访问原始资料。

要对照一个指定的已发布版本，可运行 `npm run sync-content -- --ref <commit>`。若维护源与发布仓库分离，使用 `--source-root <目录> --repository <Git仓库目录> --ref <commit>`，不必修改脚本。相对参数路径以当前工作目录为准。发布时先提交 Skill、仓库说明与网站源码，再针对该提交生成网页原文，可以避免生成文件引用自身提交。

同步后也要核对 `src/data.js` 中的教学文案。脚本不会自动更新手工示例或代表项目执行任何验证。

## 交互与可访问性

每站指南按“独立模板 / 正文大纲 / 共享规则 / 方法文档 / 配套文件”展示实际可用资源；资料库可组合类型、站点和关键词筛选，正文大纲预览只展示相应章节。架构支持四种视图、节点详情、缩放与进入指南；移动端架构允许独立横向滚动。模板支持筛选、搜索、无结果提示、原文预览、复制与下载。原文使用原生 dialog 管理焦点，支持 Escape 和遮罩关闭。支持键盘操作、减少动效偏好、移动端导航。

## 验证

`npm run build` 生成生产构建。`scripts/browser-check.js` 是供 Playwright CLI 执行的浏览器检查脚本（非测试框架项目），覆盖指南、模板、原文、复制下载、案例、响应式与键盘交互。运行时需先启动 4174 端口的本地服务。

```bash
playwright-cli --session qaqpm-exhibition open http://127.0.0.1:4174
playwright-cli --session qaqpm-exhibition run-code --filename scripts/browser-check.js
```

`scripts/catalog-check.js` 面向发布版本，检查四份新增模板、类型与深度、GitHub 原文入口、章节节选、共享规则、CSV 和移动端，运行前启动 4175 端口的生产预览。`scripts/production-check.js` 检查生产页面与自动演示。截图和检查结果写入 `output/playwright/`，不进入仓库。

技术：React、Vite、Motion、Phosphor、react-markdown。字体为本地托管的 Geist 和 Geist Mono，中文采用设备字体。
