// Verified architectural and usage reference data derived from QAQPM SKILL.md and _shared/ protocols.

export const architectureLayers = [
  {
    level: 'L1',
    name: '调度总控层',
    count: '1 个总控 Skill',
    role: '入口判断、上下文继承、路由调度与权威对账',
    summary: '面对新想法、长对话或跨会话续做时，总控先扫描项目根目录与文末交接区，判断当前所处阶段并维护 00-项目索引.md 与立项决策一页纸，绝不越权代替子 Skill 写完整长稿。',
    items: [
      { label: 'CTRL · 产品全流程', code: 'CTRL', path: 'qaqpm-product-lifecycle/SKILL.md' },
    ],
    artifacts: ['00-项目索引.md（六节开篇）', 'research/已确认决策表.md', '立项决策一页纸.md'],
  },
  {
    level: 'L2',
    name: '主链 12 站（三大阶段）',
    count: '12 个独立站 Skill',
    role: '编号表示职责边界与交接顺序，而非机械串行',
    summary: '按「发现与判断 S1–S4」「方案与决策 S5–S8」「验证与交付 S9–S12」分层。支持 S1↔S2 双入口、S5 提前触发 S7/S9 验证，以及 S11/S12 向 S3/S7/S10 定向回流。',
    items: [
      { label: 'S1–S4 发现与判断', code: 'S1', path: 'qaqpm-problem-define/SKILL.md' },
      { label: 'S5–S8 方案与决策', code: 'S5', path: 'qaqpm-mvp-scope/SKILL.md' },
      { label: 'S9–S12 验证与交付', code: 'S9', path: 'qaqpm-poc-eval/SKILL.md' },
    ],
    artifacts: ['01–12 各站主交付物', 'research/ 原始研究记录', 'eval/ 评测题集与跑次', '08-PRD/ + 08-Agent规范/'],
  },
  {
    level: 'L3',
    name: '可组合 AI 专题与跨站专项',
    count: '3 个 AI 模块 + 1 个跨站专项',
    role: '按产品真实能力按需挂载，不新增阶段编号',
    summary: 'Agent、RAG、AIGC 三个需求模块在 S5 启动首稿（mvp_draft），S8 沿用同一文件与能力 ID 细化到开发交接版（development_ready），也可在已有项目中单独调用；RISK 跨站专项专门梳理会改变架构或产品承诺的核心技术难题。',
    items: [
      { label: 'AGENT · 任务与工具', code: 'AGENT', path: 'qaqpm-agent-requirements/SKILL.md' },
      { label: 'RAG · 知识与检索', code: 'RAG', path: 'qaqpm-rag-requirements/SKILL.md' },
      { label: 'AIGC · 生成与编辑', code: 'AIGC', path: 'qaqpm-aigc-requirements/SKILL.md' },
      { label: 'RISK · 核心技术难题', code: 'RISK', path: 'qaqpm-tech-risk-review/SKILL.md' },
    ],
    artifacts: ['ai/00-AI能力与文档清单.md', 'ai/agent · ai/rag · ai/aigc', '技术难题分析与最小验证'],
  },
  {
    level: 'L4',
    name: '共享协议与工程底座',
    count: '13 份共享规则 + 1 个开发流程仓库',
    role: '统一跨站纪律，打通文档决策与真实工程代码',
    summary: '仓库根 _shared/ 作为单一真相源，规范证据标签、交接 Schema、调研菜单、飞书四表对账与 HTML 报告壳；S10 经授权接入 QAQPMskill-idea-to-launch-kit，以阶段 0–5 与 kit.sh / verify.sh 衔接真实工程交付。',
    items: [
      { label: '证据标签规则', doc: '_shared/labels.md' },
      { label: '交接区 Schema', doc: '_shared/handoff-schema.md' },
      { label: 'AI 文档演进协议', doc: '_shared/ai-document-protocol.md' },
      { label: '开发仓库接入协议', doc: '_shared/development-kit-protocol.md' },
      { label: '飞书交付协议', doc: '_shared/feishu-doc-protocol.md' },
    ],
    artifacts: ['_shared/（安装时随每个 Skill 同级部署）', 'dev/开发接入.md + kit.sh 阶段 0–5', 'reports/*.html + 09-技术链路.html'],
  },
];

