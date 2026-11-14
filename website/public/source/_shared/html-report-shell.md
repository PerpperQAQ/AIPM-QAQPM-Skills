# QAQPM 公共可视化 HTML 报告壳

> Changelog 2026-10-30：新增「HTML 设计限制」硬规；默认壳改为浅色网格纸 + 橙强调色（对齐拆解报告／课件）；禁止青绿／霓虹紫作品牌色。  
> Changelog 2026-10-29：飞书或对外分享项目默认强制 00 全景 HTML + 立项决策一页纸 HTML。  
> 架构 §7.1。用户说「生成 HTML / 可视化报告」时触发。  
> 产出：`reports/<站码>-<短名>.html`，**单文件自包含**，可离线打开。

## 强制生成（飞书／分享项目）

当 `storage_mode=feishu`，或用户明确要「分享／对外可读／给老板一页」时，**默认强制**（写入 `00` HTML 清单，缺失＝总控收尾不通过）：

| 文件 | 说明 |
|---|---|
| `reports/00-项目全景.html` | 一眼看懂＋证据边界＋已决｜待证＋交接路径摘要 |
| `reports/立项决策一页纸.html` | 与 MD／飞书决策页同源；`frozen=false` 顶部红字 |

其余站仍按下方「何时生成」按需。索引须维护存在性清单。

## 何时生成

| 站 | 默认是否支持 | 建议文件名 |
|---|---|---|
| S2 用户研究 | 是 | `reports/02-用户研究.html` |
| S4 竞品 | 是 | `reports/04-竞品分析.html` |
| S6 立项（含拆解附录） | 是 | `reports/06-立项报告.html` 或 `reports/06-拆解-<产品>.html` |
| S7 评测设计 | 是 | `reports/07-评测设计.html` |
| S9 技术链路 | 专用 Archify 风格 | `09-技术链路.html`（见 archify-tech-map.md） |
| S11 验收 | 是 | `reports/11-验收与评测.html` |
| S12 上线观察 | 是 | `reports/12-上线观察.html` |
| 其余站 | 按需 | 同构壳 |

拆解类报告可复用 `qaqpm-go-nogo/references/report-template.html` + `fill_report.py`（升级自 ai-product-teardown）。五层拆解报告的专属视觉细则见 `ai-product-teardown/report-guide.md`；**站报告／手册类 HTML 一律遵守本文件「HTML 设计限制」**。

## 壳必备区块

1. **标题区**：项目名、站名、一句话结论、取证日期、来源列表  
2. **目录锚点**：各章跳转  
3. **证据筛选**：全部 / 隐藏推断 / 只看事实（色标对齐 `_shared/labels.md`）  
4. **正文**：按该站第 8 节「章节→HTML」映射；MD 附录可不进 HTML  
5. **来源脚注**  
6. **打印友好**：`@media print` 隐藏筛选按钮、展开全部  

## HTML 设计限制（硬）

生成或改版任何站 HTML 前必须读完本节。违规则重做视觉层（内容可保留）。

### MUST

- **单文件自包含**：零外部 CDN／字体／图片；图用内联 SVG/CSS/JS。
- **浅色为主**：背景 `#fafaf8` + 24px 浅网格（`rgba(0,0,0,.045)`）；卡片 `#fff`；正文近黑 `#111`；辅文 `#777`；线 `#e4e4e0`。
- **唯一品牌强调色**：默认橙 `#ff5a1f`（可用项目 `meta.accent` 覆盖，但仍只能有一个强调色）。
- **侧栏／导航**：浅色或近黑炭；**当前项**用黑底白字或橙左边条；禁止薄荷绿／青绿底作 active。
- **证据色仅用于标签**：【事实】`#15803d`／浅底；【推断】琥珀；【待确认】灰——**不得**把事实绿挪作整页品牌色或大面积装饰。
- **字体与层级**：系统中文字体栈；层级靠字号／字重，不靠堆颜色。
- **打印友好**：`@media print` 浅底深字。

### MUST NOT

