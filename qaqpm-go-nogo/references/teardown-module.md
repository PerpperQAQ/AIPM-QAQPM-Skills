---
name: qaqpm-teardown-module
description: QAQPM 五层五问拆解模块（升级合并自 ai-product-teardown）。供 S6 立项附录与 S4 竞品深拆调用。
---

# QAQPM 五层五问拆解模块

> **升级合并说明**：本目录文件由原 `ai-product-teardown` Skill 迁入并纳入 QAQPM。展示调用名归 S6/S4；勿再安装独立旁路。  
> 原 SKILL 正文见同目录 `SKILL.md`（保留完整五层流程）；本文件是 QAQPM 入口与差异说明。

## 与原版差异

| 项 | 原 ai-product-teardown | QAQPM 模块 |
|---|---|---|
| 调用入口 | 独立 Skill | S6 路径 B，或 S4 深拆 |
| 产出位置 | 任意 | 默认附录进 `06-立项报告.md` 或 `reports/06-拆解-*.html`；竞品则服务 `04` |
| 标签 | 【事实】【推断】【待确认】 | 同；并服从 `_shared/labels.md` |
| HTML | report-template.html | 仍用本目录模板；也可用总控公共壳做立项摘要页 |
| 交接 | 无 | 拆解结论写入 S6/S4 交接区 `teardown_appendix_path` |

## 执行时

1. 打开并遵循同目录 **`SKILL.md`** 的 Step 0–5（取证、体验三轮、五层、汇总、自检、HTML）。  
2. 需要表格时读 `templates.md`；细方法读 `toolkit.md`；体验读 `experience-guide.md`。  
3. 生成可视化读 `report-guide.md`，执行 `python3 fill_report.py data.json reports/06-拆解-<产品>.html`（路径按项目根调整）。  
4. 将「PM 结论 / 五个差距 / 如果我来做」**摘要**写回立项报告 00/03/07 相关节，全文可放附录或独立 MD。  
5. 每条结论保持证据标签；待核实清单保留。

## 五层链（复习）

用户需求场景 → 用户层 → 技术层（人机分工/确认点/光谱）→ 模型层（模型与成本）→ 基础层（买不到的壁垒）。  
详见 day11 与 `SKILL.md`。


## 模板强制栏（补强）

拆解空表必须含：`templates.md` 中的 **效果体验·权重与评级**、**市场三层**、**模型路由表**。确认点四种放法见原 `SKILL.md`／`experience-guide.md`；Agent 光谱与 S8／S9 互链。
