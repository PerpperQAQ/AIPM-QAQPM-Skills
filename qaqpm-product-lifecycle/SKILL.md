---
name: qaqpm-product-lifecycle
description: >-
  按 QAQPM / AIPM 全流程推进 AI 产品：判断当前站、继承交接区、路由子 Skill、维护 00-项目索引与 HTML
  报告壳。长对话须先抽「已确认决策表」；飞书存储时按 feishu-doc-protocol（需求池、评测集、Bad case、功能验收用例用多维表；竞品仍用文档）。触发词含「按 QAQPM
  流程」「从想法做到开发」「走立项」「推进到 PRD/评测/开发」。不写长篇终稿、不做简历面试诊断。
---
# QAQPM-产品全流程（总控）

**一句话**：需求＝用户没被解决的问题；立项＝拿证据换资源；做完 Demo ≠ 做完需求分析。（《AIPM完整流程框架》）

## 1. 何时用 / 何时不用

**用**：用户要从想法/老板一句话推进到立项、评测、PRD、POC、开发、验收或上线；或询问「我卡在哪一站」。  
**不用**：纯简历/面试诊断；只要单次代码实现且无产品决策；只要拆某一竞品且明确说「只拆解」→ 仍可路由到 S6 拆解模块或 S4，但不必走满 12 站。

## 2. 上游依赖

- 扫描项目根：`00-项目索引.md`、各 `0x-*.md`、`research/`、`eval/`、`reports/`、文末 `qaqpm_handoff` YAML。  
- 读 `_shared/labels.md`、`handoff-schema.md`、`html-report-shell.md`、`research-methods.md`、`archify-tech-map.md`、**`feishu-doc-protocol.md`（飞书模式）**。  
- 有则继承，**禁止重复问已确认事实**。

## 3. 本站目标与通过线

| 目标 | 通过线 |
|---|---|
| 定当前站与下一站 | 用户确认或默认建议被接受 |
| 维护索引与交接 | `00-项目索引.md` 与当前站交接区同步 |
| 强制证据标签 | 子 Skill 产出无【事实｜推断｜待确认】则打回 |
| 长对话决策可扫 | 存在 `research/已确认决策表.md`（见 Phase 1） |

## 4. 引导流程（Phase）

### Phase 0 开场（一次问清）
1. 新项目还是续做？  
2. 若续做：目录里已有哪些文档？你认为卡在哪？  
3. 本轮目标：只到立项 / 到评测集 / 到 PRD / 到 POC / 到上线？  
4. 文档落盘：本地-only 还是**飞书知识库**？（飞书 → 启用 `_shared/feishu-doc-protocol.md`；**需求池／评测集／Bad case／功能验收用例必须用多维表格**；竞品仍用文档）

### Phase 1 扫描与建议
- 无索引 → 创建项目：建议 S1（或双入口见下）。  
- 有索引 → 读 `current_station` 与 blockers。  
- **来自长对话 / 多线程 / Codex 会话**：先抽取或更新 `research/已确认决策表.md`（列：收敛结论｜【事实｜推断｜待确认】｜来源消息/线程｜写入站）。缺执行位置、底座、不做清单、访问入口时标 blockers。**无此表不得宣称 S1–S6 文档包已齐。**  
- 给出「建议下一站」+ 备选，用户可改选。

### Phase 2 路由
调用对应 `qaqpm-*` 子 Skill；总控不代替写长稿。飞书模式：子 Skill 交付后按协议双写并回读。

### Phase 3 收尾
更新 `00-项目索引.md`（含决策档位、**共享决策包冻结状态红绿灯**、飞书/多维表链接若有）；确认交接区无同质复读（见 handoff-schema）；问继续 / 停 / 回流。

### 特殊分支（必须遵守）
| 分支 | 行为 |
|---|---|
| 双入口 | 允许「先 S2 后 S1」或「先 S1 后 S2」；**S6 前两者齐** |
| 证据为空 | 先 S2 或与 S1 交错 |
| 技术风险高 | S5 后可插队 S9 **草案**，再回 S6 条件立项；正式 POC 仍在 S9 |
| S6 通过后 | **默认下一站 = S7**，再 S8（评测提前备测试集） |
| 只要拆解某产品 | S6 内拆解模块（或 S4 复用），无独立旁路 Skill |
| 要 HTML | 走 `_shared/html-report-shell.md`；技术链路走 Archify 风格约定 |
| 飞书存储 | 子文档按站创建；**S3/S7/S10/S11 四表＝多维表格** + 本地镜像；**竞品不用多维表** |

## 5. 方法与模板库

### 主链 12 站