- 禁止青绿／teal（如 `#0b6e66`）或霓虹青（如 `#38bdf8`）作为默认品牌 accent／大面积侧栏主题。
- 禁止第二强调色、渐变彩虹、玻璃拟态堆叠、紫色「AI 感」套路装饰。
- 禁止在 HTML 里新增 MD 未有的事实（见下方「填写规则」）。
- S9 技术链路 HTML 交互形态仍跟 `archify-tech-map.md`，但**配色仍遵守本文件设计限制**（除非用户当场指定别的单强调色）。

## 最小 HTML 骨架（可复制后填）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>QAQPM 报告</title>
<style>
:root{
  --bg:#fafaf8; --fg:#111; --muted:#777; --fact:#15803d; --infer:#b45309; --tbd:#6b7280;
  --card:#fff; --line:#e4e4e0; --accent:#ff5a1f;
}
*{box-sizing:border-box}
body{
  margin:0;font:15px/1.65 "PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif;
  color:var(--fg);
  background-color:var(--bg);
  background-image:linear-gradient(rgba(0,0,0,.045) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(0,0,0,.045) 1px,transparent 1px);
  background-size:24px 24px;
}
header{padding:28px 24px;border-bottom:1px solid var(--line);background:var(--card)}
h1{margin:0 0 8px;font-size:1.6rem;font-weight:700}
.meta{color:var(--muted);font-size:.9rem}
nav{
  display:flex;gap:8px;flex-wrap:wrap;padding:12px 24px;border-bottom:1px solid var(--line);
  position:sticky;top:0;background:var(--bg);z-index:5
}
nav a{color:var(--accent);text-decoration:none;font-size:.85rem}
.filters button{
  margin-right:6px;background:var(--card);color:var(--fg);border:1px solid var(--line);
  border-radius:8px;padding:6px 10px;cursor:pointer
}
.filters button[aria-pressed="true"],.filters button.active{
  background:#111;color:#fff;border-color:#111
}
main{max-width:980px;margin:0 auto;padding:24px}
section{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;margin:0 0 16px}
.tag{display:inline-block;font-size:.72rem;padding:2px 6px;border-radius:999px;margin-right:6px;border:1px solid}
.tag.fact{color:var(--fact);border-color:var(--fact);background:rgba(21,128,61,.08)}
.tag.infer{color:var(--infer);border-color:var(--infer);background:rgba(180,83,9,.08)}
.tag.tbd{color:var(--tbd);border-color:var(--tbd);background:rgba(107,114,128,.08)}
.hide-infer [data-ev=infer],.fact-only [data-ev=infer],.fact-only [data-ev=tbd]{display:none!important}
footer{padding:24px;color:var(--muted);font-size:.85rem}
@media print{
  nav .filters{display:none}
  body{background:#fff;color:#111;background-image:none}
  section{break-inside:avoid;box-shadow:none}
}
</style>
</head>
<body>
<header>
  <h1 id="title">报告标题</h1>
  <div class="meta" id="meta">项目 · 站 · 日期 · 来源</div>
  <p id="conclusion">一句话结论</p>
</header>
<nav>
  <div class="filters">
    <button type="button" data-mode="all">全部</button>
    <button type="button" data-mode="hide-infer">隐藏推断</button>
    <button type="button" data-mode="fact-only">只看事实</button>
  </div>
  <a href="#sec-1">章节1</a>
</nav>
<main id="main"><!-- 各 section：<section id="sec-1" data-ev="fact">... --></main>
<footer>QAQPM 可视化报告 · 单文件自包含 · 证据标签见 labels.md</footer>
<script>
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{
  document.body.classList.remove("hide-infer","fact-only");
  document.querySelectorAll(".filters button").forEach(x=>x.removeAttribute("aria-pressed"));
  b.setAttribute("aria-pressed","true");
  if(b.dataset.mode==="hide-infer")document.body.classList.add("hide-infer");
  if(b.dataset.mode==="fact-only")document.body.classList.add("fact-only");
});
</script>
</body>
</html>
```

## 填写规则

- **生成／改版任何站 HTML 前必须先读本节「HTML 设计限制」**；违规则重做视觉层。
- **只搬运 MD 已有结论与标签**，HTML 不新增事实（对齐 teardown report-guide）。
- 无内容的章节省略，不留空壳标题充数。
- 更新 `00-项目索引.md` 的 HTML 清单。
