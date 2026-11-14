# 文档模板来源与提炼说明

读取日期：2026-11-10。优先来源为用户指定的[项目文档合集](https://acnvzg8pa9yc.feishu.cn/wiki/EAm6wvjjzigCNWkX76yczQLMnQd)。目录共151个节点（含22个顶层项目）；选择相关正文与表头提炼，不代表所有附件、图片或业务结果已验证。

## 合集内来源

下列正文读取时 revision 均为1；引用章节描述结构来源，不表示所列业务结果已由本 Skill 实测。

| 来源ID | 文档 | 提炼内容 |
|---|---|---|
| AG-01 | [可研报告生成PRD V2.1（Agent精简版）](https://acnvzg8pa9yc.feishu.cn/wiki/XqN6wYgd7iHHWRkUpC2cSixAnWf) | 任务背景、流程、交互、全局上下文、各Agent输入／行动／输出、权限、评测与兜底 |
| AG-02 | [PRD-Linker AI v1.4.1](https://acnvzg8pa9yc.feishu.cn/wiki/PsxSw4Q4ci9TZOkRDXxcyfqnn0c) | 场景、工具链、节点职责、数据需求、输出与异常；原文版本讨论先分离 |
| EV-01 | [可研报告生成Agent评测方案V4](https://acnvzg8pa9yc.feishu.cn/wiki/EWFuwTBfdiUZwEk3gIecs1M2nFd) | 目标、标准、样本、重复运行、程序检查、归因与报告 |
| EV-02 | [Linker Agent工业数字员工评测体系](https://acnvzg8pa9yc.feishu.cn/wiki/PCnawLrpIixptikZQM6c1yGrnge) | 任务完成、效率、多步骤协作、异常、人机协作与上线决定 |
| EV-03 | [可研报告生成Agent评测报告V1](https://acnvzg8pa9yc.feishu.cn/wiki/MffjwZ0Z4ie3lOkpRlicTN58nuf) | 实际案例、失败证据、归因、改进；不继承其分数 |
| EV-04 | [Linker评测集](https://acnvzg8pa9yc.feishu.cn/wiki/D7TFwHLeZiPxnCkJxGzc9D51n2v) | 表格revision 0；检查4个工作表各A1:T12，提炼类别、样本类型、问题、输出、测试点、成功、评分、截图及流程检查 |
| RG-01 | [稻茄智农 Graph RAG方案](https://acnvzg8pa9yc.feishu.cn/wiki/SdtJwotDXihHnhkA21xc0yPvnDh) | 离线／在线链路、节点输入输出、组件与系统评测；原文选型待修改、Top-K衔接不一致，模板改用显式参数关系 |
| RG-02 | [Rag数据库构建策略](https://acnvzg8pa9yc.feishu.cn/wiki/AzrmwUKdqi3JIokItPtcusfdnTh) | 业务数据结构、入库字段、处理策略、意图数据；商品特有字段不固化 |
| RG-03 | [立项&RAG](https://acnvzg8pa9yc.feishu.cn/wiki/JaE0wmv7cijfl3kl9dqcf5Thnld) | 业务需求到知识库、数据处理与客户约束；平台操作按项目适配 |
| RG-04 | [RAG效果测试操作文档](https://acnvzg8pa9yc.feishu.cn/wiki/ELwSwlcCSiR5Qpk1ZVqccK07nA9) | 入库、模型配置、问答测试的可复现记录 |
| RG-05 | [表名为Agent评测的召回记录](https://acnvzg8pa9yc.feishu.cn/wiki/DdknwYTuKi3rcsky2A8cNmEanBg) | 表格revision 0，检查A1:T12；实际字段为预期匹配、召回、排序、原因、方案，按召回测试复用 |
| GC-01 | [AIGC图文笔记裂变PRD](https://acnvzg8pa9yc.feishu.cn/wiki/FG7lwFlRqifzuhk0vEUctmcOnQg) | 素材输入、图片／文案Pipeline、采纳、审核、上下文、评测、埋点 |
| GC-02 | [雾象](https://acnvzg8pa9yc.feishu.cn/wiki/YZmfwLI1DiHLHZk3EgWc2Mwinhf) | 文本到动画、旁白字幕、编辑、产物与任务状态；不固化技术栈和排期 |
| GC-03 | [AI播客项目文档](https://acnvzg8pa9yc.feishu.cn/wiki/AubjwIajziHDAbk7f5Kc8M9inOW) | 脚本到音频、节点协议、时长与声音质量、交付与兜底 |
| GC-04 | [05 评测集、Badcase与验收](https://acnvzg8pa9yc.feishu.cn/wiki/CZ4ywBSM8icCYYk8Z7vcx5tknbh) | 约束正确性、专业质量、业务可用性、评审分歧、失败归因 |
| GC-05 | [04 AI方案、模型与数据治理](https://acnvzg8pa9yc.feishu.cn/wiki/KGXhway7liIDy9kitRKcttXdnQb) | 工作流／Agent／Prompt／RAG分工，节点字段、Prompt版本、调优与回退 |
| OP-01 | [06 数据指标与埋点方案](https://acnvzg8pa9yc.feishu.cn/wiki/UQGrwtDaMiEU9Ikk1nscan1OnBh) | 业务问题、指标口径、事件触发、属性、维度、基线与实际 |
| OP-02 | [Globe Cubie PRD](https://acnvzg8pa9yc.feishu.cn/wiki/LMKXwKSx5iF5xNkkyb8caFHFnUq) | 交互、埋点、报表与看板、日志、告警与回退 |
| PM-01 | [项目对接明细表](https://acnvzg8pa9yc.feishu.cn/wiki/XpF0wrwVXizMlOkzjqkcqEGEnqg) | 表格revision 0，检查A1:T12；阶段、模块、工作、输出物、责任方、预期／结束时间、状态 |
| PM-02 | [07 项目计划与研发协作](https://acnvzg8pa9yc.feishu.cn/wiki/DrX4wSnw8irJ5wkIGmlcZlscnHd) | 里程碑、责任、接口、风险、决策日志 |
| PM-03 | [国华氢能智能体需求确认书](https://acnvzg8pa9yc.feishu.cn/wiki/DnbzwV3ADiqxjVk5yKfcO8XWntg) | 需求范围与确认结构；影响分析、回归与交接字段为通用补充 |
| RS-01 | [市场调研&立项](https://acnvzg8pa9yc.feishu.cn/wiki/OKGHw8gDmiljKekyQ48cC3WCn1e) | 市场结构、人群差异、痛点、机会及产品建议；数字与结论需重新溯源 |

## 合集外补充与既有能力

| 来源ID | 来源 | 采用与限制 |
|---|---|---|
| EX-01 | [LOGO Design Agent需求文档](https://acnvzg8pa9yc.feishu.cn/wiki/CfSAwZIr8iibUjkKvxXcepU4noe) | 课程其他目录，revision 1；补充单Agent任务、流程、工具和提示词结构 |
| EX-02 | [Agents & Tools List_20250701](https://jawjngeach.feishu.cn/wiki/SaGCw8XCPiDUN2kX1aEcwhkenAd) | 合集外；读取表元数据及15个字段，未通读169条记录；借用Function_name、Task、模型、JSON链接、负责人、接入／使用状态 |
| LOCAL-01 | 既有QAQPM S5/S7/S8/S9及共享协议 | 保留范围、决策冻结、同源题集、运行证据、评测与开发交接机制 |
| LOCAL-02 | 本机既有ai-agent-prd-writer | 提炼角色、输入、行动、工具、输出、约束、全局上下文；删除固定环境路径和写作业务字段假设，使用本包内模板，不依赖该Skill运行 |
| CLASS-27 | 2026-11-10项目文档课堂、板书与笔记 | 49:17起Agent需求，51:47起RAG需求，54:46起AIGC评测，57:31起埋点／看板／多语言；文档按项目能力选用 |

## 新增设计的标注

- AIGC统一需求入口、运行记录通用键、成熟度与跨阶段引用属于本次适配设计，不冒称课堂原句。
- 多语言Key、行业调研、单功能分析、用户声音、用户Case与日报等模板结合课堂和既有方法提炼；未找到直接对应的合集空白模板时，明确标注。
- 未解析图片版“通用知识库设计”不作为已读正文依据；没有声称已找到全模态完整四件套。
- 模板不复制客户数据、Prompt全文、实验成绩或历史价格。遇到实际模型／平台选型，重新核验当前官方资料与本项目运行结果。

## 2026-11-14 补齐：四份独立模板与覆盖分类

本轮重新详细核对的是 2026-11-10 成功保存的 6 份原文快照（均 revision 1）：RS-01、PM-02、GC-04、EV-01、EV-03，以及 [Linker 根因分析 v1.5.1 评测报告](https://acnvzg8pa9yc.feishu.cn/wiki/I2OmwDdRji6NJhkgkw3cqQXSnze)（本轮记为 EV-05）。实时 CLI 读取被本机 Keychain 阻止，浏览器连接亦未成功，因此不声称远端已刷新；历史目录规模和版本可能已经变化。

| 新模板 | 原文结构依据 | QAQPM 的适配与边界 |
|---|---|---|
| 02-用户研究 | RS-01 二至五章的分群、痛点、替代方案与机会组织 | 将 S2 既有正文大纲独立化；增加假设、真实样本、执行记录、证据索引与中间层分流。未找到可直接照搬的同名空白模板 |
| 00-项目索引 | PM-02 一、二章的交付物、退出条件、责任 | 六节结构来自既有总控协议；权威根、已决／待证与阶段状态引用为 QAQPM 适配。未读取“项目 one page”正文，不将其标题冒充依据 |
| 已确认决策表 | PM-02 五章的日期、问题、备选、证据、决定与取舍、复查 | 增补确认依据、写入站、冲突、替代关系和回写核对，继承共享交接协议；决策事实与效果假设分开 |
| Bad-case记录 | GC-04 五至六章的类型／严重度／版本／归因／修复／回归；EV-03 二至四章的轨迹、复测与新增问题；EV-05 的分层归因 | 补复现、证据、实际版本、关闭依据和非 AI 问题；多维表镜像、S7 评审新题集、S10–S12 同台账来自既有 QAQPM 规则 |

EV-01 的评测目的与版本记录用于交叉核对，不直接搬用固定题数、重复次数或“所有线上 case 自动进黄金集”的规则。业务成绩、客户数据、专属阈值与全文 Prompt 不进入新模板。

本轮还将既有规则要求回填至相关模板：S1/S4/S6/S7 增人话交接，S5 调整交接顺序、S9 补早期验证返回入口，S6 补条件适用的作品证据链和架构／验证引用，S11 补功能用例前置、实际、阻塞、需求、执行记录与飞书对账字段。它们是既有规则的一致性修正，不新增站点或审批流程。

资源计数与深度见 [文档资源类型与覆盖](document-resource-guide.md)：独立模板按有效 Markdown 文件计，章节骨架另标深度；CSV配套和旧名跳转不算独立模板，正文大纲和共享规则单列。