export const skillAnatomy = {
  folderTree: [
    { name: 'SKILL.md', role: '核心执行协议', desc: '按统一 11 节骨架编写，规定触发边界、Phase 引导、自检与交接字段' },
    { name: 'templates/', role: '可复用文档模板', desc: '字段模板、章节骨架或配套 CSV，全套共 84 个独立 Markdown 模板' },
    { name: 'references/', role: '方法论与脱敏案例', desc: '如五层五问拆解流程、评测维度菜单、AI Judge Prompt 与脱敏示例' },
    { name: '_shared/', role: '跨站共享规则副本', desc: '安装时从仓库根复制到每个 Skill 同级目录，确保相对路径解析有效' },
  ],
  sections: [
    ['01', '何时用 / 何时不用', '划清触发条件与禁区，防止误触发或越界替代其他站点'],
    ['02', '上游依赖', '指定先读哪些文档与交接区，做到继承事实、不重复盘问'],
    ['03', '目标与通过线', '明确本站要解决的核心问题与可核验的完成门禁'],
    ['04', 'Phase 引导流程', '分阶段推进、一次聚焦关键问题，已有材料自动跳过'],
    ['05', '方法与模板库', '索引本站专用方法、表单模板与参考案例路径'],
    ['06', '输出文档大纲', '区分必填与选填章节，明确主交付物与合订规则'],
    ['07', '证据与标签规则', '强制【事实｜推断｜待确认】及密度规，杜绝无源编造'],
    ['08', 'HTML 输出约定', '说明是否支持单文件自包含 HTML 报告或技术链路演示'],
    ['09', '自检清单', '交付前逐项核对，不把空壳模板或未跑实验当成通过'],
    ['10', '交接区字段定义', '人话「接手后第一步」+ 增量 YAML 字段供下一站继承'],
    ['11', '回流规则', '定义发现证据缺口、范围漂移或指标争议时的退回站点'],
  ],
};

