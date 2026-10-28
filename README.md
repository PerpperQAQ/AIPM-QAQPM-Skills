# AIPM-QAQPM-Skills

面向 **AI 产品经理** 的全流程 Agent Skill 体系（QAQPM / AIPM）：从「想法」推进到立项、评测、双轨 PRD、POC、开发、验收与上线观察。

命名约定：展示名 `QAQPM-…`，Skill id `qaqpm-…`。

## 为什么做这套

AI 产品交付的是**结果与门禁**，不是功能清单堆砌。本仓库把课程里的主链站位、文档框架与脱敏示例收成可安装 Skill，让 Agent 按站推进，并用交接区与证据标签（【事实｜推断｜待确认】）把决策链串起来。

## 体系一览

| 角色 | 目录 | 作用 |
|---|---|---|
| 总控 | [`qaqpm-product-lifecycle`](./qaqpm-product-lifecycle/) | 定当前站、路由子 Skill、维护 `00-项目索引`、HTML 壳 |
| 主链 S1–S12 | `qaqpm-*` 各站目录 | 问题→调研→需求池→竞品→MVP→立项→**评测集**→双轨 PRD→POC→开发→验收→上线 |
| 公共件 | [`_shared/`](./_shared/) | 标签、交接 schema、调研菜单 A–H、HTML / Archify 约定、示例索引 |

**主链顺序**

`S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8 → S9 → S10 → S11 → S12`

- 立项（S6）通过后，默认下一站是 **S7 评测与测试集**（先备黄金集与门禁，再写 PRD）。
- 五层五问拆解并进 **S6 立项**（S4 可复用），无独立旁路 Skill。
- S1↔S2 允许双入口；立项前两者需齐。

### 各站速查

| 站 | Skill | 核心问题 | 主交付 |
|---|---|---|---|
| S1 | `qaqpm-problem-define` | 到底是什么问题？该不该用 AI？ | `01-问题定义卡.md` |
| S2 | `qaqpm-user-research` | 谁真有、有多疼？ | `02-用户研究.md` + `research/` |
| S3 | `qaqpm-requirements-backlog` | 有哪些可能要做的事？ | `03-需求池.md` |
| S4 | `qaqpm-competitor-analysis` | 别人做了吗，凭什么是我们？ | `04-竞品分析.md` |
| S5 | `qaqpm-mvp-scope` | 先做哪个，第一版多小？ | `05-MVP范围.md` |
| S6 | `qaqpm-go-nogo` | 值不值得投入？（含拆解） | `06-立项报告.md` |
| S7 | `qaqpm-eval-design` | 怎么量好坏？黄金集从哪来？ | `07` + `eval/` |
| S8 | `qaqpm-prd-dual` | 怎么做、怎么算完？ | `08-PRD/` + `08-Agent规范/` |
| S9 | `qaqpm-poc-eval` | 关键能力是否可行？ | `09` + 技术链路 HTML |
| S10 | `qaqpm-dev-track` | 如何落地并防回退？ | `10-开发推进记录.md` |
| S11 | `qaqpm-acceptance` | 功能通了吗，效果达标吗？ | `11-验收与评测报告.md` |
| S12 | `qaqpm-launch-observe` | 灰度 / 观察 / 回流？ | `12-上线观察.md` |

更完整的目录约定、路由分支、评测分工、双轨 PRD 与 HTML 规范见 **[ARCHITECTURE.md](./ARCHITECTURE.md)**。

## 安装

每个站是独立 Skill 目录：`SKILL.md` + 可选 `templates/`、`references/`。正文里用相对路径引用 `_shared/...`，因此**安装时请把仓库根目录的 `_shared/` 复制一份进该 Skill 目录**（与 `SKILL.md` 同级）。

### Grok Bot / Cursor 类 Agent

1. 将各 `qaqpm-*` 目录装入共享 skills（或对话里让 Bot 按本仓库安装）。
2. 优先调用总控 `qaqpm-product-lifecycle`，或直接点名单站。
3. 说「生成 HTML / 可视化报告」或「技术链路 HTML」可按约定出报告。

### Codex / 其他兼容 SKILL.md 的工具

把对应站目录拷入该工具的 skills 路径，同样附带 `_shared/`。

## 设计要点（摘要）

- **证据标签**：关键结论标【事实｜推断｜待确认】（兼容课件「页面事实」等别名）。
- **交接区**：每站文档末尾 YAML，下一站继承，避免重问。
- **评测提前**：S7 设计门禁与黄金集；S11 只对照执行，不重开指标。
- **双轨 PRD**：给人看的正式 PRD + 给编码 Agent 的规范；验收必须引用 S7。
- **HTML**：公共报告壳；POC 技术链路为自包含交互 HTML（形态对齐 [Archify](https://github.com/tt-a1i/archify)，不整仓搬代码）。
- **示例**：美团评测/闭环、轻颜需求池与问卷、模型 List 初筛 schema、OiiOii 权重等均为**脱敏结构示例**，见各站 `references/` 与 `_shared/examples-index.md`。

## 仓库内容

```
AIPM-QAQPM-Skills/
├── README.md
├── ARCHITECTURE.md
├── LICENSE
├── _shared/
├── qaqpm-product-lifecycle/
├── qaqpm-problem-define/
├── …（S2–S12 各站）
└── qaqpm-launch-observe/
```

不含课件原文、飞书私有全文或个人日记。

## 来源与许可

结构对齐且曼 AIPM 课程框架与实践笔记，并吸收课件中的文档框架（评测六步、需求池字段、双轨交付等）。

MIT — 见 [LICENSE](./LICENSE)。
