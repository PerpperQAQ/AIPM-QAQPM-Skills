---
name: qaqpm-dev-track
description: >-
  QAQPM 开发推进站（偏薄）：守范围、任务拆解、联调、迭代评测防回退、变更与 bad case 积累；飞书存储时 Bad
  case 权威载体必须是多维表格。产出 10-开发推进记录.md。不在此重开 BRD。
---
# QAQPM-开发推进（S10）

笔记锚点：框架阶段⑨；day17 迭代评测；day13 板书开发推进。本站**偏薄**。

## 1. 何时用 / 何时不用
**用**：PRD/Agent 规范已定，进入实现与迭代。  
**不用**：重开问题定义或立项（回 S1/S6）；正式准入报告（S11）。

## 2. 上游依赖
S8 双轨文档、S7/S9 评测基线。启用飞书时读 `_shared/feishu-doc-protocol.md`。

## 3. 目标与通过线
范围不静默膨胀；每次改动有对应评测；bad case 入库。

### 存储形态（飞书硬规则）
| 模式 | Bad case 权威载体 | 本地必有 |
|---|---|---|
| 本地-only | `10` 内索引或 `dev/bad-cases.md` | 本记录 |
| **飞书存储** | **飞书多维表格「Bad case」** | `10` 索引镜像或 `dev/bad-cases.md`；行数对齐 |

- 回写评测题时须同步更新 S7 评测集多维表（若飞书模式）。

## 4. 引导流程
P0 从 Agent 规范拆任务看板 → P1 人机分工落地检查 → P2 联调记录 → P3 迭代评测（对照 S7 子集）→ P4 变更日志 + **飞书模式建/更新 Bad case 多维表并镜像** → P5 交接。

## 5. 模板
`templates/10-开发推进记录.md`
- `references/prompt-iteration.md`（对标最强、一次改一处、回归题）
- 飞书：`_shared/feishu-doc-protocol.md` §3.3

## 6. 输出大纲
必填：当前范围快照、任务状态、变更、评测跑次、bad case 索引（飞书时含多维表 URL）、风险。选填：投喂 Agent 的检查单。

## 7. 证据规则
「改好了」必须有题号与前后分；无评测的体感优化标【推断】。

## 8. HTML
按需。

## 9. 自检
- [ ] 无静默加需求  
- [ ] 有回归题（链 eval/）
- [ ] 提示词改动有版本与前后分  
- [ ] 未重开 BRD  
- [ ] **若飞书模式：Bad case 多维表已建（未关闭/本迭代/已回写评测 三视图）；本地镜像对齐；URL 入交接区**

## 10. 交接区
`scope_drift`, `regression_eval_runs`, `storage_mode`, `bad_case_bitable_url`, `bad_case_md_mirror_path`, `next_station`→S11

## 11. 回流
范围争议 → S5/S8；指标争议 → S7；效果不达标且无解 → S9。
