import React, { useState, useEffect, useRef, useId } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Code,
  FolderOpen,
  FileText,
  ShieldCheck,
  Table,
} from '@phosphor-icons/react';
import {
  architectureLayers,
  skillAnatomy,
  mechanismTabs,
  evidenceCards,
  ironRules,
  evalPurposeRows,
  prdComparisonRows,
  researchMenuRows,
  workspaceTree,
  usagePlaybooks,
} from './architecture-data';

/**
 * Accessible tab panel that uses hidden="until-found" and listens to `beforematch`
 * so browser find-in-page automatically activates the matching tab.
 */
function UntilFoundPanel({ active, tabId, onReveal, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', 'until-found');
    }
  }, [active]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleBeforeMatch = () => onReveal();
    el.addEventListener('beforematch', handleBeforeMatch);
    return () => el.removeEventListener('beforematch', handleBeforeMatch);
  }, [onReveal]);

  return (
    <div
      ref={ref}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={active ? 0 : undefined}
      className="m-tabpanel"
    >
      <div className="m-tabpanel-inner">{children}</div>
    </div>
  );
}

/**
 * Single-row scrollable accessible tablist with arrow-key selection-follows-focus
 * and hidden="until-found" panels.
 */
export function AccessibleTabs({ label, items, activeId, onChange, renderPanel, className = '' }) {
  const baseId = useId();
  const tabRefs = useRef([]);

  function selectIndex(idx, focusTab = false) {
    const next = items[idx];
    if (!next) return;
    onChange(next.id);
    const btn = tabRefs.current[idx];
    if (btn) {
      if (focusTab) btn.focus();
      btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function handleKeyDown(e, index) {
    let nextIndex = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = items.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      selectIndex(nextIndex, true);
    }
  }

  return (
    <div className={`m-tabs ${className}`}>
      <div role="tablist" aria-label={label} className="m-tablist">
        {items.map((item, i) => {
          const isSelected = item.id === activeId;
          const tabId = `${baseId}-tab-${item.id}`;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className="m-tab"
              onClick={() => selectIndex(i, false)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              {item.badge && <span className="m-tab-num mono">{item.badge}</span>}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="m-panels">
        {items.map((item) => {
          const isSelected = item.id === activeId;
          const tabId = `${baseId}-tab-${item.id}`;
          return (
            <UntilFoundPanel
              key={item.id}
              active={isSelected}
              tabId={tabId}
              onReveal={() => onChange(item.id)}
            >
              {renderPanel(item, isSelected)}
            </UntilFoundPanel>
          );
        })}
      </div>
    </div>
  );
}

function SmallCopyButton({ text, label = '复制指令' }) {
  const [state, setState] = useState('idle');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2400);
  }

  return (
    <button type="button" className="copy-button" onClick={copy} disabled={!text}>
      <span aria-live="polite">
        {state === 'done' ? '已复制' : state === 'error' ? '复制失败' : label}
      </span>
      {state === 'done' ? <Check /> : <Copy />}
    </button>
  );
}

/**
 * Four-layer architecture composition & single Skill 11-section anatomy.
 * Placed inside #architecture right beneath the interactive graph.
 */
export function ArchitectureAnatomy({ onGuide, onDocument }) {
  return (
    <div className="anatomy-wrap">
      <div className="sub-heading">
        <span className="mono sub-eyebrow">ARCHITECTURE COMPOSITION · 架构组成拆解</span>
        <h3>一套 17-Skill 体系，由哪四层装配而成？</h3>
        <p>
          QAQPM 不是一堆松散的 Prompt 集合，而是由「调度总控 + 主链 12 站 + 可组合 AI 专题 + 共享协议与工程仓库」组成的分层架构。每一层职责清晰，既可串联运行，也可按需单点拆用。
        </p>
      </div>

      <div className="layer-grid">
        {architectureLayers.map((layer) => (
          <article key={layer.level} className="layer-card">
            <header className="layer-card-head">
              <span className="layer-badge mono">{layer.level}</span>
              <div>
                <h4>{layer.name}</h4>
                <span className="layer-count">{layer.count}</span>
              </div>
            </header>
            <p className="layer-role">{layer.role}</p>
            <p className="layer-summary">{layer.summary}</p>
            <div className="layer-actions">
              {layer.items.map((it) => (
                <button
                  key={it.label}
                  type="button"
                  className="layer-chip"
                  onClick={() => (it.code ? onGuide(it.code) : onDocument(it.doc))}
                >
                  <span>{it.label}</span>
                  <ArrowUpRight />
                </button>
              ))}
            </div>
            <footer className="layer-artifacts">
              <span className="mono">核心产物</span>
              <div>{layer.artifacts.join(' · ')}</div>
            </footer>
          </article>
        ))}
      </div>

      <div className="skill-anatomy-box">
        <div className="skill-anatomy-intro">
          <div>
            <span className="mono sub-eyebrow">SINGLE SKILL ANATOMY · 单 Skill 内部构造</span>
            <h4>每个 <code>qaqpm-*</code> 目录都遵循同一套工程结构</h4>
            <p>
              无论是问题定义、评测设计还是开发推进，每个子 Skill 的目录组织与 <code>SKILL.md</code> 骨架完全一致，保证任何兼容 <code>SKILL.md</code> 的 Agent 都能稳定读取上游、执行自检并输出标准交接区。
            </p>
          </div>
          <button type="button" className="text-link" onClick={() => onDocument('ARCHITECTURE.md')}>
            阅读完整 ARCHITECTURE.md <ArrowUpRight />
          </button>
        </div>

        <div className="skill-anatomy-grid">
          <div className="folder-anatomy">
            <div className="anatomy-panel-title">
              <FolderOpen />
              <span>标准 Skill 目录组成</span>
            </div>
            <ul className="folder-list">
              {skillAnatomy.folderTree.map((item) => (
                <li key={item.name}>
                  <div>
                    <code className="mono">{item.name}</code>
                    <span className="folder-role">{item.role}</span>
                  </div>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="skeleton-anatomy">
            <div className="anatomy-panel-title">
              <FileText />
              <span>SKILL.md 统一 11 节协议骨架</span>
            </div>
            <ol className="skeleton-list">
              {skillAnatomy.sections.map(([num, title, desc]) => (
                <li key={num}>
                  <span className="mono">{num}</span>
                  <div>
                    <b>{title}</b>
                    <span>{desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Section: Core System Mechanisms (#mechanisms)
 * Explains Evidence Labels, Dual-Layer Handoff, Eval Front-Loading, Dual-Track PRD,
 * Research Methods A-H, and Project Workspace / Feishu Bitable / HTML Shell.
 */
export function SystemMechanisms({ onGuide, onDocument }) {
  const [activeTab, setActiveTab] = useState('evidence');
  const [storageMode, setStorageMode] = useState('local');

  const tabItems = mechanismTabs.map((t, i) => ({
    ...t,
    badge: String(i + 1).padStart(2, '0'),
  }));

  function renderPanel(item) {
    if (item.id === 'evidence') {
      return (
        <div className="mech-panel">
          <div className="mech-head">
            <div>
              <h3>证据三分法与反幻觉纪律</h3>
              <p>所有关键结论、表格与 HTML 报告必须明确区分事实、推断与待确认，从机制上杜绝「编造数据」「把文档记载当已验证」。</p>
            </div>
            <button type="button" className="text-link" onClick={() => onDocument('_shared/labels.md')}>
              查看 _shared/labels.md <ArrowUpRight />
            </button>
          </div>

          <div className="evidence-cards">
            {evidenceCards.map((c) => (
              <div key={c.tag} className={`evidence-card tone-${c.tone}`}>
                <div className="evidence-card-top">
                  <span className={`ev-pill tone-${c.tone}`}>{c.tag}</span>
                  <small>{c.alias}</small>
                </div>
                <p className="ev-meaning">{c.meaning}</p>
                <div className="ev-rule"><b>必须附带：</b>{c.must}</div>
                <div className="ev-rule forbid"><b>严格禁止：</b>{c.forbid}</div>
              </div>
            ))}
          </div>

          <div className="iron-rules">
            <h4>四条高频反例纠偏（含标签密度规）</h4>
            <div className="iron-rules-grid">
              {ironRules.map((r, i) => (
                <div key={i} className="iron-rule-item">
                  <div className="rule-bad"><span className="mono">反例</span>{r.bad}</div>
                  <div className="rule-good"><span className="mono">正确</span>{r.good}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (item.id === 'handoff') {
      return (
        <div className="mech-panel">
          <div className="mech-head">
            <div>
              <h3>双层交接协议：先给人看，再给 Agent 继承</h3>
              <p>每份主交付物末尾都带统一交接区——前面是人话「接手后第一步」，后面是给下一站 Agent 读取的增量 YAML，实现跨会话零失忆。</p>
            </div>
            <button type="button" className="text-link" onClick={() => onDocument('_shared/handoff-schema.md')}>
              查看 _shared/handoff-schema.md <ArrowUpRight />
            </button>
          </div>

          <div className="handoff-split">
            <div className="handoff-card">
              <div className="handoff-card-head">
                <span className="mono">LAYER 01 · 给人读（强制前置）</span>
                <small>不看 YAML 也能立刻知道下一步做什么</small>
              </div>
              <pre className="handoff-code">{`## 交接（给人）

**接手后第一步**：把用户-场景-需求表中已拆成可执行动作的 3 条写入需求池待评估视图，并核对本地 03 镜像行数。

| 项 | 内容 |
|---|---|
| 本站刚确认 | 仅写本站新增事实（1–5 条） |
| 下一站建议 | S3 · 将已验证痛点转入需求池 |
| 未完成／阻塞 | 权限撤销日志待开发确认 |`}</pre>
            </div>

            <div className="handoff-card">
              <div className="handoff-card-head">
                <span className="mono">LAYER 02 · 给 Agent 读（附录 YAML）</span>
                <small>结构化增量字段 + 防同质化继承</small>
              </div>
              <pre className="handoff-code">{`qaqpm_handoff:
  schema_version: "1.0"
  station: "S5"
  inherits: ["S1", "S2", "S4"]   # 引用前站，禁止复读
  facts_confirmed: []            # 仅写本站新增【事实】
  document_maturity: "mvp_draft" # mvp_draft | development_ready
  evaluation_purpose: "feasibility"
  return_station: "S5"
  next_station: "S7"
  provisional: false             # 声明路径磁盘不存在须标 true`}</pre>
            </div>
          </div>

          <div className="handoff-guards">
            <div>
              <strong>反同质化硬规</strong>
              <p>只写本站新增确认与推断，跨站已有结论用 <code>inherits</code> 引用。若连续 ≥3 份文档推断重复率过高，总控直接打回重写。</p>
            </div>
            <div>
              <strong>虚路径强检</strong>
              <p>交接区声明的每个路径必须在磁盘真实存在；尚未创建的文件必须显式标注 <code>provisional: true</code> 并记入 <code>blockers</code>。</p>
            </div>
            <div>
              <strong>长对话决策收敛</strong>
              <p>多轮讨论后总控先沉淀 <code>research/已确认决策表.md</code> 与《立项决策一页纸》，缺底座/不做清单/入口不得宣称 S1–S6 已齐。</p>
            </div>
          </div>
        </div>
      );
    }

    if (item.id === 'eval') {
      return (
        <div className="mech-panel">
          <div className="mech-head">
            <div>
              <h3>评测前置与分离：设计早于开发，执行贯穿全程</h3>
              <p>QAQPM 把传统「验收与评测」拆成 <strong>S7 设计（早）</strong> 与 <strong>S11 准入（晚）</strong>，并支持 S5 提前调用 S7/S9 验证高风险假设，所有阶段共享同一套标准与题集。</p>
            </div>
            <button type="button" className="text-link" onClick={() => onGuide('S7')}>
              打开 S7 评测设计指南 <ArrowUpRight />
            </button>
          </div>

          <div className="eval-four-grid">
            {[
              ['01 · 标准 (Rubric)', '把「效果好」拆成可观察维度、分档样例、红线项与通过分母。'],
              ['02 · 题集 (Gold Set)', '覆盖正常、边界、红线、反例四类题型；题源优先级：真实 > 专家 > AI 补。'],
              ['03 · 运行 Case (Runs)', '记录候选、配置、实际输入输出、耗时成本与失败；失败与无产物禁止删去。'],
              ['04 · 指标与归因', '报告第一句直接给决定（过/限范围/不过）；RAG 分评检索与回答，防「蒙对」。'],
            ].map(([title, desc]) => (
              <div key={title} className="eval-mini-card">
                <span className="mono">{title}</span>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div tabIndex={0} role="region" aria-labelledby="eval-purpose-caption" className="table-wrapper">
            <table className="data-table eval-table">
              <caption id="eval-purpose-caption">五种 evaluation_purpose 在全流程中的分工与边界</caption>
              <thead>
                <tr>
                  <th scope="col">评测目的</th>
                  <th scope="col">发生阶段</th>
                  <th scope="col">解决什么问题</th>
                  <th scope="col">关键边界（防误判）</th>
                </tr>
              </thead>
              <tbody>
                {evalPurposeRows.map((row) => (
                  <tr key={row.purpose}>
                    <th scope="row"><code className="mono">{row.purpose}</code></th>
                    <td>{row.stage}</td>
                    <td>{row.goal}</td>
                    <td>{row.boundary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (item.id === 'dual-prd') {
      return (
        <div className="mech-panel">
          <div className="mech-head">
            <div>
              <h3>同源双轨 PRD，与产品 Agent 需求彻底分清</h3>
              <p>先填满并冻结《立项决策一页纸》，再同源派生「给人读的 PRD」与「给编码 Agent 读的开发约定」，并原地沿用 S5 启动的 AI 专题文档，不复制第二套正文。</p>
            </div>
            <button type="button" className="text-link" onClick={() => onGuide('S8')}>
              打开 S8 双轨交接指南 <ArrowUpRight />
            </button>
          </div>

          <div tabIndex={0} role="region" aria-labelledby="prd-compare-caption" className="table-wrapper">
            <table className="data-table prd-table">
              <caption id="prd-compare-caption">08-PRD、08-Agent规范 与 ai/agent/ 三者职责对照</caption>
              <thead>
                <tr>
                  <th scope="col">文档目录</th>
                  <th scope="col">归属 Skill</th>
                  <th scope="col">目标读者</th>
                  <th scope="col">核心内容</th>
                  <th scope="col">常见误区与红线</th>
                </tr>
              </thead>
              <tbody>
                {prdComparisonRows.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td><code className="mono">{row.owner}</code></td>
                    <td>{row.reader}</td>
                    <td>{row.focus}</td>
                    <td>{row.misconception}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="freeze-callout">
            <ShieldCheck />
            <div>
              <strong>《立项决策一页纸》硬门禁（frozen = true / false）</strong>
              <p>
                完整正式 PRD 必须先核对一句话目标、MVP must/wont、差异化、S7 门禁引用、架构取舍与「已决｜仍要证明」。只要任一项未冻（<code>frozen=false</code>），索引与一页纸顶栏标红，仅可交付「PRD 草案」，禁止标为 S8 终稿完成。
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (item.id === 'research') {
      return (
        <div className="mech-panel">
          <div className="mech-head">
            <div>
              <h3>S2 调研方式菜单 A–H 与立项证据门槛</h3>
              <p>不是所有调研都能支撑立项。QAQPM 将 8 种调研方法按证据强度分层，在 S6 立项前设立明确的最低证据线。</p>
            </div>
            <button type="button" className="text-link" onClick={() => onDocument('_shared/research-methods.md')}>
              查看 _shared/research-methods.md <ArrowUpRight />
            </button>
          </div>

          <div className="gate-strip">
            <div><span className="mono">立项 (Go)</span><p>≥ 1 种<strong>高强度</strong>（A/B/C），或 2 种中强度且写清局限，并附带编号原话或行为数字。</p></div>
            <div><span className="mono">条件立项</span><p>允许 1 种中强度 + 明确验证日历；纯 E 问卷或 H 桌面研究必须写清第几周补 A/B/C。</p></div>
            <div><span className="mono">不立项 / 暂缓</span><p>证据不足或假设被推翻同样是高质量产出，如实记入报告与止损复盘。</p></div>
          </div>

          <div tabIndex={0} role="region" aria-labelledby="research-menu-caption" className="table-wrapper">
            <table className="data-table research-table">
              <caption id="research-menu-caption">S2 用户研究 A–H 调研方式菜单</caption>
              <thead>
                <tr>
                  <th scope="col">代号与方式</th>
                  <th scope="col">证据强度</th>
                  <th scope="col">适用场景与纪律</th>
                  <th scope="col">配套模板</th>
                </tr>
              </thead>
              <tbody>
                {researchMenuRows.map((row) => (
                  <tr key={row.code}>
                    <th scope="row"><span className="mono method-code">{row.code}</span> {row.method}</th>
                    <td><span className={`strength-badge s-${row.strength}`}>{row.strength}</span></td>
                    <td>{row.when}</td>
                    <td>
                      <button
                        type="button"
                        className="inline-doc-btn"
                        onClick={() => onDocument(`qaqpm-user-research/templates/${row.template}`)}
                      >
                        {row.template} <ArrowUpRight />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // workspace / feishu / html
    return (
      <div className="mech-panel">
        <div className="mech-head">
          <div>
            <h3>项目目录蓝图、飞书四表硬规则与离线 HTML 体系</h3>
            <p>支持「纯本地 Markdown 仓库」与「飞书知识库 + 多维表格双写」两种落盘形态，并内置单文件离线 HTML 报告壳与仿 Archify 技术链路图。</p>
          </div>
          <div className="storage-toggle" role="group" aria-label="切换文档存储模式">
            <button
              type="button"
              className={storageMode === 'local' ? 'selected' : ''}
              aria-pressed={storageMode === 'local'}
              onClick={() => setStorageMode('local')}
            >
              本地目录模式
            </button>
            <button
              type="button"
              className={storageMode === 'feishu' ? 'selected' : ''}
              aria-pressed={storageMode === 'feishu'}
              onClick={() => setStorageMode('feishu')}
            >
              飞书多维表双写模式
            </button>
          </div>
        </div>

        {storageMode === 'feishu' && (
          <div className="feishu-banner">
            <Table />
            <div>
              <strong>飞书模式 P0 硬规则（_shared/feishu-doc-protocol.md）</strong>
              <p>
                <b>需求池（S3）、评测集（S7）、Bad case（S10/S12）、功能验收用例（S11，与评测集分表）</b>四类结构化表必须使用<strong>飞书多维表格</strong>并保留本地全字段镜像（行数不对齐＝硬失败）；<b>竞品分析仍用普通文档，不进多维表</b>；写入后必须回读核对，严禁留下 Untitled 空页。
              </p>
            </div>
          </div>
        )}

        <div className="blueprint-list">
          {workspaceTree.map((item) => (
            <div key={item.path} className={`blueprint-row ${storageMode === 'feishu' && item.bitable ? 'is-bitable' : ''}`}>
              <div className="blueprint-path">
                <code className="mono">{item.path}</code>
                <div className="blueprint-tags">
                  <button type="button" className="bp-station mono" onClick={() => onGuide(item.station)}>
                    {item.station}
                  </button>
                  {storageMode === 'feishu' && item.bitable && (
                    <span className="bp-bitable">飞书多维表</span>
                  )}
                </div>
              </div>
              <p className="blueprint-desc">{storageMode === 'local' ? item.local : item.feishu}</p>
              <button type="button" className="bp-preview" onClick={() => onDocument(item.doc)}>
                查看模板 <ArrowUpRight />
              </button>
            </div>
          ))}
        </div>

        <div className="html-dual-strip">
          <div>
            <span className="mono">HTML 公共报告壳 · reports/*.html</span>
            <p>单文件零外部依赖，离线可开、打印友好，顶部自带「全部 / 隐藏推断 / 只看事实」证据筛选条；飞书或分享项目默认强制产出 <code>00-项目全景.html</code> 与 <code>立项决策一页纸.html</code>。</p>
            <button type="button" className="text-link" onClick={() => onDocument('_shared/html-report-shell.md')}>
              查看 HTML 报告规范 <ArrowUpRight />
            </button>
          </div>
          <div>
            <span className="mono">技术链路交互演示 · 09-技术链路.html</span>
            <p>形态对齐 Archify，单文件支持 architecture / workflow / dataflow / sequence 视图切换与主路径高亮，必须与 <code>09-POC与选型.md</code> 组件表同源。</p>
            <button type="button" className="text-link" onClick={() => onDocument('_shared/archify-tech-map.md')}>
              查看技术链路规范 <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="mechanisms" className="section mechanisms-section">
      <div className="section-heading">
        <span className="section-index">02 / SYSTEM MECHANISMS</span>
        <h2>让 AI 产品工作不跑偏的<br />六套底层机制。</h2>
        <p>
          相比零散的 Prompt 模板，QAQPM 真正的核心在于跨站共享协议：用证据纪律管住幻觉，用双层交接实现跨会话续做，用前置评测与飞书对账兜住交付质量。
        </p>
      </div>

      <AccessibleTabs
        label="QAQPM 核心机制"
        items={tabItems}
        activeId={activeTab}
        onChange={setActiveTab}
        renderPanel={renderPanel}
      />
    </section>
  );
}

/**
 * Section: Practical Usage Playbook (#usage)
 * Shows concrete real-world multi-turn collaboration loops with copyable prompts.
 */
export function UsagePlaybook({ onGuide }) {
  const [activeId, setActiveId] = useState(usagePlaybooks[0].id);

  const tabItems = usagePlaybooks.map((p, i) => ({
    id: p.id,
    badge: `0${i + 1}`,
    label: p.badge.split(' · ')[1] || p.title,
    data: p,
  }));

  return (
    <section id="usage" className="section usage-section">
      <div className="section-heading">
        <span className="section-index">04 / DAILY WORKFLOW</span>
        <h2>装好 Skill 之后，<br />日常到底怎么跟 Agent 配合？</h2>
        <p>
          不用背诵 17 个 Skill 的细节。下面四种真实协作方式覆盖从新想法开局、单点补文档、跨会话续做到接入开发仓库的完整用法。
        </p>
      </div>

      <AccessibleTabs
        label="QAQPM 日常使用方式"
        items={tabItems}
        activeId={activeId}
        onChange={setActiveId}
        renderPanel={(item) => {
          const play = item.data;
          return (
            <div className="playbook-panel">
              <div className="playbook-header">
                <div>
                  <span className="playbook-badge">{play.badge}</span>
                  <h3>{play.title}</h3>
                  <p>{play.when}</p>
                </div>
                {play.id === 'dev-kit' && (
                  <button type="button" className="text-link" onClick={() => onGuide('S10')}>
                    查看 S10 开发仓库详情 <ArrowUpRight />
                  </button>
                )}
              </div>

              <ol className="playbook-turns">
                {play.turns.map((t) => (
                  <li key={t.step}>
                    <span className="mono">{t.step}</span>
                    <h4>{t.title}</h4>
                    <p>{t.detail}</p>
                  </li>
                ))}
              </ol>

              <div className="command">
                <div className="command-head">
                  <span><Code /> 直接复制到你的 Agent 对话框</span>
                  <SmallCopyButton text={play.prompt} label="复制实战指令" />
                </div>
                <pre>{play.prompt}</pre>
              </div>
            </div>
          );
        }}
      />
    </section>
  );
}