| # | Skill id | 展示名 | 主交付 |
|---|---|---|---|
| S1 | qaqpm-problem-define | QAQPM-问题定义 | 01-问题定义卡.md |
| S2 | qaqpm-user-research | QAQPM-用户研究 | 02-用户研究.md + research/ |
| S3 | qaqpm-requirements-backlog | QAQPM-需求池 | 03-需求池.md（飞书时＋多维表） |
| S4 | qaqpm-competitor-analysis | QAQPM-竞品分析 | 04-竞品分析.md |
| S5 | qaqpm-mvp-scope | QAQPM-MVP范围 | 05-MVP范围.md（含架构取舍表） |
| S6 | qaqpm-go-nogo | QAQPM-立项决策 | 06-立项报告.md（含五层五问） |
| S7 | qaqpm-eval-design | QAQPM-评测与测试集 | 07 + eval/（飞书时＋评测集多维表） |
| S8 | qaqpm-prd-dual | QAQPM-双轨PRD | 08-PRD/ + 08-Agent规范/ |
| S9 | qaqpm-poc-eval | QAQPM-POC选型 | 09-POC与选型.md + 09-技术链路.html |
| S10 | qaqpm-dev-track | QAQPM-开发推进 | 10（飞书时＋Bad case 多维表） |
| S11 | qaqpm-acceptance | QAQPM-验收 | 11（飞书时＋功能验收用例多维表，与评测集分表） |
| S12 | qaqpm-launch-observe | QAQPM-上线观察 | 12-上线观察.md |

### 项目目录树（中文文件名）

```
./
├── 00-项目索引.md
├── 01-问题定义卡.md
├── 02-用户研究.md
├── 03-需求池.md
├── 04-竞品分析.md
├── 05-MVP范围.md
├── 06-立项报告.md
├── 07-评测设计与测试集.md
├── 08-PRD/
├── 08-Agent规范/
├── 09-POC与选型.md
├── 09-技术链路.html
├── 10-开发推进记录.md
├── 11-验收与评测报告.md
├── 12-上线观察.md
├── research/   # 含 已确认决策表.md、来源与原话.md
├── eval/
└── reports/
```

### `00-项目索引.md` 大纲

```markdown
# 项目索引 · <短名>
- 当前站 / 建议下一站
- 决策档位（S6 后）：立项 | 条件立项 | 不立项 | 暂缓
- 共享决策包：已冻 / 未冻（红字）
- 存储：local | feishu（飞书入口；需求池／评测集／Bad case／功能验收用例多维表链接）
- 文档清单（路径 · 状态 · 更新时间）
- HTML 清单
- 开放问题与 blockers（含架构取舍是否已写入 05/06/09）
- 最近交接区摘要
```

## 6. 输出文档大纲

总控直接产出/更新：`00-项目索引.md`、必要时 `research/已确认决策表.md`。其余由子 Skill 产出。

## 7. 证据与标签规则

全站强制 `_shared/labels.md`（含「官方记载 ≠ 本项目已验证」）。总控在路由前后抽检：无标签的关键结论 → 要求子 Skill 补标。

## 8. HTML 输出约定

- 公共壳：`_shared/html-report-shell.md`  
- 技术链路：`_shared/archify-tech-map.md` + S9 骨架  
- 拆解可视化：S6 `references/report-template.html`  
- 触发语：「生成 HTML」「可视化报告」「技术链路 HTML」

## 9. 自检清单

- [ ] 已扫描目录与交接区，未重复盘问  
- [ ] 长对话场景已有 `research/已确认决策表.md` 或已标 blocker  
- [ ] 建议站理由说清；S6→S7→S8 顺序未颠倒（除非用户明示并行且黄金集草案已有）  
- [ ] 双入口时 S6 前问题卡+证据齐  
- [ ] 飞书模式：协议已启用；S3/S7/S10/S11 四表为多维表+本地镜像；竞品不进多维表  
- [ ] 索引含决策档位＋共享包冻结状态；HTML 清单已更新  
- [ ] 未在总控展开长篇终稿  

## 10. 交接区字段

见 `_shared/handoff-schema.md`。总控在索引中镜像 `current_station`、`decision_tier`、`blockers`、`html_reports`、`storage_mode` / 飞书链接。

## 11. 回流规则

| 信号 | 退回 |
|---|---|
| 差异化不成立 | S2/S4 |
| 技术不可行 | S5/S9→S6 |
| 资源不够 | S5 |
| 评测门禁改指标 | S7（S11 不重开设计） |
| 范围漂移 | S5/S8 |

## 明确不做

- 不替代求职简历/面试诊断 Skill  
- 不在 S1–S6 生成可运行业务代码  
- 不把爬虫原声当成已验证用户需求  
- 不把「文档已写入飞书」当成「四表已用多维表 / 决策已冻结」
