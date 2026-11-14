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

1. 沿用 S4/S6 已确定的目的与范围，打开[完整流程](SKILL.md)执行 Step 0–4；完整模式先体验取证再做五层汇总，单功能只拆相关层。Step 5 HTML 按需。  
2. 需要表格时读[输出模板](templates.md)；细方法读[工具箱](toolkit.md)；体验读[体验指南](experience-guide.md)，按任务覆盖和证据判断完成，不以运行次数或已索要截图代替。  
3. 生成可视化读 `report-guide.md`，执行 `python3 fill_report.py data.json reports/06-拆解-<产品>.html`（路径按项目根调整）。  
4. 服务 S6 时，将「PM 结论 / 五个差距 / 如果我来做」摘要写回立项报告相关节；服务 S4 时，逐产品附录挂到竞品主报告并在完成取证后横比。两种用途均记录 `teardown_appendix_path`，可用真实文件或章节链接。  
5. 每条结论保持证据标签、体验状态与未测范围；二手材料可以形成受限分析，不能声明完整实测已完成。

## 五层链（复习）

用户需求场景 → 用户层 → 技术层（人机分工/确认点/光谱）→ 模型层（模型与成本）→ 基础层（买不到的壁垒）。  
详见 day11 与 `SKILL.md`。


## 按目的选用的扩展

完整模式的五层、体验记录、证据标签与架构图为基础输出。量化评分仅在需要比较效果且有可比样本时启用；市场三层用于竞争决定；模型路由用于确实涉及选型／调度的任务。三轮体验、OiiOii 评分结构、Agent 深挖和 HTML 属扩展，不对单功能强制全套。评分统一使用 `templates.md` 中的一套项目规则，不混用历史案例阈值。确认点与技术判断见 `SKILL.md`／`experience-guide.md`。
