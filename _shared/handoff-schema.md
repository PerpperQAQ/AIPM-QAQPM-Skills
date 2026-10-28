# QAQPM 交接区 Schema

> 借鉴 chusimin/AIPM-Skills 的 BRD→MRD handoff；字段名中英并列，YAML 块挂在每份主交付物文末。  
> 总控与下一站**只读交接区**继承，禁止重复盘问已确认事实。

## 通用 YAML 模板

```yaml
qaqpm_handoff:
  schema_version: "1.0"
  project: ""                 # 项目短名
  station: "S1"               # 当前完成站：S1–S12
  station_name: "问题定义"
  updated_at: ""              # Asia/Shanghai ISO 本地时间
  decision_tier: null         # 仅 S6 必填：go | conditional | no-go | defer
  documents:
    - path: "01-问题定义卡.md"
      role: primary
  facts_confirmed: []         # 已确认【事实】摘要，每条可带 source
  inferences: []              # 关键【推断】
  open_questions: []          # 【待确认】与核实方法
  assumptions: []             # 仍在用的假设及验证计划
  next_station: "S2"          # 建议下一站
  next_entry: ""              # 下一站入口提示（一句话）
  blockers: []                # 阻塞下一站的条件
  html_reports: []            # reports/*.html 路径
  eval_refs: []               # eval/ 相关路径（S7 起）
  labels_policy: "必须使用【事实】【推断】【待确认】；见 _shared/labels.md"
```

## 分站增量字段

| 站 | 额外字段 |
|---|---|
| S1 | `problem_one_liner`, `ai_fit: yes\|no\|partial\|tbd`, `scene_elements` |
| S2 | `research_methods: [A-H]`, `evidence_strength: high\|mid\|low`, `quotes_index_path` |
| S3 | `backlog_count`, `p0_ids: []` |
| S4 | `diff_one_liner`, `competitor_types_covered: []`, `counter_argument_done: bool` |
| S5 | `mvp_must: []`, `mvp_wont: []`, `pass_fail_criteria` |
| S6 | `decision_tier`, `stop_loss`, `teardown_appendix_path`, `verify_calendar` |
| S7 | `eval_goal`, `dimensions: []`, `gold_set_v0_path`, `gate_rules_draft` |
| S8 | `shared_decision_pack_frozen: bool`, `prd_dir`, `agent_spec_dir` |
| S9 | `poc_verdict: pass\|fail\|conditional`, `tech_map_html`, `model_choice` |
| S10 | `scope_drift: []`, `regression_eval_runs: []` |
| S11 | `func_test_pass: bool`, `ai_eval_pass: bool`, `gate_result` |
| S12 | `release_mode: gray\|ab\|full`, `backflow_to_backlog: []` |

## 继承规则

1. 下一站开场：读 `00-项目索引.md` + 上一站交接区。
2. `facts_confirmed` 不得被下一站改写成【推断】；若发现矛盾，标回流并退回对应站。
3. S6 前必须：`problem_one_liner` 非空 + S2 `evidence_strength` 至少 mid（或高强一种），否则总控拦截立项。
4. S8 写验收标准时必须引用 S7 `gate_rules_draft` / `gold_set_v0_path`，禁止空写「效果要好」。
