# AIPM-QAQPM-Skills

面向 AI 产品经理的 **QAQPM / AIPM 全流程 Skill 体系**：从问题定义、用户研究、需求池、竞品、MVP、立项（含五层五问拆解），到评测与测试集、双轨 PRD、POC 选型、开发推进、验收、上线观察。

展示名一律 `QAQPM-…`，Skill id 一律 `qaqpm-…`。

## 组成

| 部分 | 说明 |
|---|---|
| `qaqpm-product-lifecycle` | 总控：定站、路由、项目索引、HTML 壳 |
| `qaqpm-problem-define` … `qaqpm-launch-observe` | 主链 12 站（S1–S12） |
| `_shared/` | 标签、交接 schema、调研菜单、HTML / Archify 约定、示例索引 |

主链顺序：`S1→S2→S3→S4→S5→S6→S7→S8→S9→S10→S11→S12`  
立项通过后默认下一站为 **S7 评测与测试集**；拆解并进立项（S6），无独立旁路。

## 怎么用

1. 把各 `qaqpm-*` 目录装进你的 Agent Skill 目录（需含同目录下的 `templates/`、`references/`，以及复制一份 `_shared/` 到该 Skill 内，因正文用相对路径 `_shared/...`）。
2. 优先调用总控 `qaqpm-product-lifecycle`，或直接调用单站。
3. 需要可视化报告时说「生成 HTML」；需要技术链路时说「技术链路 HTML」。

更完整的架构说明见 [ARCHITECTURE.md](./ARCHITECTURE.md)。

## 许可

MIT（见 [LICENSE](./LICENSE)）。课件原文与飞书私有材料未收录；Skill 内示例均为脱敏结构示例。

## 来源说明

结构对齐且曼 AIPM 课程框架与实践笔记，并吸收公开课件中的文档框架（评测六步、需求池字段、双轨交付等）。与个人日记、未授权商业全文无关。
