"""Build a resource catalog from a checkout, comparing every source with a chosen Git revision."""
from pathlib import Path
import argparse, hashlib, json, subprocess
base=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-root',type=Path,default=base.parent,help='Directory containing qaqpm-* and _shared (default: repository root)')
parser.add_argument('--repository',type=Path,default=base.parent,help='Git checkout used for source links and repository documents')
parser.add_argument('--ref',default='HEAD',help='Published source revision to compare with (default: HEAD)')
args=parser.parse_args()
source=args.source_root.resolve()
release=args.repository.resolve()
if not (source/'qaqpm-product-lifecycle/SKILL.md').is_file():
    parser.error('Source root must contain qaqpm-product-lifecycle/SKILL.md; use --source-root for a separate maintenance directory.')
commit=subprocess.check_output(['git','rev-parse','--verify',args.ref+'^{commit}'],cwd=release,text=True).strip()
repo='https://github.com/PerpperQAQ/AIPM-QAQPM-Skills'
# Compare with committed Git objects, not possibly edited files in a checkout.
tree={}
for item in subprocess.check_output(['git','ls-tree','-rz',commit],cwd=release).split(b'\0'):
    if item:
        meta,path=item.split(b'\t',1);tree[path.decode()]=meta.decode().split()[2]
files={}; resources=[]; manifest=[]; skills={}; source_meta={}
outline_sections={
 'problem-define':'## 6. 输出文档大纲（01-问题定义卡.md）',
 'user-research':'## 6. 输出大纲（02-用户研究.md）',
 'requirements-backlog':'## 6. 输出大纲',
 'competitor-analysis':'## 6. 输出大纲',
 'mvp-scope':'## 4. 输出与模板',
 'go-nogo':'## 6. 输出文档大纲（06-立项报告.md）',
 'eval-design':'## 6. 输出大纲',
 'prd-dual':'## 6. 输出：文件级清单',
 'poc-eval':'## 6. 输出大纲',
 'dev-track':'## 5. 交付与资料复用',
 'acceptance':'## 6. 输出大纲',
 'launch-observe':'## 5. 输出与模板',
 'product-lifecycle':'## 6. 输出文档大纲',
 'agent-requirements':'## 模板与读取条件',
 'rag-requirements':'## 模板与读取条件',
 'aigc-requirements':'## 模板与读取条件',
 'tech-risk-review':'## 交付给产品负责人',
}
def add_file(rel,data):
    path=str(rel);text=data.decode();files[path]=text
    digest=hashlib.sha256(data).hexdigest()
    git_blob=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
    published=tree.get(path)==git_blob
    entry={'path':path,'sha256':digest,'publication':'published' if published else 'local-revision','published_commit':commit if published else None}
    manifest.append(entry);source_meta[path]=entry
    dest=base/'public/source'/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
    return text
