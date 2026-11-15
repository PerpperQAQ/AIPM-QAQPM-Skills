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
| S8 下的 AI 需求模块 | [Agent](./qaqpm-agent-requirements/)、[RAG](./qaqpm-rag-requirements/)、[AIGC](./qaqpm-aigc-requirements/) | S5 可启动首稿，S8 沿用同一文档细化到开发交接；按能力组合，也可独立调用 |
| 跨站专项 | [核心技术难题梳理](./qaqpm-tech-risk-review/SKILL.md) | 用 `$qaqpm-tech-risk-review` 找出会改变架构、首版范围或产品承诺的难题，并设计最小验证。 |
| 公共件 | [`_shared/`](./_shared/) | 标签、交接 schema、调研菜单 A–H、HTML / Archify 约定、示例索引 |

**主链与交错推进**

`S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8 → S9 → S10 → S11 → S12`

- S5先形成MVP方案、适用AI专题首稿和验证计划；关键可行性可提前调用S7设计、S9执行，返回S5/S6。
- 立项后S7完善标准与题集，S8继续同一份需求细化，S9按需要交错验证；编号表示职责，不要求把验证拖到方案冻结后。
- 五层五问拆解并进 **S6 立项**（S4 可复用），无独立旁路 Skill。
- S1↔S2 允许双入口；立项前两者需齐。

### 各站速查

| 站 | Skill | 核心问题 | 主交付 |
|---|---|---|---|
| S1 | `qaqpm-problem-define` | 到底是什么问题？该不该用 AI？ | `01-问题定义卡.md` |
| S2 | `qaqpm-user-research` | 谁真有、有多疼？ | `02-用户研究.md` + `research/` |
| S3 | `qaqpm-requirements-backlog` | 有哪些可能要做的事？ | `03-需求池.md` |
| S4 | `qaqpm-competitor-analysis` | 别人做了吗，凭什么是我们？ | `04-竞品分析.md` |
| S5 | `qaqpm-mvp-scope` | 首版怎样形成闭环，哪些假设要先验证？ | `05-MVP范围.md`＋适用AI专题首稿 |
| S6 | `qaqpm-go-nogo` | 值不值得投入？（含拆解） | `06-立项报告.md` |
| S7 | `qaqpm-eval-design` | 怎么量好坏？黄金集从哪来？ | `07` + `eval/` |
| S8 | `qaqpm-prd-dual` | 怎么做、怎么算完？ | `08-PRD/` + `08-Agent规范/`（开发与接口约定）＋适用 Agent／RAG／AIGC 需求 |
| S9 | `qaqpm-poc-eval` | 关键能力是否可行？ | `09` + 技术链路 HTML |
| S10 | `qaqpm-dev-track` | 如何接入开发仓库、分阶段实现并验证？ | `10-开发推进记录.md`＋`dev/开发接入.md`＋工程阶段文档与证据 |
| S11 | `qaqpm-acceptance` | 功能通了吗，效果达标吗？ | `11-验收与评测报告.md` |
| S12 | `qaqpm-launch-observe` | 灰度 / 观察 / 回流？ | `12-上线观察.md` |

更完整的目录约定、路由分支、评测分工、双轨 PRD 与 HTML 规范见 **[ARCHITECTURE.md](./ARCHITECTURE.md)**。

### S8 与三个 AI 需求模块的关系

[S8「需求细化与开发交接」](./qaqpm-prd-dual/SKILL.md)负责完整 PRD、开发与接口约定，以及产品实际采用的 AI 能力需求。Agent、RAG、AIGC 是其中可按需调用的三个需求模块，保留独立 Skill，方便组合使用或只补一份文档；它们不增加 S1–S12 之外的阶段编号。

| 模块 | 负责什么 | 主要文档 |
|---|---|---|
| [Agent 需求](./qaqpm-agent-requirements/SKILL.md) | 用户任务、自主决策、节点协作、工具与上下文 | `Agent需求.md`、`节点与协作.md`、`Tool-List.md`、`Prompt与上下文.md` |
| [RAG 需求与架构](./qaqpm-rag-requirements/SKILL.md) | 知识来源与权限、离线入库、在线检索与生成、引用与无答案处理 | `RAG需求与架构.md`、`知识来源与维护.md`、`数据处理与入库.md`、`检索与生成.md` |
| [AIGC 需求](./qaqpm-aigc-requirements/SKILL.md) | 生成／编辑任务、素材与参数、预览修改、异步状态与产物交付 | `AIGC需求.md`、`任务与模态矩阵.md`、`生成与编辑流程.md`、`Prompt素材与参数.md` |

