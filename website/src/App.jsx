import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  GitBranch,
  GithubLogo,
  BookOpen,
  Stack,
  Compass,
  FileText,
  MagnifyingGlass,
  X,
  Plus,
  Minus,
  Code,
  Download,
  List,
  Lightning,
  Target,
  BracketsCurly,
  Graph,
  CheckCircle,
  CaretRight,
  Play,
  Pause,
  TerminalWindow,
  FolderOpen,
} from '@phosphor-icons/react';
const MarkdownRenderer = lazy(() => import('./MarkdownRenderer.jsx'));
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import { skills, routes, caseSteps, content } from './data';
import './styles.css';
import './enhancements.css';
import { aiTopics } from './execution-guide';
import {
  StationMetaBar,
  ExecutionSteps,
  Deliverables,
  AiRequirementModules,
  SelectionReportGuide,
  DevelopmentWorkflow,
} from './ExecutionGuide';
import {
  AccessibleTabs,
  ArchitectureAnatomy,
  SystemMechanisms,
  UsagePlaybook,
} from './ArchitectureDeepDive';
import {
  stationMeta,
  installCliScript,
  installDirectoryCheck,
} from './architecture-data';

const byCode = Object.fromEntries(skills.map((s) => [s.code, s]));
const resourceKinds = {
  'independent-template': '独立模板',
  outline: '正文大纲',
  'shared-rule': '共享规则',
  'method-guide': '方法文档',
  companion: '配套文件',
};
const localSource = (p) =>
  import.meta.env.BASE_URL + 'source/' + p.split('/').map(encodeURIComponent).join('/');
const sourceUrl = (p) => {
  const [path, ...fragment] = p.split('#');
  const hash = fragment.length ? '#' + fragment.join('#') : '';
  return (
    (content.sources[path]?.publication === 'local-revision'
      ? localSource(path)
      : `${content.repo}/${path.endsWith('/') ? 'tree' : 'blob'}/${content.commit}/${path
          .split('/')
          .map(encodeURIComponent)
          .join('/')}`) + hash
  );
};
const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function CopyButton({ text, label = '复制指令' }) {
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
    timer.current = setTimeout(() => setState('idle'), 2600);
  }
  return (
    <button type="button" className="copy-button" onClick={copy} disabled={!text}>
      <span aria-live="polite">
        {state === 'done' ? '已复制' : state === 'error' ? '复制失败，请手动选择' : label}
      </span>
      {state === 'done' ? <Check /> : <Copy />}
    </button>
  );
}

function Command({ text }) {
  return (
    <div className="command">
      <div className="command-head">
        <span>
          <Code /> 在你的 Agent 中调用
        </span>
        <CopyButton text={text} />
      </div>
      <pre>{text}</pre>
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="QAQPM 首页">
      <img
        className="brand-mark"
        src={import.meta.env.BASE_URL + 'lychee-logo.png'}
        width="42"
        height="42"
        alt=""
        aria-hidden="true"
      />
      <b>
        QAQPM<span className="brand-dot">.</span>
      </b>
    </a>
  );
}

function HeroMap({ onSelect }) {
  const [active, setActive] = useState('S5');
  const reduce = useReducedMotion();
  const nodes = [
    { id: 'S1', label: '发现问题', x: 10, y: 28, icon: Compass },
    { id: 'S5', label: '形成方案', x: 70, y: 21, icon: Stack },
    { id: 'S7', label: '建立标准', x: 9, y: 70, icon: Target },
    { id: 'S10', label: '验证交付', x: 70, y: 65, icon: CheckCircle },
  ];
  return (
    <div className="hero-map">
      <div className="map-corner tl" />
      <div className="map-corner tr" />
      <div className="map-corner bl" />
      <div className="map-corner br" />
      <div className="hero-map-meta">
        <span>THE PRODUCT SYSTEM</span>
        <span>
          交互式架构预览 <ArrowUpRight />
        </span>
      </div>
      <svg
        className="hero-lines"
        viewBox="0 0 600 450"
        role="img"
        aria-label="产品问题、方案、评测和交付由总控连接"
      >
        <defs>
          <radialGradient id="disc">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#efefeb" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="232" r="160" fill="none" stroke="#dcddd7" />
        <circle cx="300" cy="232" r="113" fill="none" stroke="#e1e2dc" strokeDasharray="3 8" />
        <ellipse
          cx="300"
          cy="232"
          rx="240"
          ry="65"
          fill="none"
          stroke="#e4e5df"
          transform="rotate(-33 300 232)"
        />
        <path
          d="M125 158Q185 160 300 232T480 126M125 339Q190 320 300 232T480 315"
          stroke="#c9cbc3"
          fill="none"
        />
        <motion.path
          d={
            active === 'S5'
              ? 'M300 232Q400 195 480 126'
              : active === 'S1'
                ? 'M300 232Q185 160 125 158'
                : active === 'S7'
                  ? 'M300 232Q190 320 125 339'
                  : 'M300 232Q400 280 480 315'
          }
          stroke="#df572f"
          strokeWidth="2"
          fill="none"
          initial={false}
          animate={{ pathLength: 1 }}
        />
        <circle cx="300" cy="232" r="64" fill="url(#disc)" stroke="#d1d3ca" />
        <circle
          cx="300"
          cy="232"
          r="74"
          stroke="#df572f"
          strokeOpacity=".25"
          fill="none"
          strokeDasharray="2 7"
        />
        {!reduce && (
          <circle r="3.5" fill="#df572f">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M125 158Q185 160 300 232T480 126"
            />
          </circle>
        )}
      </svg>
      <button type="button" className="hero-hub" onClick={() => onSelect('CTRL')}>
        <span className="mono">ORCHESTRATOR</span>
        <strong>QAQPM</strong>
        <small>产品全流程总控</small>
      </button>
      {nodes.map((n) => (
        <button
          type="button"
          key={n.id}
          className={`hero-node ${active === n.id ? 'active' : ''}`}
          style={{ left: n.x + '%', top: n.y + '%' }}
          onMouseEnter={() => setActive(n.id)}
          onFocus={() => setActive(n.id)}
          onClick={() => onSelect(n.id)}
        >
          <n.icon weight="light" />
          <span>
            <small>{n.id}</small>
            <b>{n.label}</b>
          </span>
          <ArrowUpRight />
        </button>
      ))}
      <div className="hero-map-foot">
        <span className="pulse-dot" /> 决策 · 证据 · 交接 <span>点击节点，展开使用指南</span>
      </div>
    </div>
  );
}

