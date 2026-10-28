# QAQPM 技术链路 HTML（仿 Archify 形态）

> 架构 §7.2 / 用户定调第 8 点。借鉴 [Archify](https://github.com/tt-a1i/archify) 的**交付形态与交互**，**不整仓搬源码**。  
> 主责：S9；S8 Agent 规范「技术栈」章节可同源生成。

## 对齐 Archify 的要点（借鉴，非安装依赖）

| Archify 能力 | 本体系落地 |
|---|---|
| 单文件自包含 HTML，零运行时依赖 | `09-技术链路.html` |
| 图类型路由：architecture / workflow / sequence / dataflow / lifecycle | 至少支持前四；lifecycle 按需 |
| 可探索：缩放平移或分块聚焦、主路径高亮、节点说明 | 内置最小交互（见下骨架） |
| MD/决策与 HTML 演示分层 | `09-POC与选型.md` = 证据与结论；HTML = 演示层 |
| 有 Archify skill 可用时 | **允许**调用生成；无则用本文件最小骨架，不强制 `npx skills add` |

## 生成步骤（写入 S9）

1. 在 MD 写清：组件表、主路径步骤、数据/模型链路、异常与降级。  
2. 选图类型（可多页签）：`architecture`（边界）· `workflow`（主路径）· `dataflow`（数据/模型）· `sequence`（关键调用）。  
3. 把节点/边填进下方 JSON（嵌在 HTML 的 `application/json`）。  
4. 用最小骨架渲染；检查离线打开、主路径高亮、侧栏说明。  
5. 重大变更另存 `09-技术链路-vN.html`，索引更新。

## 节点/边 JSON 约定

```jsonc
{
  "meta": {
    "title": "项目技术链路",
    "subtitle": "一句话",
    "updated_at": "2026-10-28",
    "source_md": "09-POC与选型.md",
    "primary_path": ["n1", "n2", "n3"]
  },
  "views": [
    {
      "id": "architecture",
      "label": "架构",
      "nodes": [
        {"id": "n1", "label": "Web/H5", "group": "client", "desc": "用户入口", "ev": "fact"},
        {"id": "n2", "label": "API", "group": "backend", "desc": "业务编排", "ev": "infer"},
        {"id": "n3", "label": "模型服务", "group": "ai", "desc": "推理", "ev": "tbd"}
      ],
      "edges": [
        {"from": "n1", "to": "n2", "label": "HTTPS"},
        {"from": "n2", "to": "n3", "label": "调用"}
      ]
    },
    {
      "id": "workflow",
      "label": "主路径",
      "nodes": [],
      "edges": []
    },
    {
      "id": "dataflow",
      "label": "数据流",
      "nodes": [],
      "edges": []
    }
  ]
}
```

## 最小交互 HTML 骨架（精简，可直接落盘后替换 JSON）

将下列文件作为模板复制到项目根 `09-技术链路.html`，只改 `<script type="application/json" id="tech-map-data">` 内 JSON。完整可运行骨架见 `qaqpm-poc-eval/references/tech-map-skeleton.html`。

### 交互清单（必须实现）

- [ ] Tab 切换 architecture / workflow / dataflow（及可选 sequence）
- [ ] 点击节点 → 右侧（或底部）显示 `desc` + 证据标签
- [ ] 「高亮主路径」按钮：按 `meta.primary_path` 加粗节点与边
- [ ] 无外链 CDN；CSS/JS 全内联
- [ ] 打印 / 导出：用户可用浏览器打印为 PDF

### 不要做的

- 不要复制 Archify 仓库源码或专有 schema 校验器整段进本 Skill  
- 不要在 HTML 里编造 MD 未写的组件  
- 不要把演示 HTML 当成选型证据（证据在 MD）


## RAG 主路径示例节点（高水平）

骨架 HTML 含页签 `RAG主路径`：Query增强 → 路由 → 召回Top-K → 重排Top-N → 生成 → Judge/转人。  
分组可用 `rag-offline`／`rag-online`（见 S9 组件表）。**不要**在 HTML 里整贴长提示词；证据留在 MD。
