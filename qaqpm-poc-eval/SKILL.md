---
name: qaqpm-poc-eval
description: QAQPM POC 选型站：初筛→精筛→对比→主辅模型；冻结评测集比对候选；ToB/平台约束与 RAG 调优实验入口；产出仿 Archify 技术链路 HTML。
---

# QAQPM-POC选型（S9）

笔记锚点：day13 POC·原型·MVP；day16 RAG/平台选型；day17 选型评测；飞书模型 List／国华选型；架构 §7.2 Archify。

## 1. 何时用 / 何时不用
**用**：验证关键能力成本与质量；输出技术链路演示。  
**不用**：替代完整开发（S10）；替代准入评测报告（S11）。S5 后插队仅出**草案**，正式结论仍在本站。

## 2. 上游依赖
S5 关键假设、**S7 黄金集（至少 v0）与门禁草案**、S8 技术栈草稿（可回写）。

## 3. 目标与通过线
- 选型四步：**初筛 → 精筛 → 对比 → 主／辅模型**。  
- 初筛字段对齐模型 List schema（计费维度、单价、溯源 URL）；不整表搬价。  
- 冻结同一批样本；一次尽量只改一个主变量（day17）。  
- 产出：POC 结论、选型建议、是否缩 MVP、失败归因、技术链路 HTML。

## 4. 引导流程
| Phase | 内容 |
|---|---|
| P0 | 关键能力、失败代价、ToB/政策约束 |
| P1 | 冻结评测子集（从 **S7** 抽）与通过线 |
| P2 | **初筛表**（`model-list-schema.md`） |
| P3 | 精筛跑测；记录分项、GSB、成本 |
| P4 | 定主／辅；平台选型（现成 vs 框架） |
| P5 | （RAG）调优实验入口：切分／Top-K／混合权重／重排阈值 |
| P6 | 写组件表（含 rag-offline/online 分组）→ HTML |
| P7 | 交接；fail → S5/S6 |

## 5. 方法与模板
- `templates/09-POC与选型.md`
- `references/model-list-schema.md`
- `references/tob-platform-tuning.md`
- `references/skill-eval-notes.md`
- `references/tech-map-skeleton.html`
- `_shared/archify-tech-map.md`
- 评测维表／蒙对／报告四行 → **交叉 S7**，本站不另发明标准

## 6. 输出大纲
必填：初筛表、候选、样本说明、结果表、成本、主辅结论、组件表、HTML 路径。  
选填：调优实验日志、序列图、Skill 调用稳定性。

## 7. 证据规则
不编造单价；查不到标【待确认】只给公式。不可一边给 A 多次挑最好、一边只取 B 首次。国华 POC 数字标【飞书原文示例】。

## 8. HTML
默认产出 `09-技术链路.html`。POC 报告可用 `reports/09-POC.html`。

## 9. 自检
- [ ] 初筛含计费维度与溯源 URL
- [ ] 样本冻结且引用 S7
- [ ] 主／辅模型写清降级
- [ ] HTML 与 MD 组件一致、可离线开
- [ ] ToB 项目写了国产化／私有化结论或【待确认】

## 10. 交接区
`poc_verdict`, `tech_map_html`, `model_choice`, `backup_model`, `next_station`→S10（fail 则 S5/S6）

## 11. 回流
不通过 → S5 砍范围或换方案 → 必要时 S6 改档位；指标争议 → S7。