const modeInfo = {
  all: {
    label: '完整体系',
    title: '12 个阶段，一套可回流的工作方法。',
    text: '编号表示职责，项目可以交错推进。点击任意节点查看输入、操作与产出；已有材料会被继承，无需每次从头开始。',
    nodes: skills.map((s) => s.code),
  },
  early: {
    label: '早期验证',
    title: '先验证关键未知，再承诺首版范围。',
    text: 'S5 提出关键假设 → S7 设计标准与样本 → S9 在授权范围内运行 → 回到 S5／S6 调整范围和投入。早期调用不代表整站已经完成。',
    nodes: ['S5', 'S6', 'S7', 'S9', 'RAG', 'AGENT', 'AIGC'],
  },
  docs: {
    label: '文档演进',
    title: '一份专题文档，从首稿走向开发交接。',
    text: 'S5 启动适用专题，S7／S9 补充验证依据。S8 沿用原文件与能力 ID，完善接口、数据、权限、状态和验收引用。',
    nodes: ['S5', 'S7', 'S8', 'S9', 'RAG', 'AGENT', 'AIGC'],
  },
  delivery: {
    label: '工程交付',
    title: '从同源 PRD 接入开发仓库，双轨验收再发布。',
    text: 'S7 冻结标准与 S8 双轨 PRD 交 S9/S10；S10 绑定开发流程仓库跑阶段 0–3（kit.sh），S11 分别做功能与 AI 准入，S12 获授权后接续阶段 4–5 部署观察。',
    nodes: ['S7', 'S8', 'S9', 'S10', 'S11', 'S12'],
  },
  loop: {
    label: '上线回流',
    title: '真实使用中的发现，回到正确的站点。',
    text: 'S12 观察线上效果与用户反馈：新需求回 S3，评测标准缺口回 S7，实现问题回 S10，必要时在 S11 复验。',
    nodes: ['S3', 'S7', 'S10', 'S11', 'S12'],
  },
};