export const stationMeta = {
  CTRL: {
    layer: 'L1 · 调度总控层',
    upstream: '扫描根目录 00-项目索引.md、各站文末交接区与已有代码/文档',
    handoffFields: 'current_station · decision_tier · blockers · storage_mode · kit_stage',
    carrier: '本地 MD / 飞书 Wiki 父节点 + 分享双 HTML 报告',
  },
  S1: {
    layer: 'L2 · 发现与判断',
    upstream: '原始想法、业务背景或 S2 已有调研线索（支持 S1↔S2 双入口）',
    handoffFields: 'problem_one_liner · ai_fit · scene_elements',
    carrier: '01-问题定义卡.md（本地 / 飞书文档）',
  },
  S2: {
    layer: 'L2 · 发现与判断',
    upstream: 'S1 问题假设（或作为首入口直接展开调研并回填 S1）',
    handoffFields: 'research_methods · evidence_strength · quotes_index_path · written_to_s3',
    carrier: '02-用户研究.md + research/ + 可选 HTML 报告',
  },
  S3: {
    layer: 'L2 · 发现与判断',
    upstream: 'S1 问题定义卡 + S2 原始研究与用户-场景-需求中间层',
    handoffFields: 'backlog_count · p0_ids · mirror_row_count · bitable_row_count',
    carrier: '飞书模式强制「需求池多维表」+ 本地 03-需求池.md 行数镜像',
  },
  S4: {
    layer: 'L2 · 发现与判断',
    upstream: 'S1–S3 核心任务与候选清单；单功能模式可直接读 S8 上下文',
    handoffFields: 'analysis_mode · diff_one_liner · experience_records_path · unverified_items',
    carrier: '普通文档（飞书不进多维表）+ 完整模式可选拆解 HTML',
  },
  S5: {
    layer: 'L2 · 方案与决策',
    upstream: 'S1–S4 证据、需求池与差异化；可提前挂载 Agent/RAG/AIGC 首稿',
    handoffFields: 'mvp_must · mvp_wont · ai_document_index_path · validation_plan_path',
    carrier: '05-MVP范围.md + ai/ 首稿（document_maturity: mvp_draft）',
  },
  S6: {
    layer: 'L2 · 方案与决策',
    upstream: 'S1 问题 + S2 高/中强证据 + S4 差异化 + S5 范围与早期验证结果',
    handoffFields: 'decision_tier · stop_loss · teardown_appendix_path · verify_calendar',
    carrier: '06-立项报告.md（含五层五问拆解模块）+ 可选 HTML 报告',
  },
  S7: {
    layer: 'L2 · 方案与决策',
    upstream: 'S5 关键假设（早期 feasibility）或 S6 档位与质量门槛（正式设计）',
    handoffFields: 'evaluation_purpose · gate_version · dataset_version · eval_bitable_url',
    carrier: '飞书模式强制「评测集多维表」+ eval/ 全字段镜像（设计 ≠ 跑分）',
  },
  S8: {
    layer: 'L2 · 方案与决策',
    upstream: 'S5 范围与专题首稿 + S6 决策 + S7 冻结标准 + 适用 S9 验证结论',
    handoffFields: 'shared_decision_pack_frozen · prd_dir · agent_spec_dir · delivery_target',
    carrier: '立项决策一页纸 + 08-PRD/ + 08-Agent规范/ + 原 ai/ 专题细化',
  },
  S9: {
    layer: 'L2 · 验证与交付',
    upstream: 'S5/S6 关键假设或 S8 技术细项 + S7 同源冻结样本与评分标准',
    handoffFields: 'poc_verdict · tech_map_html · model_choice · verified_scope',
    carrier: '09-POC与选型.md + eval/runs/ + 09-技术链路.html（Archify 风格）',
  },
  S10: {
    layer: 'L2 · 验证与交付',
    upstream: 'S8 PRD 与开发约定 + S7 标准 + S9 技术基线 + 已有代码目录',
    handoffFields: 'development_binding_path · kit_stage · candidate_version · bad_case_bitable_url',
    carrier: '10-开发推进记录.md + 开发仓库阶段 0–3 + 飞书 Bad case 多维表',
  },
  S11: {
    layer: 'L2 · 验证与交付',
    upstream: 'S7 冻结标准与题集 + S8 功能验收用例 + S10 候选版本与证据包',
    handoffFields: 'func_test_pass · ai_eval_pass · gate_result · func_case_bitable_url',
    carrier: '11-验收与评测报告.md + 飞书「功能验收用例多维表」（与评测集分表）',
  },
  S12: {
    layer: 'L2 · 验证与交付',
    upstream: 'S11 准入结论 + 发布授权 + 目标环境边界 + S8/S10 埋点口径',
    handoffFields: 'release_status · online_verification_status · telemetry_status · backflow_to_backlog',
    carrier: '12-上线观察.md + 开发仓库阶段 4–5 + eval/online/ 与回流记录',
  },
  AGENT: {
    layer: 'L3 · AI 需求模块（归属 S8）',
    upstream: 'S5 范围与任务链路（首稿）或 S8 PRD（细化）；也可在已有项目中单独调用',
    handoffFields: 'capability_ids · document_maturity · eval_object_refs · return_station',
    carrier: 'ai/agent/（Agent需求、节点与协作、Tool-List、Prompt与上下文）',
  },
  RAG: {
    layer: 'L3 · AI 需求模块（归属 S8）',
    upstream: 'S5 范围与知识源信息（首稿）或 S8 PRD（细化）；也可单独调用',
    handoffFields: 'capability_ids · document_maturity · eval_object_refs · return_station',
    carrier: 'ai/rag/（RAG需求与架构、知识来源与维护、数据处理与入库、检索与生成）',
  },
  AIGC: {
    layer: 'L3 · AI 需求模块（归属 S8）',
    upstream: 'S5 创作任务与模态边界（首稿）或 S8 PRD（细化）；也可单独调用',
    handoffFields: 'capability_ids · document_maturity · eval_object_refs · return_station',
    carrier: 'ai/aigc/（AIGC需求、任务与模态矩阵、生成与编辑流程、Prompt素材与参数）',
  },
  RISK: {
    layer: 'L3 · 跨阶段专项',
    upstream: '一条真实用户路径、现有方案、已知难点与当前证据（不强制前序文档）',
    handoffFields: '优先技术难题 · 失败分支 · 产品取舍 · 最小验证与返回站',
    carrier: '默认对话直接交付；整站推进时按需回写 S5 / S6 / S7 / S9',
  },
};

