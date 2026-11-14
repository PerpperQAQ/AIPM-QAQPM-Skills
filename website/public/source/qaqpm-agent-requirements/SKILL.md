---
name: qaqpm-agent-requirements
description: >-
  QAQPM 产品Agent需求编写：从S5 MVP方案启动，或单独补写Agent任务、节点协作、Tool List、Prompt与上下文；S8继续细化同一文档。适用于产品里的工具调用与自主任务能力，编码Agent开发约定仍由S8负责。
---
# QAQPM · Agent需求

先读 [_shared/ai-document-protocol.md](_shared/ai-document-protocol.md)。此能力从 S5 启动，也可独立调用；不是新阶段，不自行推进立项或开发。

## 工作方式

1. 继承当前需求、MVP范围、流程、已确认决定和现有文档。确定本轮是 `mvp_draft` 还是 `development_ready`，已有路径继续更新。
2. 还原一个真实任务从输入到可用交付的主路径，判断哪里确需自主判断、工具选择或协作。固定流程可以保持工作流，不硬拆成多个Agent。
3. 根据任务选择下列模板；先完成用户任务、输入输出、职责、主要流程和关键假设，再补实现字段。缺信息时保留具体待确认项及影响，不套用案例业务规则。
4. 每个节点核对输入来源、输出去向、状态转换和失败处理；Tool List 分开接入状态、使用状态与验证证据。Prompt依据业务规则生成，角色描述不能替代执行与完成标准。
5. 评测标准、题集、运行Case与分析引用 S7；模型选型引用 S9。S5关键假设可提前交S7/S9验证，返回原站；不编写未发生的测试结果。
6. 更新能力清单中的真实路径、成熟度和待证事项；正文交接说明接手后第一步。用户只补一份文档时只完成该范围，不要求补全生命周期。

## 模板与读取条件

| 模板 | 何时使用 |
|---|---|
| [Agent需求.md](templates/Agent需求.md) | 每个实际Agent能力的主文档；小项目可合订其余内容 |
| [节点与协作.md](templates/节点与协作.md) | 多步骤、工具编排、状态传递或多Agent协作 |
| [Tool-List.md](templates/Tool-List.md) | 有工具、外部API或可执行动作 |
| [Prompt与上下文.md](templates/Prompt与上下文.md) | 编写／调整Prompt、输入变量、共享事实或记忆 |

结构来源：AG-01/02、EX-01/02、LOCAL-02，见 [来源与提炼说明](_shared/document-template-sources.md)。按任务阅读相关模板，不一次加载全部实例。

## 交付检查

- 任务目标、用户可用交付和完成标准彼此对应；含改需求、取消、失败等实际分支。
- 节点与工具调用有明确输入输出，权限与人工决策点适合该业务。
- 上下文区分用户提供、外部证据、系统推断和已确认事实；冲突规则、生命周期和版本明确。
- 有模型与Agent两个评测对象的适用说明；链路中断与无产物运行不能遗漏。
- S5首稿可待选技术；开发交接版的关键字段不能用空标题代替。外部模板数字不自动变成本项目门槛。

交接可补：`ai_document_index_path`、`capability_ids`、`document_maturity`、`eval_object_refs`、`return_station`。均为现有交接的可选增量；不声明未创建路径。
