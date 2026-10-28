# QAQPM 公共可视化 HTML 报告壳

> 架构 §7.1。用户说「生成 HTML / 可视化报告」时触发。  
> 产出：`reports/<站码>-<短名>.html`，**单文件自包含**，可离线打开。

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

拆解类报告可复用 `qaqpm-go-nogo/references/report-template.html` + `fill_report.py`（升级自 ai-product-teardown）。

## 壳必备区块

1. **标题区**：项目名、站名、一句话结论、取证日期、来源列表  
2. **目录锚点**：各章跳转  
3. **证据筛选**：全部 / 隐藏推断 / 只看事实（色标对齐 `_shared/labels.md`）  
4. **正文**：按该站第 8 节「章节→HTML」映射；MD 附录可不进 HTML  
5. **来源脚注**  
6. **打印友好**：`@media print` 隐藏筛选按钮、展开全部  

## 最小 HTML 骨架（可复制后填）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>QAQPM 报告</title>
<style>
:root{--bg:#0b0f14;--fg:#e8eef5;--muted:#8b9bb0;--fact:#22c55e;--infer:#f59e0b;--tbd:#94a3b8;--card:#141b24;--line:#243041;--accent:#38bdf8}
*{box-sizing:border-box}body{margin:0;font:15px/1.65 system-ui,sans-serif;background:var(--bg);color:var(--fg)}
header{padding:28px 24px;border-bottom:1px solid var(--line)} h1{margin:0 0 8px;font-size:1.6rem}
.meta{color:var(--muted);font-size:.9rem} nav{display:flex;gap:8px;flex-wrap:wrap;padding:12px 24px;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--bg);z-index:5}
nav a{color:var(--accent);text-decoration:none;font-size:.85rem} .filters button{margin-right:6px;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:6px 10px;cursor:pointer}
main{max-width:980px;margin:0 auto;padding:24px} section{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;margin:0 0 16px}
.tag{display:inline-block;font-size:.72rem;padding:2px 6px;border-radius:999px;margin-right:6px;border:1px solid}
.tag.fact{color:var(--fact);border-color:var(--fact)} .tag.infer{color:var(--infer);border-color:var(--infer)} .tag.tbd{color:var(--tbd);border-color:var(--tbd)}
.hide-infer [data-ev=infer],.fact-only [data-ev=infer],.fact-only [data-ev=tbd]{display:none!important}
footer{padding:24px;color:var(--muted);font-size:.85rem} @media print{nav .filters{display:none} body{background:#fff;color:#111} section{break-inside:avoid}}
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
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.body.classList.remove('hide-infer','fact-only');
  if(b.dataset.mode==='hide-infer')document.body.classList.add('hide-infer');
  if(b.dataset.mode==='fact-only')document.body.classList.add('fact-only');
});
</script>
</body>
</html>
```

## 填写规则

- **只搬运 MD 已有结论与标签**，HTML 不新增事实（对齐 teardown report-guide）。
- 无内容的章节省略，不留空壳标题充数。
- 更新 `00-项目索引.md` 的 HTML 清单。