export const mechanismTabs = [
  { id: 'evidence', label: '证据三分法', short: '证据纪律', doc: '_shared/labels.md' },
  { id: 'handoff', label: '双层交接协议', short: '交接机制', doc: '_shared/handoff-schema.md' },
  { id: 'eval', label: '评测前置与分离', short: '评测体系', doc: 'qaqpm-eval-design/SKILL.md' },
  { id: 'dual-prd', label: '同源双轨 PRD', short: '双轨交接', doc: 'qaqpm-prd-dual/SKILL.md' },
  { id: 'research', label: '调研强度 A–H', short: '调研菜单', doc: '_shared/research-methods.md' },
  { id: 'workspace', label: '落盘、飞书与 HTML', short: '存储与报告', doc: '_shared/feishu-doc-protocol.md' },
];

export const evidenceCards = [
  {
    tag: '【事实】',
    tone: 'fact',
    alias: '别名：页面事实',
    meaning: '在页面、访谈原话、日志或真实跑次中直接可见且可核对的内容。',
    must: '必须附截图编号、原文链接、引文或数据口径与时间。',
    forbid: '严禁把宣传文案、AI 口述或未经核对的搜索摘要写成事实。',
  },
  {
    tag: '【推断】',
    tone: 'infer',
    alias: '别名：合理推断',
    meaning: '由 ≥1 条已确认事实合理推出的判断或技术反推。',
    must: '必须写明推理依据（「因为 A、B，所以……」）。',
    forbid: '严禁无依据的常识补全，或把推断直接当作已验证结论。',
  },
  {
    tag: '【待确认】',
    tone: 'tbd',
    alias: '别名：尚未确认',
    meaning: '目前查不到或尚未实测验证的假设、候选参数与风险点。',
    must: '必须写清核实方式（去哪查、跑什么实验、问谁）。',
    forbid: '严禁用待确认数字支撑立项「通过」档，未跑实验默认标 not_run。',
  },
];

export const ironRules = [
  { bad: '官方 README 写着支持多用户 → 写「我们已具备多用户」', good: '标【事实：文档记载】+【待确认：本环境未跑】，实测后才改判' },
  { bad: '评测/PoC 表还没运行 → 预填「通过 / 85% 达标」', good: '默认写 not_run + 【待确认】，结果列出现通过/失败必须附证据路径' },
  { bad: '飞书 CLI 返回写入成功 → 宣称飞书文档交付完成', good: '必须回读核对标题、多维表行数、链接与标签，未回读不得标通过' },
  { bad: '正文每个短句都贴【事实】造成阅读疲劳', good: '遵守「标签密度规」：页首证据边界条扛总纪律，正文按段末或表列标注' },
];

