import React from 'react';
import { ArrowUpRight, FileText } from '@phosphor-icons/react';
import { aiTopics, executionGuides, kitRepo, kitStages } from './execution-guide';

export function ExecutionSteps({ code }) {
  const guide = executionGuides[code];
  return <section className="execution-section" aria-label="具体执行步骤">
    <p className="guide-block-summary">{guide.steps.length} 个步骤 · 按本次范围执行，每步保留相应产出。</p>
    {guide.note && <p className="guide-context-note">{guide.note}</p>}
    <ol className="execution-steps">{guide.steps.map((step, i) => <li key={step.title}>
      <span className="step-number mono">{String(i + 1).padStart(2, '0')}</span>
      <div><h5>{step.title}</h5><p>{step.action}</p><div className="step-result"><span>本步留下</span>{step.result}</div></div>
    </li>)}</ol>
  </section>;
}

export function Deliverables({ skill, onDocument }) {
  const guide = executionGuides[skill.code];
  return <section className="deliverables-section" aria-label="会产出哪些文档">

    <p className="resource-guide-note">以下是交付结构，沿用项目已有路径；小项目可以合订。模板是填写起点，真实研究、实验和验收证据需要实际取得。</p>
    <ul className="deliverable-list">{guide.docs.map(d => <li key={d.name}>
      <div className="deliverable-title"><code>{d.name}</code><span>{d.condition}</span></div>
      <p>{d.purpose}</p>
      {d.template && <button className="text-link" onClick={() => onDocument(`${skill.id}/templates/${d.template}`)}><FileText />查看填写结构<ArrowUpRight /></button>}
    </li>)}</ul>
  </section>;
}

export function AiRequirementModules({ selected, onSelect }) {
  if (selected !== 'S8' && !aiTopics.includes(selected)) return null;
  return <section className="guide-module-panel" aria-label="S8 AI 需求模块">
    <span className="module-eyebrow">S8 / AI 需求细化与交接</span>
    <h4>{selected === 'S8' ? '按产品能力，进入对应需求模块' : '这是 S8 下可单独调用的需求模块'}</h4>
    <p>S5 可启动首稿，S8 沿用同一份文档补齐开发细节。三个模块按能力组合，不增加阶段编号，也不要求每个项目全部使用。</p>
    <div className="module-buttons">{[['AGENT', 'Agent 需求'], ['RAG', 'RAG 需求与架构'], ['AIGC', 'AIGC 需求']].map(([code, name]) => <button key={code} className={selected === code ? 'active' : ''} aria-pressed={selected === code} onClick={() => onSelect(code)}>{name}<ArrowUpRight /></button>)}</div>
    {selected !== 'S8' && <button className="text-link" onClick={() => onSelect('S8')}>返回 S8 完整交接指南<ArrowUpRight /></button>}
  </section>;
}

export function SelectionReportGuide({ onDocument, onSelect }) {
  return <section className="specialist-guide" aria-labelledby="selection-guide-heading">
    <span className="module-eyebrow">S9 / 选型报告与技术链路</span>
    <h4 id="selection-guide-heading">选型结论怎样变成报告？</h4>
    <div className="report-pair">
      <div><span className="mono">01 / 证据与结论</span><h5>09-POC与选型.md</h5><p>由 <code>$qaqpm-poc-eval</code> 按初筛 → 精筛 → 对比 → 主／辅流程完成。写清真实实验、成本、选择理由、失败与限制。</p></div>
      <div><span className="mono">02 / 技术链路讲解</span><h5>09-技术链路.html</h5><p>完整选型默认产出。以同一组件表展示架构、流程、数据流和关键调用；S5 早期小实验或仅补选型表时按交付需要生成。</p></div>
    </div>
    <h5>专门的可视化生成流程</h5>
    <ol className="plain-steps">
      <li>先在 Markdown 写清组件、主路径、数据／模型流、异常和降级。</li>
      <li>选择架构、工作流、数据流、时序等图形视图，保留证据标签。</li>
      <li>环境中有 <code>$archify</code> 时可调用生成；没有时使用 QAQPM 内置的技术链路骨架填入节点与连线，无须为此强制安装。</li>
      <li>检查 HTML 与 Markdown 一致、能离线打开，并验证页签、节点说明和主路径高亮。</li>
    </ol>
    <p className="guide-context-note">Archify 是可选的技术链路可视化工具。它不代替实际选型跑测，也不会把“尚未验证”变成“已通过”。</p>
    <div className="guide-source-links"><button onClick={() => onDocument('_shared/archify-tech-map.md')}>查看报告生成规则<ArrowUpRight /></button><button onClick={() => onDocument('qaqpm-poc-eval/templates/09-POC与选型.md')}>查看选型主报告模板<ArrowUpRight /></button><button onClick={() => onSelect('S5')}>回看 S5 如何提前发起验证<ArrowUpRight /></button></div>
  </section>;
}