- **S5 启动首稿**：说清实际能力、输入输出、核心流程、范围与待验证假设，按需要调用 S7／S9 验证。
- **S8 继续细化**：沿用同一份权威文档，补齐规则、接口、数据、权限、状态、异常和验收引用，形成开发交接版。
- **单独调用**：已有项目可直接补所需模块；没有首稿时按当前资料创建，无须补做历史阶段。未采用的能力不建空文档。

`08-Agent规范/` 是给**编码 Agent**阅读的开发与接口约定；产品内部的 Agent 行为由 `qaqpm-agent-requirements` 描述。完整规则见 [AI 文档协作协议](./_shared/ai-document-protocol.md)。

## S10：从产品资料接入开发仓库

[S10「开发执行」](./qaqpm-dev-track/SKILL.md)使用指定的 [QAQPMskill-idea-to-launch-kit 开发流程仓库](https://github.com/PerpperQAQ/QAQPMskill-idea-to-launch-kit)。QAQPM 提供产品范围、需求与验收依据；开发仓库提供 `AGENTS.md` 规则、技术手册、`kit.sh` 阶段管理和 `verify.sh` 自检。Agent 读取并执行实际规则，按阶段完成文档、代码与验证。

### 接入与执行顺序

1. **读取现状**：核对项目索引、S8 PRD 与 AI 需求、S7 标准／题集、S9 选型结论，以及已有代码、技术栈和未提交改动。
2. **首次接入**：说明仓库用途和实际存放路径，获得确认后由 Agent 拉取指定 fork；同一项目、同一位置已有明确授权时直接执行。核对 origin、实际提交和关键文件，在 PM 项目中填写 [`dev/开发接入.md`](./qaqpm-dev-track/templates/开发接入.md)，关联产品目录与需求、评测、选型来源。
3. **继续已有项目**：读取接入记录，核对绑定路径、流程基线、工作区变化和当前阶段，复用现有仓库；不重复下载或自动更新。新产品使用 `projects/<产品名>/`；已有工程先核对路径和验证命令的兼容性，需要适配时明确映射与待完成项。
4. **逐阶段执行**：读取 `AGENTS.md`、当前阶段与相关手册，取得阶段任务；先写当前子阶段技术文档，再实现、运行自检并补充真实验证证据。
5. **验收与交接**：自检和补充核查通过、用户明确验收当前阶段后，才推进下一阶段。相关实现与联调完成后交 S11 做功能与 AI 效果准入；S12 在准入及发布授权范围内接续部署与观察。

### 开发仓库的六个阶段

仓库阶段 0–5 是工程执行编号，与产品流程 S1–S12 分属不同层级；阶段 2／3 可拆成多个子阶段。

| 仓库阶段 | 工作与主要产出 | QAQPM 衔接 |
|---|---|---|
| 0 · PRD 体检 | 继承已确认需求，补当前实施缺口，产出 PRD 补全清单和核查记录 | S10 接入 |
| 1 · 技术适配 | 引用 S9 选型，写技术适配声明、采纳／偏差与子阶段规划 | S10 接入 |
| 2 · 后端与 Agent 核心 | 按子阶段产出技术文档、后端代码、API／恢复测试与适用的真实模型冒烟证据 | S10 实现 |
| 3 · 正式前端与联调 | 确认视觉与交互，产出前端、移动适配、真实联调与端到端验证证据 | S10 → S11 |
| 4 · 部署上线 | 准备目标环境、数据与登录边界、地址和回滚，产出部署与线上验证证据 | S11 准入后，由 S12 按授权执行 |
| 5 · 工程收尾 | 整理产品 README、运行说明、项目状态和凭证依赖／到期事项 | S12 或本地交付收尾 |

Agent 在已绑定的开发仓库根目录执行以下循环。`product_name` 和有分支时的 `next_stage` 使用实际绑定值；单一下一阶段可省略最后参数。

```bash
bash kit.sh 任务 "$product_name"
# 完成当前阶段的文档、实现与证据后：
bash kit.sh 自检 "$product_name"
# 自检及补充核查通过，并已有用户对本阶段的明确验收后：
bash kit.sh 通过 "$product_name" "$next_stage"
```

`docs/本阶段任务.md`、`docs/流程状态.txt`、`docs/流程历史.txt` 由脚本维护。S10 用 `10-开发推进记录.md` 引用真实阶段、版本、证据与待验项；自检成功仍需核查实际结果，不能代替 S11 的功能／AI 效果准入。S11 准入不自动授权部署；只交付本地产品时，在适用验收与收尾后结束。

详细的拉取命令、已有工程适配、阶段推进与证据规则见 [开发流程仓库接入协议](./_shared/development-kit-protocol.md)。

## AI专题与文档模板

目前共 **17 个 Skill**：总控、S1–S12、核心技术难题梳理和 3 个 AI 专题。共有 **84 个独立 Markdown 模板文件**（68 个字段模板、16 个章节骨架），另有 1 个 CSV 配套文件、1 个兼容旧名的跳转文件。17 个正文大纲入口、13 份去重共享规则和 7 份 S4/S6 共用方法文档单独展示，不计入模板数。

2026-11-14 补齐 [用户研究](./qaqpm-user-research/templates/02-用户研究.md)、[项目索引](./qaqpm-product-lifecycle/templates/00-项目索引.md)、[已确认决策表](./qaqpm-product-lifecycle/templates/已确认决策表.md) 和 [Bad case 记录](./qaqpm-dev-track/templates/Bad-case记录.md)，并校正各站交接、早期验证回流和验收字段。

独立文件不等于完整报告或真实执行证据；具体覆盖与限制见 [文档资源类型与覆盖](./_shared/document-resource-guide.md)。

竞品分析支持公开资料扫描、单功能研究和完整拆解。完整模式先完成约定范围内的体验取证，再做横比与判断；操作观察、技术推断和待补证事项分别记录。方法入口见 [S4/S6 共用拆解模块](./qaqpm-go-nogo/references/teardown-module.md)。

- [阶段协作与适用规则](./_shared/ai-document-protocol.md)
- [模板来源与提炼说明](./_shared/document-template-sources.md)
- [评测对象与材料映射](./qaqpm-eval-design/templates/评测对象与材料映射.md)
- [运行Case记录](./qaqpm-eval-design/templates/测试Case记录.md)

标准、题集、运行Case和分析继续复用现有评测目录。单文档请求直接完成该范围；未采用的组件或模态不创建空包。文档成熟度、模型选择、链路验证和产品验收分别记录。

## 交互式网站

[在线访问 QAQPM 架构与使用指南](https://perpperqaq.github.io/AIPM-QAQPM-Skills/)。

[website/](./website/) 提供可探索架构、17 个 Skill 的输入材料／执行步骤／产出文档／完成条件／交接指南、教学案例、分类资源库与安装说明。指南将三个 AI 需求模块收在 S8 下，并展开 S9 报告生成与 S10 开发仓库流程。模板支持搜索、预览、复制和下载；原文链接固定到内容提交版本。

```bash
cd website
npm ci
npm run dev
```

使用 `npm run build` 构建静态站点。推送 `main` 后，[Pages 工作流](./.github/workflows/deploy-pages.yml) 会从该提交重新生成资料目录并部署项目站点。运行、内容同步与浏览器检查说明见 [website/README.md](./website/README.md)。

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
- **评测提前**：S7可支持S5早期设计；S9执行可行性与选型，S10回归，S11正式准入，沿用同源标准与题集。
- **双轨 PRD**：给人看的正式 PRD + 给编码 Agent 的规范；完整AI开发交接引用适用S7标准；非AI功能用功能验收。
- **HTML**：公共报告壳；POC 技术链路为自包含交互 HTML（形态对齐 [Archify](https://github.com/tt-a1i/archify)，不整仓搬代码）。
- **示例**：美团评测/闭环、轻颜需求池与问卷、模型 List 初筛 schema、OiiOii 权重等均为**脱敏结构示例**，见各站 `references/` 与 `_shared/examples-index.md`。
- **飞书存储**：项目文档走飞书时，**需求池、评测集、Bad case、功能验收用例**权威载体必须是**飞书多维表格**（本地 MD/`eval/`/`dev`/`qa` 镜像）；**竞品分析仍用文档，不进多维表**。协议见 `_shared/feishu-doc-protocol.md`。

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
├── qaqpm-launch-observe/
└── website/（交互式架构、指南、案例与资源库）
```

不含课件原文、飞书私有全文或个人日记。

## 来源与许可

结构对齐且曼 AIPM 课程框架与实践笔记，并吸收课件中的文档框架（评测六步、需求池字段、双轨交付等）。

MIT — 见 [LICENSE](./LICENSE)。