export const evalPurposeRows = [
  { purpose: 'feasibility', stage: 'S5 → S7 → S9 → S5/S6', goal: '早期可行性验证', boundary: '只验证核心高风险假设；小样本可行不等于产品验收通过' },
  { purpose: 'selection', stage: 'S9 PoC 与选型', goal: '模型 / 组件 / 底座横比', boundary: '固定样本与配置，尽量一次改一个主变量，保留失败与成本' },
  { purpose: 'iteration', stage: 'S10 开发推进', goal: '开发期回归与调优', boundary: '真实验证 API 与模型链路；缺 Key 标待验，不用 mock 顶替' },
  { purpose: 'acceptance', stage: 'S11 验收与评测', goal: '发布前正式准入', boundary: '功能测试与 AI 效果分开判定，综合分不得掩盖红线一票否决' },
  { purpose: 'online', stage: 'S12 上线观察', goal: '线上效果抽检与回流', boundary: '新 Bad case 先入 eval/online/，经 S7 评审后再合入新版黄金集' },
];

export const prdComparisonRows = [
  {
    name: '08-PRD/（正式 PRD）',
    owner: 'S8 · qaqpm-prd-dual',
    reader: '产品经理、业务方、设计、测试',
    focus: '为什么做、业务规则、角色与权限矩阵、异常与转人表、AI 做什么/不做什么/怎么验收（引用 S7）',
    misconception: '不能在《立项决策一页纸》未冻结（frozen=false）时标为终稿完成',
  },
  {
    name: '08-Agent规范/（开发与接口约定）',
    owner: 'S8 · qaqpm-prd-dual',
    reader: '编码 Agent（Codex / Cursor 等）与开发工程师',
    focus: '可执行的技术栈、信息架构、数据模型、API 接口、UI Tokens、状态与异常、不做清单、验收用例',
    misconception: '它是给「写代码的编码 Agent」读的工程规范，不是定义产品内部 Agent 行为的文档',
  },
  {
    name: 'ai/agent/（产品 Agent 需求）',
    owner: 'S5 首稿 → S8 细化 · qaqpm-agent-requirements',
    reader: '产品、AI 算法/工程、评测设计',
    focus: '产品内部的自主任务边界、节点协作、Tool List（权限与副作用）、Prompt 与上下文装配',
    misconception: '固定步骤的确定性工作流不需要硬拆多 Agent，按普通功能需求记录即可',
  },
];

export const researchMenuRows = [
  { code: 'A', method: '深度访谈', strength: '高', when: '可触达真实目标用户，挖最近一次真实事件（Mom Test）', template: 'A-深度访谈.md' },
  { code: 'B', method: '同任务走查 / 对照实验', strength: '高', when: '存在现有替代方案，直接观察完成任务卡点与耗时', template: 'B-同任务走查.md' },
  { code: 'C', method: '行为 / 日志分析', strength: '高', when: '已有可观测产品日志、漏斗或工单数据', template: 'C-行为日志分析.md' },
  { code: 'D', method: '社交原声采集', strength: '中', when: '方向探索阶段采集公开讨论与二手痛点信号', template: 'D-社交原声采集.md' },
  { code: 'F', method: '专家 / 老师访谈', strength: '中', when: '快速校正行业术语、边界约束与可行性假设', template: 'F-专家访谈.md' },
  { code: 'G', method: '竞品体验走查', strength: '中', when: '与 S4 联动，实操体验竞品并保留操作证据', template: 'G-竞品体验走查.md' },
  { code: 'E', method: '问卷调查', strength: '中低', when: '验证痛点频次与人群分布，不单独证明痛点真实', template: 'E-问卷.md' },
  { code: 'H', method: '桌面研究', strength: '中低', when: '建立市场/行业结构认知，禁止作为立项唯一依据', template: 'H-桌面研究.md' },
];