export function DevelopmentWorkflow({ onDocument, onSelect }) {
  return <section className="specialist-guide" aria-labelledby="development-guide-heading">
    <span className="module-eyebrow">S10 / 开发仓库执行流程</span>
    <h4 id="development-guide-heading">从 QAQPM 产品资料，接到真实工程</h4>
    <p>QAQPM 管产品范围、需求和验收依据；指定开发仓库提供规则卡、技术手册、阶段任务和自检。Agent 需要读取并执行这些规则，而不只是下载一个文件夹。</p>
    <a className="repository-link" href={kitRepo} target="_blank" rel="noreferrer"><span>指定开发流程仓库</span><strong>PerpperQAQ / QAQPMskill-idea-to-launch-kit</strong><ArrowUpRight /></a>
    <div className="report-pair">
      <div><h5>第一次接入</h5><p>先检查已有工程及未提交改动，说明仓库用途和实际存放位置；确认后由 Agent 拉取指定 fork，核对 origin、提交和关键文件，再写 <code>dev/开发接入.md</code>。</p></div>
      <div><h5>继续已有项目</h5><p>读取已有接入记录，核对路径、来源、流程基线与当前阶段；继续原项目，不重复下载、不自动拉取更新。已有明确授权不重复询问。</p></div>
    </div>
    <p className="resource-guide-note">新产品在 <code>projects/&lt;产品名&gt;/</code> 中实施。已有工程先核对路径与验证命令是否兼容；适配未完成时如实标注，不覆盖原项目来迁就工具包。</p>
    <h5>仓库里的关键文件各做什么</h5>
    <dl className="kit-files">
      <div><dt>AGENTS.md</dt><dd>每轮启动规则、阶段要求与必须遵守的边界。</dd></div>
      <div><dt>docs/手册/</dt><dd>通用技术、前端、上线部署三份手册；按当前阶段读取。</dd></div>
      <div><dt>kit.sh</dt><dd>生成阶段任务、调用自检并维护流程状态与历史。</dd></div>
      <div><dt>verify.sh</dt><dd>执行工程检查；返回成功仍需核查真实证据和适用验收。</dd></div>
    </dl>
    <h5>六个工程阶段，如何对应 S10 → S11 → S12</h5>
    <p className="resource-guide-note">阶段 0–5 是开发仓库内部编号，与产品流程 S1–S12 是两套不同层级。阶段 2／3 可以包含多个子阶段。</p>
    <ol className="kit-stages">{kitStages.map(s => <li key={s.stage}>
      <div className="kit-stage-title"><span className="mono">阶段 {s.stage}</span><h6>{s.title}</h6><small>{s.station}</small></div>
      <p>{s.work}</p><p><b>产出：</b>{s.files}</p><p className="stage-decision"><b>怎么过：</b>{s.decision}</p>
    </li>)}</ol>
    <h5>每个子阶段都走同一执行循环</h5>
    <div className="kit-loop" aria-label="开发阶段执行循环"><span>取得任务</span><span>写文档与实现</span><span>自检与证据</span><span>用户阶段验收</span><span>进入下一阶段</span></div>
    <pre className="kit-command"><code>{'bash kit.sh 任务 <产品名>\nbash kit.sh 自检 <产品名>\n# 自检和补充核查通过，并获本阶段明确验收后：\nbash kit.sh 通过 <产品名> [下一阶段]'}</code></pre>
    <p className="resource-guide-note">这些命令由 Agent 在绑定的仓库根目录执行，产品名和有分支时的下一阶段须替换为实际值。任务、流程状态和历史由脚本维护，不手改来跳过失败。</p>
    <p className="guide-context-note">S10 的阶段自检与用户阶段验收，不代替 S11 的功能／AI 效果准入；S11 通过也不自动授权部署。只要本地产品时，可在适用验收后收尾。</p>
    <p className="resource-guide-note">仓库提供的默认路径面向 Mac 上的 Web 产品，上线手册以 CloudBase 为默认示例。已有技术基线和其他终端／平台需明确适配，不能承诺原手册已经覆盖所有工程。</p>
    <div className="guide-source-links"><button onClick={() => onDocument('_shared/development-kit-protocol.md')}>查看 QAQPM 接入协议<ArrowUpRight /></button><a href={`${kitRepo}/blob/main/README.md`} target="_blank" rel="noreferrer">查看开发仓库原说明<ArrowUpRight /></a><button onClick={() => onSelect('S11')}>继续看 S11 如何验收<ArrowUpRight /></button><button onClick={() => onSelect('S12')}>继续看 S12 如何发布与观察<ArrowUpRight /></button></div>
  </section>;
}