function Architecture({ onGuide, onDocument }) {
  const [mode, setMode] = useState('all');
  const [selected, setSelected] = useState('S5');
  const [zoom, setZoom] = useState(1);
  const info = modeInfo[mode];
  const skill = byCode[selected];
  const meta = stationMeta[selected];

  return (
    <section id="architecture" className="section architecture">
      <Reveal>
        <div className="section-heading">
          <span className="section-index">01 / ARCHITECTURE</span>
          <h2>
            看见全貌，
            <br />
            也看清每一次交接。
          </h2>
          <p>
            产品工作从来不是一条直线。让问题、方案与证据，在同一套分层体系里相互校准。切换上方路径视图，点击任意节点检查上下游与交付物。
          </p>
        </div>
      </Reveal>

      <div className="architecture-shell">
        <div className="architecture-toolbar">
          <div className="segmented" role="group" aria-label="架构视图">
            {Object.entries(modeInfo).map(([key, m]) => (
              <button
                type="button"
                key={key}
                className={mode === key ? 'selected' : ''}
                aria-pressed={mode === key}
                onClick={() => {
                  setMode(key);
                  setSelected(key === 'loop' ? 'S12' : key === 'delivery' ? 'S10' : 'S5');
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="zoom-controls">
            <button
              type="button"
              aria-label="缩小架构图"
              disabled={zoom <= 0.8}
              onClick={() => setZoom((z) => Math.max(0.8, +(z - 0.1).toFixed(1)))}
            >
              <Minus />
            </button>
            <button type="button" aria-label="重置架构缩放" onClick={() => setZoom(1)}>
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="放大架构图"
              disabled={zoom >= 1.4}
              onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(1)))}
            >
              <Plus />
            </button>
          </div>
        </div>

        <div className="architecture-body">
          <div className="graph-scroll">
            <div className="graph-scale" style={{ width: 760 * zoom, height: 710 * zoom }}>
              <div className="graph-canvas" style={{ transform: `scale(${zoom})` }}>
                <svg viewBox="0 0 760 710" className="graph-lines" aria-hidden="true">
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 8 8"
                      refX="7"
                      refY="4"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto"
                    >
                      <path d="M0 0L8 4L0 8" fill="none" stroke="currentColor" />
                    </marker>
                  </defs>
                  <path
                    className="base-path"
                    d="M380 83V124M110 124H650M110 124V155M290 124V155M470 124V155M650 124V155M185 190H215M365 190H395M545 190H575M725 190Q746 190 746 215V248Q746 265 725 265H35Q14 265 14 285V340H35M185 340H215M365 340H395M545 340H575M725 340Q746 340 746 365V398Q746 415 725 415H35Q14 415 14 435V490H35M185 490H215M365 490H395M545 490H575M725 340H752V580H290M290 580V613M470 580V613M650 580V613"
                  />
                  {mode === 'early' && (
                    <path
                      className="highlight-path"
                      d="M185 340Q198 340 198 315V300Q198 288 215 288H375Q395 288 395 310V340M470 375V400H14V490H35M110 455V375M185 490H200V430Q200 425 210 425H290V375"
                    />
                  )}
                  {mode === 'docs' && (
                    <path
                      className="highlight-path"
                      d="M110 375H198V550H740V580H290V613M470 580V613M650 580V613M650 375H740V580"
                    />
                  )}
                  {mode === 'delivery' && (
                    <path
                      className="highlight-path"
                      d="M545 340H575M725 340Q746 340 746 365V398Q746 415 725 415H35Q14 415 14 435V490H35M185 490H215M365 490H395M545 490H575"
                    />
                  )}
                  {mode === 'loop' && (
                    <path
                      className="highlight-path"
                      d="M650 455V420H290V455M650 455V410H470V225M650 455V405H470V375"
                    />
                  )}
                </svg>

                <button
                  type="button"
                  className={`controller-node ${selected === 'CTRL' ? 'active' : ''}`}
                  onClick={() => setSelected('CTRL')}
                >
                  <Graph size={20} />
                  <span>
                    <b>产品全流程总控</b>
                    <small>读已有资料 · 判断阶段 · 维护交接</small>
                  </span>
                  <span className="mono">CTRL</span>
                </button>

                {['发现与判断', '方案与决策', '验证与交付'].map((t, i) => (
                  <span key={t} className="graph-row-title" style={{ top: 130 + i * 150 }}>
                    {t}
                  </span>
                ))}

                {skills.slice(1, 13).map((s, i) => (
                  <button
                    type="button"
                    key={s.code}
                    aria-pressed={selected === s.code}
                    className={`stage-node ${selected === s.code ? 'active' : ''} ${
                      !info.nodes.includes(s.code) ? 'dim' : ''
                    } ${info.nodes.includes(s.code) && mode !== 'all' ? 'on-path' : ''}`}
                    style={{ left: 35 + (i % 4) * 180, top: 155 + Math.floor(i / 4) * 150 }}
                    onClick={() => setSelected(s.code)}
                  >
                    <span className="mono">
                      {s.code}
                      <ArrowUpRight />
                    </span>
                    <b>{s.title}</b>
                  </button>
                ))}

                <span className="graph-row-title" style={{ top: 554 }}>
                  S8 · AI 需求模块（S5 可启动首稿）
                </span>
                {['AGENT', 'RAG', 'AIGC'].map((code, i) => (
                  <button
                    type="button"
                    key={code}
                    className={`topic-node ${selected === code ? 'active' : ''} ${
                      !info.nodes.includes(code) ? 'dim' : ''
                    }`}
                    style={{ left: 215 + i * 180 }}
                    onClick={() => setSelected(code)}
                  >
                    <BracketsCurly />
                    <b>{code}</b>
                    <span>
                      {code === 'AGENT' ? '任务与工具' : code === 'RAG' ? '知识与检索' : '生成与编辑'}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className={`risk-node ${selected === 'RISK' ? 'active' : ''}`}
                  onClick={() => setSelected('RISK')}
                  style={{ left: 35 }}
                >
                  <Lightning />
                  <b>技术难题</b>
                  <span>跨站专项</span>
                </button>
              </div>
            </div>
          </div>

          <aside className="graph-inspector">
            <div className="inspector-label">
              <span>节点说明</span>
              <span className="mono">{selected}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{skill.title}</h3>
                <div className="inspector-id-bar">
                  <code className="mono">${skill.id}</code>
                  {meta && <span className="inspector-layer">{meta.layer}</span>}
                </div>
                <p className="inspector-question">{skill.question}</p>
                <div className="inspector-block">
                  <small>何时使用</small>
                  <p>{skill.when}</p>
                </div>
                <div className="inspector-block">
                  <small>关键产出</small>
                  <p>{skill.output}</p>
                </div>
                <div className="inspector-block">
                  <small>交接方向</small>
                  <p>{skill.next}</p>
                </div>
                <div className="inspector-actions">
                  <button type="button" className="text-link" onClick={() => onGuide(selected)}>
                    打开完整使用指南 <ArrowUpRight />
                  </button>
                  <button
                    type="button"
                    className="inspector-source-btn"
                    onClick={() => onDocument(skill.id + '/SKILL.md')}
                  >
                    查看 SKILL.md <ArrowUpRight />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="graph-legend">
              <span>
                <i /> 阶段连接
              </span>
              <span>
                <i /> 当前路径
              </span>
            </div>
          </aside>
        </div>

        <div className="path-caption">
          <GitBranch />
          <div>
            <strong>{info.title}</strong>
            <p>{info.text}</p>
          </div>
        </div>
      </div>

      <div className="foundation">
        <span>共享基础</span>
        {[
          ['证据标签', '_shared/labels.md'],
          ['交接协议', '_shared/handoff-schema.md'],
          ['AI 文档演进', '_shared/ai-document-protocol.md'],
          ['开发流程', '_shared/development-kit-protocol.md'],
          ['文档存储', '_shared/feishu-doc-protocol.md'],
        ].map(([title, path]) => (
          <button type="button" onClick={() => onDocument(path)} key={title}>
            {title}
            <ArrowUpRight />
          </button>
        ))}
      </div>

      <ArchitectureAnatomy onGuide={onGuide} onDocument={onDocument} />
    </section>
  );
}

function scrollGuideStart() {
  const detail = window.document.querySelector('.guide-detail');
  detail?.scrollIntoView({ behavior: 'instant', block: 'start' });
  detail?.querySelector('#guide-station-title')?.focus({ preventScroll: true });
}

function GuideBlock({ id, index, title, children }) {
  return (
    <section id={`guide-${id}`} className="guide-block" aria-labelledby={`guide-${id}-title`}>
      <div className="guide-block-heading">
        <span className="mono">{String(index).padStart(2, '0')}</span>
        <h4 id={`guide-${id}-title`}>{title}</h4>
      </div>
      <div className="guide-block-body">{children}</div>
    </section>
  );
}

function Guide({ selected, setSelected, onDocument }) {
  const [filter, setFilter] = useState('全部');
  const previous = useRef(selected);
  useLayoutEffect(() => {
    if (previous.current !== selected) {
      previous.current = selected;
      scrollGuideStart();
    }
  }, [selected]);
  const s = byCode[selected];
  const hasSpecialist = selected === 'S9' || selected === 'S10';
  const sections = [
    ['overview', '使用与准备'],
    ['steps', '执行步骤'],
    ['command', '调用示例'],
    ['outputs', '交付文档'],
    ...(hasSpecialist ? [['specialist', selected === 'S10' ? '开发仓库流程' : '选型报告流程']] : []),
    ['completion', '完成与交接'],
    ['resources', '参考资料'],
  ];
  const block = (id, children) => (
    <GuideBlock
      id={id}
      index={sections.findIndex((x) => x[0] === id) + 1}
      title={sections.find((x) => x[0] === id)[1]}
    >
      {children}
    </GuideBlock>
  );
  const resources = content.resources.filter((r) => r.skills.includes(s.id));
  const choose = (code) => {
    if (code === selected) scrollGuideStart();
    else setSelected(code);
  };
  const item = (x) => (
    <button
      type="button"
      key={x.code}
      onClick={() => choose(x.code)}
      className={`${selected === x.code ? 'active' : ''} ${
        x.code === 'S8' && aiTopics.includes(selected) ? 'parent-active' : ''
      }`}
      aria-current={selected === x.code ? 'true' : undefined}
    >
      <span className="mono">{x.code}</span>
      {x.title}
      <CaretRight />
    </button>
  );
  const topics = (
    <div className="guide-ai-group" role="group" aria-label="S8 的 AI 需求模块">
      <div className="guide-group-label">S8 · AI 需求模块</div>
      <p>S5 首稿 · S8 细化 · 可单独调用</p>
      {aiTopics.map((code) => item(byCode[code]))}
    </div>
  );

  return (
    <section id="guide" className="section">
      <Reveal>
        <div className="section-heading">
          <span className="section-index">03 / EXECUTION GUIDE</span>
          <h2>
            知道怎么执行，
            <br />
            也知道会交付什么。
          </h2>
          <p>
            逐个查看 17 个 Skill 的架构属性、输入材料、执行步骤、调用指令、交付文档、完成条件与下一步。三个 AI 需求模块收在 S8 下，S5 可提前启动首稿。
          </p>
        </div>
      </Reveal>
      <div className="guide-layout">
        <aside className="guide-sidebar">
          <div className="guide-filter" role="group" aria-label="指南分类">
            {['全部', '主线', '专题与专项'].map((f) => (
              <button
                type="button"
                key={f}
                className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <nav aria-label="Skill 指南">
            {filter === '全部' && item(byCode.CTRL)}
            {filter !== '专题与专项' &&
              skills
                .filter((x) => /^S\d/.test(x.code))
                .map((x) => (
                  <React.Fragment key={x.code}>
                    {item(x)}
                    {x.code === 'S8' && topics}
                  </React.Fragment>
                ))}
            {filter === '专题与专项' && (
              <>
                {item(byCode.S8)}
                {topics}
              </>
            )}
            {filter !== '主线' && (
              <>
                <div className="guide-group-label standalone-label">跨阶段专项</div>
                {item(byCode.RISK)}
              </>
            )}
          </nav>
          <label className="guide-mobile-select">
            选择要了解的 Skill
            <select
              aria-label="选择 Skill 执行指南"
              value={selected}
              onChange={(e) => choose(e.target.value)}
            >
              <optgroup label="产品全流程总控">
                <option value="CTRL">CTRL · 产品全流程</option>
              </optgroup>
              <optgroup label="产品阶段 S1–S12">
                {skills
                  .filter((x) => /^S\d/.test(x.code))
                  .map((x) => (
                    <option key={x.code} value={x.code}>
                      {x.code} · {x.title}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="S8 下的 AI 需求模块（S5 可启动首稿）">
                {aiTopics.map((code) => (
                  <option key={code} value={code}>
                    S8 / {byCode[code].title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="跨阶段专项">
                <option value="RISK">RISK · 核心技术难题</option>
              </optgroup>
            </select>
            <span>AI 需求归 S8 细化，也可在 S5 或单文档任务中调用。</span>
          </label>
        </aside>

        <article className="guide-detail" aria-labelledby="guide-station-title">
          <div className="guide-detail-top">
            <span className="skill-tag">
              {aiTopics.includes(s.code) ? 'S8 / ' + s.code : s.code}
            </span>
            <button
              type="button"
              className="text-link"
              onClick={() => onDocument(s.id + '/SKILL.md')}
            >
              查看 Skill 原文
              <ArrowUpRight />
            </button>
          </div>
          <div key={selected} className="guide-content">
            <header className="guide-station-header">
              <h3 id="guide-station-title" tabIndex={-1}>
                {s.title}
              </h3>
              <p className="guide-question">{s.question}</p>
              <StationMetaBar skill={s} />
            </header>

            <nav className="guide-contents" aria-label="本站内容">
              {sections.map(([id, title], i) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => {
                    const target = window.document.getElementById(`guide-${id}`);
                    target?.scrollIntoView({
                      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                        ? 'instant'
                        : 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {title}
                </button>
              ))}
            </nav>

            {block(
              'overview',
              <>
                <AiRequirementModules selected={selected} onSelect={choose} />
                <div className="guide-pair">
                  <div>
                    <h4>什么时候用</h4>
                    <p>{s.when}</p>
                  </div>
                  <div>
                    <h4>准备什么</h4>
                    <p>{s.input}</p>
                  </div>
                </div>
              </>
            )}

            {block('steps', <ExecutionSteps code={s.code} />)}
            {block('command', <Command text={s.prompt} />)}
            {block(
              'outputs',
              <>
                <Deliverables skill={s} onDocument={onDocument} />
                {s.code === 'S5' && (
                  <div className="guide-context-note">
                    需要比较模型或底座时，由 S9 执行选型并写报告。
                    <button type="button" className="text-link" onClick={() => choose('S9')}>
                      查看选型报告与生成流程
                      <ArrowUpRight />
                    </button>
                  </div>
                )}
              </>
            )}

            {s.code === 'S9' &&
              block('specialist', <SelectionReportGuide onDocument={onDocument} onSelect={choose} />)}
            {s.code === 'S10' &&
              block('specialist', <DevelopmentWorkflow onDocument={onDocument} onSelect={choose} />)}

            {block(
              'completion',
              <>
                <div className="guide-completion">
                  <h4>怎样判断完成</h4>
                  <p>{s.gate}</p>
                </div>
                <div className="next-step">
                  <GitBranch />
                  <div>
                    <b>下一步去哪</b>
                    <p>{s.next}</p>
                  </div>
                </div>
              </>
            )}

            {block(
              'resources',
              <div className="related-templates">
                <p className="resource-guide-note">
                  独立模板提供填写结构；正文大纲说明交付要求；共享规则约束跨站一致性；方法文档给出执行与取证步骤。
                </p>
                {!resources.some((r) => r.kind === 'independent-template') && (
                  <p className="resource-guide-note">本站按正文大纲交付，目前未设置独立模板。</p>
                )}
                {Object.entries(resourceKinds).map(([kind, label]) => {
                  const group = resources.filter((r) => r.kind === kind);
                  if (!group.length) return null;
                  return (
                    <div className="guide-resource-group" key={kind}>
                      <div className="resource-group-title">
                        <span className={'resource-kind ' + kind}>{label}</span>
                        <span>
                          {group.length} {kind === 'outline' ? '个入口' : '个文件'}
                        </span>
                      </div>
                      <div className="resource-links">
                        {group.slice(0, 5).map((r) => (
                          <button type="button" key={r.id} onClick={() => onDocument(r.id)}>
                            <FileText />
                            <span>
                              {r.title}
                              {r.depth === 'outline-skeleton' && <small>章节骨架</small>}
                            </span>
                            <ArrowUpRight />
                          </button>
                        ))}
                      </div>
                      {group.length > 5 && (
                        <details className="resource-more">
                          <summary>展开其余 {group.length - 5} 个文件</summary>
                          <div className="resource-links">
                            {group.slice(5).map((r) => (
                              <button type="button" key={r.id} onClick={() => onDocument(r.id)}>
                                <FileText />
                                <span>
                                  {r.title}
                                  {r.depth === 'outline-skeleton' && <small>章节骨架</small>}
                                </span>
                                <ArrowUpRight />
                              </button>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

function Scenarios() {
  const [idx, setIdx] = useState(0);
  const r = routes[idx];
  return (
    <section id="start" className="section scenario-section">
      <Reveal>
        <div className="section-heading">
          <h2>从你现在的位置开始。</h2>
          <p>不用先走完 12 个阶段。选择当前情况，让已有工作成为下一步的起点。</p>
        </div>
      </Reveal>
      <div className="scenario-layout">
        <div className="scenario-choices" role="group" aria-label="选择使用场景">
          {routes.map((route, i) => (
            <button
              type="button"
              key={route.title}
              className={idx === i ? 'active' : ''}
              onClick={() => setIdx(i)}
              aria-pressed={idx === i}
            >
              <span className="mono">0{i + 1}</span>
              <span>
                <b>{route.title}</b>
                <small>{route.desc}</small>
              </span>
              <ArrowUpRight />
            </button>
          ))}
        </div>
        <div className="scenario-result">
          <span className="muted">建议从这里进入</span>
          <h3>{byCode[r.skill].title}</h3>
          <div className="route-trail">
            {r.path.map((p, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ArrowRight />}
                <span title={byCode[p].title}>{p}</span>
              </React.Fragment>
            ))}
          </div>
          <p>{r.desc} 路径用于说明协作关系，不代表每站自动通过。</p>
          <Command text={'$' + byCode[r.skill].id + '\n' + r.prompt} />
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () =>
        setIndex((i) => {
          if (i === caseSteps.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        }),
      8000
    );
    return () => clearInterval(timer);
  }, [playing]);
  const step = caseSteps[index];
  function choose(i) {
    setIndex(i);
    setPlaying(false);
  }
  return (
    <section id="case" className="case-section">
      <div className="section">
        <Reveal>
          <div className="case-heading">
            <span className="case-label">
              <BookOpen /> 贯穿案例 / 教学示例
            </span>
            <h2>
              一个知识问答助手，
              <br />
              是怎样一步步成形的。
            </h2>
            <p>沿着一个具体任务，观察每个阶段增加了什么信息，以及哪些决定仍然需要真实证据。</p>
          </div>
        </Reveal>
        <div className="case-tabs" role="group" aria-label="案例阶段">
          {caseSteps.map((s, i) => (
            <button
              type="button"
              key={s.label}
              className={i === index ? 'active' : i < index ? 'visited' : ''}
              aria-pressed={i === index}
              onClick={() => choose(i)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="case-content"
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="case-story">
              <span className="mono orange">{step.code}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="case-decision">
                <Target />
                <span>{step.decision}</span>
              </div>
            </div>
            <div className="case-artifact">
              <div>
                <FileText />
                <span>{step.file}</span>
                <small>示意内容</small>
              </div>
              <pre>{step.example}</pre>
              <footer>用于讲解方法 · 非真实项目运行记录</footer>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="case-controls">
          <button
            type="button"
            className="play-button"
            onClick={() => {
              if (index === 5) setIndex(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? <Pause weight="fill" /> : <Play weight="fill" />}
            {playing ? '暂停演示' : '自动演示'}
          </button>
          <div>
            <span className="mono">0{index + 1} / 06</span>
            <button
              type="button"
              aria-label="上一个案例阶段"
              disabled={index === 0}
              onClick={() => choose(index - 1)}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              aria-label="下一个案例阶段"
              disabled={index === 5}
              onClick={() => choose(index + 1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Templates({ onDocument }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [kind, setKind] = useState('independent-template');
  const [expanded, setExpanded] = useState(false);
  const cats = [
    ['all', '所有站点'],
    ['product-lifecycle', '总控'],
    ['user-research', '用户研究'],
    ['agent-requirements', 'Agent'],
    ['rag-requirements', 'RAG'],
    ['aigc-requirements', 'AIGC'],
    ['eval-design', '评测'],
    ['prd-dual', 'PRD 与交接'],
    ['dev-track', '开发'],
  ];
  const list = content.resources.filter(
    (r) =>
      (kind === 'all' || r.kind === kind) &&
      (category === 'all' || r.skills.includes('qaqpm-' + category)) &&
      `${r.title} ${r.heading} ${r.skills.join(' ')} ${r.skills
        .map((id) => skills.find((s) => s.id === id)?.title)
        .join(' ')} ${resourceKinds[r.kind]}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );
  const visible = expanded ? list : list.slice(0, 9);

  return (
    <section id="templates" className="section">
      <Reveal>
        <div className="section-heading">
          <h2>带走方法，也带走模板。</h2>
          <p>
            {content.counts['independent-template']} 个独立 Markdown 模板文件，包含{' '}
            {content.counts['field-template']} 个字段模板与 {content.counts['outline-skeleton']}{' '}
            个章节骨架。正文大纲、共享规则、方法文档和 CSV 配套另列，旧名跳转不计入模板数量。
          </p>
        </div>
      </Reveal>
      <div className="resource-kind-tabs" role="group" aria-label="参考资料类型">
        {[['all', '全部资料'], ...Object.entries(resourceKinds)].map(([id, label]) => (
          <button
            type="button"
            key={id}
            className={kind === id ? 'active' : ''}
            aria-pressed={kind === id}
            onClick={() => {
              setKind(id);
              setExpanded(false);
            }}
          >
            {label}
            <span>{id === 'all' ? content.resources.length : content.counts[id]}</span>
          </button>
        ))}
      </div>
      <p className="catalog-kind-explainer">
        {kind === 'independent-template'
          ? '独立表示文件可单独取用，不代表每个文件都是一份完整报告。章节骨架需要按项目补充内容。'
          : kind === 'outline'
            ? '直接定位 Skill 正文中的输出结构与交付要求；这些入口不额外计作模板文件。'
            : kind === 'shared-rule'
              ? '跨站复用的证据、交接、存储与开发规则；每个共享文件只计一次。'
              : kind === 'method-guide'
                ? 'S4 与 S6 共用的拆解流程、体验指南、配表和历史案例；方法文档单列，不增加独立模板数量。'
                : kind === 'companion'
                  ? '配合主模板使用的 CSV 等文件，单独统计。'
                  : '按资料类型取用，避免把模板文件、正文入口和公共协议混算。'}
      </p>
      <div className="template-toolbar">
        <div className="template-filters" role="group" aria-label="模板分类">
          {cats.map(([id, title]) => (
            <button
              type="button"
              key={id}
              className={category === id ? 'active' : ''}
              aria-pressed={category === id}
              onClick={() => {
                setCategory(id);
                setExpanded(false);
              }}
            >
              {title}
            </button>
          ))}
        </div>
        <label className="search">
          <MagnifyingGlass />
          <input
            aria-label="搜索模板"
            placeholder="搜索资料、任务或 Skill"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(false);
            }}
          />
          {query && (
            <button type="button" aria-label="清空搜索" onClick={() => setQuery('')}>
              <X />
            </button>
          )}
        </label>
      </div>
      <div className="result-count" aria-live="polite">
        找到 {list.length} 项{kind === 'all' ? '参考资料' : resourceKinds[kind]}
      </div>
      {list.length ? (
        <div className="template-grid">
          {visible.map((r) => (
            <button
              type="button"
              className="template-card"
              key={r.id}
              onClick={() => onDocument(r.id)}
              data-kind={r.kind}
              data-depth={r.depth || ''}
            >
              <div>
                <span className="file-icon">
                  <FileText weight="light" />
                </span>
                <span className={'resource-kind ' + r.kind}>{resourceKinds[r.kind]}</span>
                <ArrowUpRight />
              </div>
              <h3>{r.title}</h3>
              <p>
                {r.kind === 'shared-rule'
                  ? '跨站复用'
                  : r.kind === 'method-guide'
                    ? r.skills.map((id) => skills.find((s) => s.id === id)?.code).join(' / ') +
                      ' 共用'
                    : skills.find((s) => s.id === r.skill)?.title}
                {r.depth &&
                  ' · ' + (r.depth === 'outline-skeleton' ? '章节骨架' : '字段模板')}
              </p>
              <footer>
                <span className="mono">
                  {r.format.toUpperCase()}
                  {r.publication === 'local-revision' ? ' · 本地修订' : ''}
                </span>
                <span>
                  预览资料 <ArrowRight />
                </span>
              </footer>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <MagnifyingGlass size={30} />
          <h3>没有找到匹配的资料</h3>
          <p>试试「知识」「评测」，或切换资料类型与站点。</p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setQuery('');
              setCategory('all');
              setKind('independent-template');
            }}
          >
            重置筛选 <ArrowRight />
          </button>
        </div>
      )}
      {list.length > 9 && (
        <button type="button" className="show-more" onClick={() => setExpanded((x) => !x)}>
          {expanded ? '收起资料' : `展开其余 ${list.length - 9} 项资料`}
          {expanded ? <Minus /> : <Plus />}
        </button>
      )}
    </section>
  );
}

const installPrompt = `请从 https://github.com/PerpperQAQ/AIPM-QAQPM-Skills 安装 QAQPM Skill。\n先确认当前工具的 skills 目录，保留已有自定义文件。\n将所需 qaqpm-* 目录复制到该目录，并把仓库根 _shared/ 复制到每个 Skill 内，与 SKILL.md 同级。\n安装后核对文件与相对引用，重新加载工具并确认能够识别 Skill。`;

function Installation({ onDocument }) {
  const [open, setOpen] = useState(0);
  const [installTab, setInstallTab] = useState('agent');
  const installTabs = [
    { id: 'agent', label: '交给 Agent 安装' },
    { id: 'cli', label: '命令行一键安装' },
    { id: 'tree', label: '安装后目录核对' },
  ];
  const faqs = [
    [
      '需要从 S1 一直走到 S12 吗？',
      '不需要。编号说明职责与交接关系。已有 PRD 可以直接进入开发接入检查；只补 RAG 或某份文档时，直接完成该范围，缺失的相关信息如实列出。',
    ],
    [
      '三个 AI 专题什么时候使用？',
      '正式需求细化与开发交接归 S8；S5 规划 MVP 时可按实际能力启动首稿，也可以单独调用。产品涉及自主工具决策用 Agent；基于外部知识检索生成用 RAG；生成或编辑内容用 AIGC。组合产品可以共享定义和引用，S8 沿用原文件细化。',
    ],
    [
      '08-Agent规范和产品 Agent 需求有什么不同？',
      '08-Agent规范是给编码 Agent 的开发与接口约定；qaqpm-agent-requirements 描述产品内部的自主任务、工具和协作行为。两者读者和职责不同。',
    ],
    [
      '文档写完，意味着技术已经通过验证吗？',
      '不意味着。文档成熟度、模型选择、链路验证和产品验收分别记录。模板完成只能说明材料状态，真实实验和正式验收必须各自有证据。',
    ],
    [
      '可以使用飞书保存项目材料吗？',
      '可以。飞书模式下，需求池、评测集、Bad case、功能验收用例用多维表格，并保留本地全字段镜像与回读记录；竞品分析仍用文档。功能验收用例与 AI 评测集分表。',
    ],
    [
      '跨会话续做时，如何避免 Agent 忘记前面确认的决策？',
      '只需在新对话里唤起 $qaqpm-product-lifecycle 并提供项目路径。总控会先读取 00-项目索引.md、上一站人话「接手后第一步」与 YAML 交接区，长对话还会沉淀 research/已确认决策表.md 与《立项决策一页纸》，直接继承已确认事实而不重复盘问。',
    ],
    [
      'S4 竞品分析的三种模式（扫描 / 单功能 / 完整拆解）怎么选？',
      '快速了解市场格局选「公开资料扫描」；只在写某项功能 PRD 时参考竞品选「单功能研究」（不强制五层）；立项前要建立核心差异化与反方论证则选「完整拆解」，须先完成实操取证与异常覆盖再写五层五问附录。',
    ],
    [
      '必须一次安装全部 17 个 Skill 吗？可以只装一部分吗？',
      '可以按需安装。最轻量组合是「总控 qaqpm-product-lifecycle + 你当前需要的单站或专题」。但请务必保证每个安装好的 qaqpm-* 目录内部都复制了一份仓库根的 _shared/，否则 Skill 内的相对协议链接无法解析。',
    ],
  ];

  return (
    <>
      <section id="install" className="section install-section">
        <Reveal>
          <div className="section-heading">
            <span className="section-index">05 / GET STARTED</span>
            <h2>
              把 QAQPM，
              <br />
              放进你的工作方式。
            </h2>
            <p>
              适用于 Codex、Cursor、Antigravity、Grok Bot 等所有兼容 SKILL.md 的 Agent 工具。支持让 Agent 自动安装，也提供本地 Shell 脚本。
            </p>
          </div>
        </Reveal>
        <div className="install-layout">
          <div className="install-steps">
            {[
              ['取得仓库', '从 GitHub 获取完整目录，保留 17 个 Skill、84 份模板与 13 份共享规则。'],
              [
                '放入 skills 目录并附带 _shared/',
                '按当前工具约定安装；关键点是把仓库根 _shared/ 复制进每个 qaqpm-* 目录内（与 SKILL.md 同级），确保相对路径有效。',
              ],
              [
                '在项目里开始对话',
                '重新加载工具后，调用 $qaqpm-product-lifecycle 自动判断起点，或直接点名某个站/专题开始推进。',
              ],
            ].map(([t, p], i) => (
              <div key={t}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
            <div className="install-cta-row">
              <a className="button dark" href={content.repo} target="_blank" rel="noreferrer">
                <GithubLogo /> 打开 GitHub 仓库 <ArrowUpRight />
              </a>
              <button type="button" className="text-link" onClick={() => onDocument('README.md')}>
                阅读仓库安装说明 <ArrowUpRight />
              </button>
            </div>
          </div>

          <div className="install-tabs-wrap">
            <AccessibleTabs
              label="安装方式选择"
              items={installTabs}
              activeId={installTab}
              onChange={setInstallTab}
              className="install-tabs"
              renderPanel={(tab) => {
                if (tab.id === 'agent') {
                  return (
                    <div className="install-panel-body">
                      <div className="install-note">
                        <span>
                          <Compass /> 交给你的 Agent 安装
                        </span>
                        <CopyButton text={installPrompt} label="复制安装说明" />
                      </div>
                      <pre className="install-prompt">{installPrompt}</pre>
                    </div>
                  );
                }
                if (tab.id === 'cli') {
                  return (
                    <div className="install-panel-body">
                      <div className="install-note">
                        <span>
                          <TerminalWindow /> 终端一键克隆并同步 _shared/
                        </span>
                        <CopyButton text={installCliScript} label="复制安装脚本" />
                      </div>
                      <pre className="install-prompt">{installCliScript}</pre>
                    </div>
                  );
                }
                return (
                  <div className="install-panel-body">
                    <div className="install-note">
                      <span>
                        <FolderOpen /> 安装完成后的目录结构检查
                      </span>
                      <CopyButton text={installDirectoryCheck} label="复制目录结构" />
                    </div>
                    <pre className="install-prompt">{installDirectoryCheck}</pre>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">开始之前，你可能还想知道。</h2>
        <div className="faqs">
          {faqs.map(([q, a], i) => (
            <div className="faq" key={q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  {q}
                  {open === i ? <Minus /> : <Plus />}
                </button>
              </h3>
              {open === i && <p id={'faq-' + i}>{a}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function sectionText(text, section) {
  if (!section) return text;
  const lines = text.split('\n');
  let start = -1,
    end = lines.length,
    fence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) fence = !fence;
    if (!fence && line === section) {
      start = i;
      break;
    }
  }
  if (start < 0) return text;
  fence = false;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith('```')) fence = !fence;
    if (!fence && /^## /.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function DocumentDialog({ path: entry, onClose }) {
  const resource = content.resources.find((r) => r.id === entry);
  const path = resource?.path || entry;
  const ref = useRef();
  const [loaded, setLoaded] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setLoaded(null);
    setFailed(false);
    fetch(localSource(path), { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Source unavailable');
        return r.text();
      })
      .then((text) => setLoaded({ path, text }))
      .catch((e) => {
        if (e.name !== 'AbortError') setFailed(true);
      });
    return () => controller.abort();
  }, [path]);

  useEffect(() => {
    if (!entry) return;
    const trigger = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [entry]);

  if (!entry) return null;
  const raw = loaded?.path === path ? loaded.text : null;
  const excerpt = raw ? sectionText(raw, resource?.section) : null;
  const rendered = excerpt?.replace(/^---\n[\s\S]*?\n---\n/, '');
  const published = content.sources[path]?.publication === 'published';

  function resolve(href) {
    if (!href || /^(https?:|#|mailto:)/.test(href)) return href;
    const parts = path.split('/').slice(0, -1);
    for (const p of href.split('/')) {
      if (p === '..') parts.pop();
      else if (p !== '.') parts.push(p);
    }
    let dest = parts.join('/');
    if (dest.includes('/_shared/')) dest = '_shared/' + dest.split('/_shared/')[1];
    return sourceUrl(dest);
  }

  return (
    <dialog
      ref={ref}
      className="document-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="doc-title"
    >
      <div className="dialog-header">
        <div>
          <span className="muted">
            {resourceKinds[resource?.kind] || 'Skill / 仓库说明'} ·{' '}
            {published ? '已发布来源 ' + content.commit.slice(0, 7) : '本地修订 · 尚未发布 GitHub'}
          </span>
          <h2 id="doc-title">{resource?.title || path.split('/').pop()}</h2>
        </div>
        <button type="button" className="icon-button" aria-label="关闭文档预览" onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="dialog-actions">
        <CopyButton text={excerpt || ''} label={resource?.section ? '复制大纲' : '复制正文'} />
        <a href={localSource(path)} download>
          <Download />
          {resource?.section ? '下载完整 Skill' : '下载原文件'}
        </a>
        {published && (
          <a href={sourceUrl(path)} target="_blank" rel="noreferrer">
            <GithubLogo />
            GitHub 原文
            <ArrowUpRight />
          </a>
        )}
      </div>
      <div className="document-provenance">
        {resource?.section && (
          <span>
            以下节选自 {path} 的「{resource.section.replace(/^## /, '')}」。
          </span>
        )}
        {resource?.depth === 'outline-skeleton' && (
          <span>这是章节骨架，需要按项目补充具体内容。</span>
        )}
        <span>
          快照 {content.snapshot.id} · 文件 SHA-256 {content.sources[path]?.sha256.slice(0, 12)}
        </span>
      </div>
      <div className="markdown">
        {raw ? (
          path.endsWith('.csv') ? (
            <pre>{raw}</pre>
          ) : (
            <Suspense fallback={<p aria-live="polite">正在排版文档…</p>}>
              <MarkdownRenderer resolve={resolve}>{rendered}</MarkdownRenderer>
            </Suspense>
          )
        ) : (
          <p aria-live="polite">
            {failed ? '文档暂时无法加载，请重试或下载原文件。' : '正在加载原文…'}
          </p>
        )}
      </div>
    </dialog>
  );
}

export default function App() {
  const [selected, setSelected] = useState('S5');
  const [document, setDocument] = useState(null);
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );
    window.document.querySelectorAll('main > section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goGuide(code) {
    if (code === selected) scrollGuideStart();
    else setSelected(code);
  }

  const nav = [
    ['architecture', '体系架构'],
    ['mechanisms', '核心机制'],
    ['guide', '使用指南'],
    ['usage', '实战用法'],
    ['case', '案例演示'],
    ['templates', '模板库'],
  ];

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#architecture">
        跳到主要内容
      </a>
      <header className="site-header">
        <div>
          <Brand />
          <nav className={menu ? 'open' : ''} aria-label="主导航">
            {nav.map(([id, label]) => (
              <a
                key={id}
                className={activeSection === id ? 'active' : ''}
                href={'#' + id}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="nav-start" href="#install">
            开始使用 <ArrowUpRight />
          </a>
          <button
            type="button"
            className="menu-toggle icon-button"
            aria-label={menu ? '关闭导航' : '打开导航'}
            aria-expanded={menu}
            onClick={() => setMenu((x) => !x)}
          >
            {menu ? <X /> : <List />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <Reveal className="hero-copy">
            <div className="eyebrow">
              <span /> AI PRODUCT MANAGEMENT, CONNECTED.
            </div>
            <h1>
              从一个想法，
              <br />
              到一次<span>真实交付。</span>
            </h1>
            <p>
              把产品决策、AI 能力与开发验证连接起来。
              <br className="desktop-br" />
              让每一步有方法，每一次交接有依据。
            </p>
            <div className="hero-actions">
              <a className="button dark" href="#architecture">
                探索 Skill 架构 <ArrowDownRight />
              </a>
              <a className="button quiet" href="#start">
                找到我的起点 <ArrowRight />
              </a>
            </div>
          </Reveal>
          <Reveal className="hero-visual" delay={0.15}>
            <HeroMap onSelect={goGuide} />
          </Reveal>
          <div className="hero-bottom">
            <span>为 AI 产品经理与构建者设计</span>
            <div>
              <strong>17</strong>
              <span>可组合 Skills</span>
            </div>
            <div>
              <strong>12</strong>
              <span>产品阶段</span>
            </div>
            <div>
              <strong>03</strong>
              <span>AI 专题</span>
            </div>
            <div>
              <strong>{content.counts['independent-template']}</strong>
              <span>独立模板</span>
            </div>
            <a href="#templates">
              开放的方法，透明的依据 <ArrowUpRight />
            </a>
          </div>
        </section>

        <div className="intro-strip section">
          <p>
            一个人也能有条理地推进，
            <br />
            <strong>一支团队也能沿着证据协作。</strong>
          </p>
          <div>
            <span>
              <Compass /> 先对齐问题
            </span>
            <span>
              <Graph /> 再连接方案
            </span>
            <span>
              <CheckCircle /> 用证据交付
            </span>
          </div>
        </div>

        <Architecture onGuide={goGuide} onDocument={setDocument} />
        <SystemMechanisms onGuide={goGuide} onDocument={setDocument} />
        <Guide selected={selected} setSelected={setSelected} onDocument={setDocument} />
        <UsagePlaybook onGuide={goGuide} />
        <Scenarios />
        <CaseStudy />
        <Templates onDocument={setDocument} />
        <Installation onDocument={setDocument} />
      </main>

      <footer className="site-footer section">
        <div>
          <Brand />
          <p>让产品工作，有据可循。</p>
        </div>
        <div>
          <a href={content.repo} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight />
          </a>
          <button type="button" onClick={() => setDocument('ARCHITECTURE.md')}>
            架构原文 <ArrowUpRight />
          </button>
          <button type="button" onClick={() => setDocument('LICENSE')}>
            MIT License <ArrowUpRight />
          </button>
        </div>
        <div className="footer-source">
          内容快照 {content.snapshot.id}
          {content.snapshot.local_revision_count > 0 && (
            <> · {content.snapshot.local_revision_count} 个文件含未发布修订</>
          )}
          <br />
          {content.snapshot.local_revision_count > 0 ? '已发布对照版本' : 'GitHub 内容版本'}{' '}
          <a
            href={`${content.repo}/commit/${content.commit}`}
            target="_blank"
            rel="noreferrer"
          >
            {content.commit.slice(0, 7)}
          </a>{' '}
          · 教学案例为示意
          <br />
          结构参考 AIPM 课程框架与实践笔记，模板来源见仓库说明。
        </div>
      </footer>

      <DocumentDialog path={document} onClose={() => setDocument(null)} />
    </MotionConfig>
  );
}

function ArrowDownRight() {
  return <ArrowUpRight style={{ transform: 'rotate(90deg)' }} />;
}