export const workspaceTree = [
  { path: '00-项目索引.md', station: 'CTRL', local: '项目全景（强制六节开篇：一眼看懂 / 证据边界 / 怎么工作 / 已决 vs 待证 / 交接路径 / 下沉站序）', feishu: '飞书 Wiki 父节点「00 项目全景」+ 本地镜像 + published-nodes.json 对账', doc: 'qaqpm-product-lifecycle/templates/00-项目索引.md' },
  { path: '立项决策一页纸.md', station: 'S8', local: '同源决策冻结卡（已决｜仍要证明），frozen=false 时顶栏红字提示', feishu: '飞书子文档「立项决策一页纸」+ 强制生成 reports/立项决策一页纸.html', doc: 'qaqpm-prd-dual/templates/立项决策一页纸.md' },
  { path: '01-问题定义卡.md / 02-用户研究.md', station: 'S1', local: '场景五要素、AI 适用性与调研原话索引，原始材料入 research/', feishu: '飞书普通子文档 + research/ 原始材料归档', doc: 'qaqpm-problem-define/templates/01-问题定义卡.md' },
  { path: '03-需求池.md', station: 'S3', local: '结构化需求池与痛点/证据追溯表（与用户-场景-需求中间层硬分隔）', feishu: '【硬规则】飞书「需求池多维表格」（三视图）+ 本地 03 全表只读镜像行数对齐', doc: 'qaqpm-requirements-backlog/templates/03-需求池.md', bitable: true },
  { path: '04-竞品分析.md / 06-立项报告.md', station: 'S4', local: '支持扫描 / 单功能 / 完整五层五问拆解；立项含止损条件与验证日历', feishu: '【硬规则】竞品分析仍用普通文档，不强制进多维表；立项可附拆解 HTML', doc: 'qaqpm-competitor-analysis/templates/04-竞品分析.md' },
  { path: '05-MVP范围.md + ai/{agent,rag,aigc}/', station: 'S5', local: '首版闭环、must/wont、AI 能力清单与适用专题首稿（S8 原地细化）', feishu: '飞书长文文档按能力合订或分文档；Tool List / 知识台账可复用 Base', doc: 'qaqpm-mvp-scope/templates/05-MVP范围.md' },
  { path: '07-评测设计与测试集.md + eval/', station: 'S7', local: '评测标准、黄金集 v0、运行 Case 记录结构（runs/ 与 gold/ 分离）', feishu: '【硬规则】飞书「评测集多维表格」（三视图）+ 本地 eval/ 全字段镜像对齐', doc: 'qaqpm-eval-design/templates/07-评测设计与测试集.md', bitable: true },
  { path: '08-PRD/ + 08-Agent规范/', station: 'S8', local: '面向人阅读的正式 PRD + 面向编码 Agent 的开发与接口约定', feishu: '飞书正式 PRD 文档 + 编码规范本地/仓库同源维护', doc: 'qaqpm-prd-dual/SKILL.md' },
  { path: '09-POC与选型.md + 09-技术链路.html', station: 'S9', local: '真实跑次比较、主辅方案与自包含可交互技术链路 HTML（仿 Archify）', feishu: '飞书选型报告 + 离线可分享单文件 HTML 架构演示', doc: 'qaqpm-poc-eval/templates/09-POC与选型.md' },
  { path: '10-开发推进记录.md + dev/', station: 'S10', local: 'dev/开发接入.md 绑定开发流程仓库阶段 0–5 与 Bad case 台账', feishu: '【硬规则】飞书「Bad case 多维表格」+ 工程证据保留在开发仓库并记录引用', doc: 'qaqpm-dev-track/templates/10-开发推进记录.md', bitable: true },
  { path: '11-验收与评测报告.md / 12-上线观察.md', station: 'S11', local: '功能测试 ≠ AI 评测双栏准入；上线验证埋点与线上样例入 eval/online/', feishu: '【硬规则】飞书「功能验收用例多维表格」（与评测集分表）+ 本地镜像对齐', doc: 'qaqpm-acceptance/templates/11-验收与评测报告.md', bitable: true },
  { path: 'reports/*.html', station: 'CTRL', local: '单文件零依赖离线 HTML 报告壳，带【事实｜推断｜待确认】一键筛选与打印友好样式', feishu: '飞书 / 对外分享项目默认强制产出 00-项目全景.html 与 立项决策一页纸.html', doc: '_shared/html-report-shell.md' },
];

