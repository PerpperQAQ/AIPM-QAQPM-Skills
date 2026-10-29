# QAQPM 交接区 Schema

> Changelog 2026-10-29：正文必有「接手后第一步」人话；YAML 仅附录；补正反例；虚路径须 `provisional`。  
> 借鉴 chusimin/AIPM-Skills 的 BRD→MRD handoff；字段名中英并列。  
> 总控与下一站**只读交接区**继承，禁止重复盘问已确认事实。

## 0. 给人读（强制，写在 YAML 之前）

每份主交付物正文交接区**必须先**有人话块，再附 YAML。读者应能不看 YAML 就知道下一步。

```markdown
## 交接（给人）

**接手后第一步**：<一句可执行动作，例如「打开 research/已确认决策表.md，核对访问入口是否已写入 05/06」>

| 项 | 内容 |
|---|---|
| 本站刚确认 | <仅本站新增，1–5 条> |
| 下一站建议 | S? · <入口一句话> |
| 未完成／阻塞 | <无则写「无」> |
```

### 正例

**接手后第一步**：把 `用户-场景-需求` 表里已拆成可执行动作的 3 条写入飞书需求池待评估视图，并回写 `03` 镜像行数。

### 反例（禁止）

- 正文只有大段同质 YAML，无人话下一步。  
- 「接手后第一步：继续推进」——无对象、无动作。  
- 把 S1–S5 已写过的同一句底座推断再贴进本站 `inferences`。

## 1. 附录：通用 YAML 模板

YAML 挂在人话交接区**之后**（可折叠／标注「附录 · 给 Agent」）。禁止把 YAML 当作正文唯一交接。

```yaml
qaqpm_handoff:
  schema_version: "1.0"
  project: ""                 # 项目短名
  station: "S1"               # 当前完成站：S1–S12
  station_name: "问题定义"     # 展示名可用「原始需求与问题定义」
  updated_at: ""              # Asia/Shanghai ISO 本地时间
  decision_tier: null         # 仅 S6 必填：go | conditional | no-go | defer
  documents:
    - path: "01-问题定义卡.md"
      role: primary
  facts_confirmed: []         # 仅本站新增【事实】
  inferences: []              # 仅本站新增【推断】
  open_questions: []          # 【待确认】与核实方法
  assumptions: []             # 仍在用的假设及验证计划
  next_station: "S2"
  next_entry: ""              # 与正文「接手后第一步」同义摘要
  blockers: []
  html_reports: []
  eval_refs: []
  labels_policy: "必须使用【事实】【推断】【待确认】；见 _shared/labels.md"
```

## 2. 分站增量字段

| 站 | 额外字段 |
|---|---|
| S1 | `problem_one_liner`, `ai_fit: yes\|no\|partial\|tbd`, `scene_elements` |
| S2 | `research_methods: [A-H]`, `evidence_strength: high\|mid\|low`, `quotes_index_path`, `user_scene_need_rows`, `pending_eval_count`, `written_to_s3: bool` |
| S3 | `backlog_count`, `p0_ids: []`, `mirror_row_count`, `bitable_row_count` |
| S4 | `diff_one_liner`, `competitor_types_covered: []`, `counter_argument_done: bool` |
| S5 | `mvp_must: []`, `mvp_wont: []`, `pass_fail_criteria` |
| S6 | `decision_tier`, `stop_loss`, `teardown_appendix_path`, `verify_calendar` |
| S7 | `eval_goal`, `dimensions: []`, `gold_set_v0_path`, `gate_rules_draft`, `storage_mode`, `eval_bitable_url`, `eval_md_mirror_path` |
| S8 | `shared_decision_pack_frozen: bool`（语义＝立项决策一页纸是否冻结）, `prd_dir` 或 `prd_path`, `agent_spec_dir` 或 `agent_spec_path`, `decision_one_pager_path` |
| S9 | `poc_verdict: pass\|fail\|conditional`, `tech_map_html`, `model_choice` |
| S10 | `scope_drift: []`, `regression_eval_runs: []`, `bad_case_bitable_url`, `bad_case_md_mirror_path` |
| S11 | `func_test_pass: bool`, `ai_eval_pass: bool`, `gate_result`, `func_case_bitable_url`, `func_case_md_mirror_path` |
| S12 | `release_mode: gray\|ab\|full`, `backflow_to_backlog: []` |

## 3. 继承规则

1. 下一站开场：读 `00-项目索引.md` 人话开篇 + 上一站「接手后第一步」+ 附录 YAML。  
2. `facts_confirmed` 不得被下一站改写成【推断】；若发现矛盾，标回流并退回对应站。  
3. S6 前必须：`problem_one_liner` 非空 + S2 `evidence_strength` 至少 mid（或高强一种），否则总控拦截立项。  
4. S8 写验收标准时必须引用 S7 `gate_rules_draft` / `gold_set_v0_path`，禁止空写「效果要好」。

## 4. 反同质化（强制）

1. `facts_confirmed` / `inferences` **只写本站新确认或本站首次固化的条目**；跨站已有结论用 `inherits: ["S1","S5"]` 引用，禁止十余份 YAML 复读同一句底座推断。  
2. 总控抽检：若连续 ≥3 份子文档的 `inferences` 文本重复率目测 >50%，打回重写交接区。  
3. **虚路径**：声明的路径（如 `quotes_index_path`、`gold_set_v0_path`、`decision_one_pager_path`）必须真实存在；否则显式写 `provisional: true` 与暂代位置，且列入 `blockers`。总控抽检发现「声明有、磁盘无」且无 `provisional` → 交接区不合格。

## 5. 飞书增量字段（启用飞书协议时）

| 站 | 额外字段 |
|---|---|
| 总控/S3/S7 | `storage_mode: local\|feishu`, `feishu_wiki_url`, `backlog_bitable_url`, `backlog_md_mirror_path`, `eval_bitable_url`, `eval_md_mirror_path` |
| S10 | `bad_case_bitable_url`, `bad_case_md_mirror_path` |
| S11 | `func_case_bitable_url`, `func_case_md_mirror_path`（与评测集分表） |
| S8 | 若 `shared_decision_pack_frozen: false`，索引必须红字「立项决策一页纸未冻」；禁止把 PRD 标为终稿完成 |

## 6. 已确认决策表（总控 Phase 1）

长对话 / 多线程立项时，总控须先产出或更新 `research/已确认决策表.md`（列：收敛结论｜标签｜来源｜写入站），并产出人类可读 **立项决策一页纸**（可 `frozen=false`）。无决策表或缺执行位置／底座／不做／访问入口 → **禁止**宣称 S1–S6 文档包已齐。