source_dirs=[p for p in source.iterdir() if p.is_dir() and (p.name=='_shared' or p.name.startswith('qaqpm-'))]
for p in sorted(p for directory in source_dirs for p in directory.rglob('*')):
    if not p.is_file() or p.suffix not in ('.md','.csv'):continue
    rel=p.relative_to(source)
    if '_shared' in rel.parts and rel.parts[0]!='_shared':continue
    if p.name!='SKILL.md' and 'templates' not in rel.parts and rel.parts[0]!='_shared':continue
    if p.name=='SKILL.md' and len(rel.parts)!=2:continue
    text=add_file(rel,p.read_bytes())
    heading=next((x.lstrip('# ').strip() for x in text.splitlines() if x.startswith('# ')),p.stem)
    if p.name=='SKILL.md':skills[rel.parts[0]]=text
    elif 'templates' in rel.parts:
        redirect=p.name=='shared-decision-pack.md'
        kind='redirect' if redirect else 'companion' if p.suffix=='.csv' else 'independent-template'
        # A heading-only section file is still an independent file, but is not a detailed form.
        skeleton_names={
          '08-Agent规范/01-概述与边界.md','08-Agent规范/02-用户流程.md','08-Agent规范/03-信息架构.md','08-Agent规范/05-数据模型.md','08-Agent规范/06-接口.md','08-Agent规范/07-UI与Design-Tokens.md','08-Agent规范/08-状态与异常.md','08-Agent规范/09-AI行为与兜底.md','08-Agent规范/10-验收用例.md',
          '08-PRD/01-背景与目标.md','08-PRD/02-用户与场景.md','08-PRD/03-范围-含不做.md','08-PRD/05-业务规则.md','08-PRD/07-非功能.md','08-PRD/09-里程碑.md','08-PRD/10-风险与开放问题.md'
        }
        audited_skeleton=rel.parts[0]=='qaqpm-prd-dual' and '/'.join(rel.parts[2:]) in skeleton_names
        body=[l.strip() for l in text.splitlines() if l.strip() and not l.lstrip().startswith(('#','>','```'))]
        depth='outline-skeleton' if kind=='independent-template' and (not body or audited_skeleton) else 'field-template' if kind=='independent-template' else None
        resources.append({'id':str(rel),'path':str(rel),'skills':[rel.parts[0]],'skill':rel.parts[0],'title':p.stem,'heading':heading,'format':p.suffix[1:],'kind':kind,'depth':depth})
    elif rel.parts[0]=='_shared':
        resources.append({'id':str(rel),'path':str(rel),'skills':[],'title':heading,'heading':heading,'format':'md','kind':'shared-rule'})
for skill,text in skills.items():
    section=outline_sections[skill.removeprefix('qaqpm-')]
    assert section in text, (skill,section)
    resources.append({'id':'outline:'+skill,'path':skill+'/SKILL.md','skills':[skill],'skill':skill,'title':section.removeprefix('## '),'heading':section,'section':section,'format':'md','kind':'outline'})
for r in resources:
    if r['kind']=='shared-rule':
        filename=Path(r['path']).name
        r['skills']=[skill for skill,text in skills.items() if filename in text or filename in ('labels.md','handoff-schema.md')]
    r['publication']=source_meta[r['path']]['publication']
for name in ['README.md','ARCHITECTURE.md','LICENSE']:
    # Include current repository documents and detect their uncommitted changes too.
    data=(release/name).read_bytes()
    add_file(Path(name),data)
visible=[r for r in resources if r['kind']!='redirect']
counts={kind:sum(r['kind']==kind for r in resources) for kind in ['independent-template','outline','shared-rule','companion','redirect']}
counts['outline-skeleton']=sum(r.get('depth')=='outline-skeleton' for r in resources)
counts['field-template']=sum(r.get('depth')=='field-template' for r in resources)
snapshot_hash=hashlib.sha256(json.dumps(sorted((p,m['sha256']) for p,m in source_meta.items()),ensure_ascii=False).encode()).hexdigest()
revision_count=sum(m['publication']=='local-revision' for m in manifest)
output={'commit':commit,'repo':repo,'snapshot':{'id':snapshot_hash[:12],'sha256':snapshot_hash,'local_revision_count':revision_count},'counts':counts,'resources':visible,'templates':[r for r in visible if r['kind']=='independent-template'],'sources':source_meta,'redirects':[r for r in resources if r['kind']=='redirect']}
(base/'src/content.json').write_text(json.dumps(output,ensure_ascii=False))
(base/'source-manifest.json').write_text(json.dumps({'snapshot':output['snapshot'],'base_commit':commit,'counts':counts,'files':manifest},ensure_ascii=False,indent=2))
# Remove stale public source files when a source was removed or renamed.
for p in (base/'public/source').rglob('*'):
    if p.is_file() and str(p.relative_to(base/'public/source')) not in files:p.unlink()
print(json.dumps({'counts':counts,'documents':len(files),'snapshot':output['snapshot']},ensure_ascii=False))