export const usagePlaybooks = [
  {
    id: 'orchestrator',
    badge: '最推荐 · 全流程导航',
    title: '用总控开局，一步步收敛到立项与交付',
    when: '手里只有一个产品想法、老板一句话，或者拿不准该先做调研、竞品还是写文档。',
    turns: [
      { step: '01', title: '你发起任务', detail: '调用 $qaqpm-product-lifecycle，说明你的业务背景、本轮目标（例如先走到立项或 MVP），以及文档放本地还是飞书。' },
      { step: '02', title: '总控先问清再路由', detail: '总控按 Phase 0–1 扫描目录，确认新项目/续做、存储模式与缺口；自动路由到 S1 问题定义或 S2 用户研究（支持双入口）。' },
      { step: '03', title: '子 Skill 落盘与打标', detail: '子 Skill 一次聚焦关键问题引导你补齐场景与证据，产出带【事实｜推断｜待确认】标签的文档与文末交接区。' },
      { step: '04', title: '更新全景索引进入下一站', detail: '总控更新 00-项目索引.md（六节开篇）并给出下一站建议；高风险假设可在 S5 提前拉起 S7/S9 验证再回 S5/S6。' },
    ],
    prompt: `$qaqpm-product-lifecycle\n我想做一个面向内部员工的企业知识问答助手，目前只有初步想法。\n文档先保存在本地项目目录，本轮希望推进到 S5 MVP 方案并识别需要提前验证的风险。\n请先确认我的起点并推荐第一步。`,
  },
  {
    id: 'single-module',
    badge: '高频 · 单点切入',
    title: '直接点名单站、AI 专题或技术难题梳理',
    when: '已有成熟项目或 PRD，只想补写 RAG/Agent/AIGC 需求、做一次竞品深度拆解，或排查会被坑的技术难题。',
    turns: [
      { step: '01', title: '直接点名对应 Skill', detail: '无需走总控建档，直接调用 $qaqpm-rag-requirements、$qaqpm-competitor-analysis 或 $qaqpm-tech-risk-review。' },
      { step: '02', title: '继承现有材料限定范围', detail: 'Agent 读取你指定的已有 PRD、代码或资料路径，只针对本次范围工作，不会逼你补写 S1–S6 历史文档。' },
      { step: '03', title: '原地演进或对话交付', detail: 'AI 专题沿用原路径与能力 ID 补全字段；核心技术难题默认在对话里直接输出优先难题、取舍与最小验证。' },
      { step: '04', title: '诚实标注边界与返回点', detail: '缺失的关键信息保留【待确认】与核实方法，不把单份文档完成夸大为整站通过，清晰写明返回哪一站。' },
    ],
    prompt: `$qaqpm-tech-risk-review\n我们正在做企业知识问答助手，已知难点是检索准确率。\n请结合「文档权限变更、制度多版本冲突、答案出处引用」这条用户路径，帮我梳理除了准确率之外还会改变产品承诺的核心技术难题、产品取舍和最小验证方案。`,
  },
  {
    id: 'resume',
    badge: '零失忆 · 跨会话续做',
    title: '新开对话窗口，无缝续接上周的进度',
    when: '换了新会话、换了协作人，或经历了很长的多轮头脑风暴，不想重新解释已定决策。',
    turns: [
      { step: '01', title: '指出项目目录并唤起总控', detail: '新窗口中调用 $qaqpm-product-lifecycle，告知项目根目录路径（或飞书知识库入口）和今天要推进的目标。' },
      { step: '02', title: '自动读取索引与交接区', detail: 'Agent 优先读取 00-项目索引.md、上一站人话「接手后第一步」与 YAML 交接区，直接继承 facts_confirmed。' },
      { step: '03', title: '长对话先抽决策表防跑偏', detail: '若来自长对话或多线程讨论，总控先收敛 research/已确认决策表.md 与《立项决策一页纸》，暴露未冻结缺口。' },
      { step: '04', title: '零重复盘问继续推进', detail: '已确认事实不再反复追问；直接从 blockers 或建议下一站继续工作，收尾再次核对权威根与镜像行数。' },
    ],
    prompt: `$qaqpm-product-lifecycle\n这是续做项目，项目目录在 ./docs/kb-assistant/。\n请先读取 00-项目索引.md、已有交接区和 research/已确认决策表.md，总结当前进度、未冻结项和 blockers，并告诉我接手后的第一步。`,
  },
  {
    id: 'dev-kit',
    badge: '工程落地 · S10–S12',
    title: '从已确认 PRD 接入开发仓库，跑通验证与上线',
    when: 'S8 PRD 与 S7 评测标准已就绪，准备让编码 Agent 按阶段落地代码、自检并交付验收。',
    turns: [
      { step: '01', title: '确认授权拉取开发仓库', detail: '调用 $qaqpm-dev-track；Agent 先查现有代码与 PRD，说明用途与存放路径，经你确认后拉取 QAQPMskill-idea-to-launch-kit。' },
      { step: '02', title: '写接入记录并走阶段 0–1', detail: '在 PM 项目写入 dev/开发接入.md 绑定仓库提交与产品子目录；完成阶段 0（PRD 体检）与阶段 1（技术适配声明）。' },
      { step: '03', title: '按子阶段循环执行 kit.sh', detail: '每个子阶段执行「bash kit.sh 任务 → 先写技术文档再实现 → bash kit.sh 自检 + 真实验证证据 → 你验收后 bash kit.sh 通过」。' },
      { step: '04', title: 'S11 双轨准入 → S12 授权发布', detail: '阶段 3 联调完成后转 S11（功能测试 ≠ AI 评测）；拿到准入且经发布授权后，再由 S12 接续阶段 4–5 部署观察。' },
    ],
    prompt: `$qaqpm-dev-track\nS8 PRD、S7 评测标准和 S9 选型已就绪，位置在 ./docs/kb-assistant/。\n本轮目标先交付本地可运行版本并完成联调验证（暂不部署线上）。\n请先检查接入条件，说明开发流程仓库的拟放路径，等我确认后再拉取并启动阶段 0。`,
  },
];

export const installCliScript = `# 1. 克隆 QAQPM 仓库到本地临时目录
git clone https://github.com/PerpperQAQ/AIPM-QAQPM-Skills.git /tmp/AIPM-QAQPM-Skills

# 2. 指定你的 Agent skills 目录（以 Codex 为例，可替换为 Cursor / Antigravity 等路径）
TARGET_DIR="$HOME/.codex/skills"
mkdir -p "$TARGET_DIR"

# 3. 复制全部 17 个 qaqpm-* Skill，并把仓库根 _shared/ 同步进每个 Skill 同级目录
for dir in /tmp/AIPM-QAQPM-Skills/qaqpm-*; do
  name="$(basename "$dir")"
  rm -rf "$TARGET_DIR/$name"
  cp -R "$dir" "$TARGET_DIR/$name"
  cp -R /tmp/AIPM-QAQPM-Skills/_shared "$TARGET_DIR/$name/_shared"
done

# 4. 核对已安装的 Skill 数量（完整安装应为 17）
ls -d "$TARGET_DIR"/qaqpm-* | wc -l`;

export const installDirectoryCheck = `<你的 skills 目录>/
├── qaqpm-product-lifecycle/     # 总控（建议必装）
│   ├── SKILL.md                 # Skill 主协议
│   ├── templates/               # 00-项目索引.md、已确认决策表.md
│   └── _shared/                 # ← 必须与 SKILL.md 同级，否则相对路径失效
├── qaqpm-problem-define/        # S1
│   ├── SKILL.md
│   ├── templates/
│   └── _shared/
├── ...                          # S2–S12（可全装，也可按需只装常用站）
├── qaqpm-agent-requirements/    # S8 AI 专题：Agent
├── qaqpm-rag-requirements/      # S8 AI 专题：RAG
├── qaqpm-aigc-requirements/     # S8 AI 专题：AIGC
└── qaqpm-tech-risk-review/      # 跨站专项：核心技术难题`;
