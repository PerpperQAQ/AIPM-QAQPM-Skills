# 可视化报告填写指南（Step 5）

## 怎么填（三步）

1. 把拆解文档的内容整理成一个 JSON 文件（结构见下文）。**只搬运文档里已有的结论和证据标签**，不新增事实，不改标签。
2. 生成报告（推荐用脚本，它会转义 `</`，并检查证据标签是否合法）：
   ```bash
   python3 fill_report.py data.json <产品名>-report.html
   ```
   没有 Python 时：复制 `report-template.html`，只替换 `<script id="report-data" type="application/json"> … </script>` 之间的 JSON，其余代码一律不动。JSON 里不能出现 `</script>`，要写成 `<\/script>`。
3. 检查：用浏览器打开，确认没有红字报错，五层导航和顶部「全部 / 隐藏推断 / 只看事实」开关都能用。有无头浏览器的话截一张全页长图看看。

## 通用约定

- **证据对象**：任何条目都可以带 `"ev": "fact" | "infer" | "tbd"`（对应事实 / 推断 / 待确认）和可选的 `"src": "来源说明"`。带了 `ev` 的条目会显示彩色标签，并受顶部开关控制：隐藏推断，或者只看事实。
- **文本条目**：可以写成字符串，也可以写成 `{"text": "...", "ev": "...", "src": "..."}`。文本里支持 `**加粗**` 和 `\n` 换行，其他 HTML 会被转义。
- **缺省即隐藏**：数组为空或字段缺失时，对应模块不渲染。层不全拆（只拆相关层）时，其他层只留 `key` 和 `conclusion`，或者干脆省略。

## JSON 结构

```jsonc
{
  "meta": {
    "product": "产品名",                       // 必填
    "subtitle": "一句话核心判断",
    "positioning": {"text": "一句话定位", "ev": "infer", "src": "..."},
    "purpose": "目的 / 深度", "date": "取证日期",
    "sources": ["官网", "价格页", "亲测 3 次"],
    "accent": "#ff5a1f"                         // 唯一强调色，可改
  },
  "layers": {
    "l1": {                                     // 01 用户需求场景
      "key": "首屏架构图旁的一句话", "conclusion": {"text": "...", "ev": "..."},
      "formula": {"who": "", "scene": "", "problem": "", "product": "", "ev": "", "src": ""},
      "peopleTitle": "B 端三个人",               // C 端可改成「用户画像」
      "people": [{"role": "用的人", "who": "", "why": "", "ev": ""}],
      "market": [文本条目], "differentiation": [文本条目], "seed": [文本条目],
      "competition": [{"tier": "工具 / 应用层", "players": [{"name": "", "note": "", "self": true, "ev": ""}]}],
      "business": [{"k": "收谁的钱", "v": "", "ev": "", "src": ""}]
    },
    "l2": {                                     // 02 用户层
      "key": "", "conclusion": {},
      "modules": [{"name": "", "desc": "", "ev": ""}],
      "journey": {                              // 每行固定 5 格：入口 / 输入 / 过程 / 输出 / 交付；空格写 ""
        "user": [5 个文本条目], "product": [5], "confirm": [5], "exception": [5], "note": ""
      },
      "exceptions": [{"case": "信息给不全：会追问吗", "handling": "", "verdict": "good|partial|bad|", "ev": ""}],
      "flows": [文本条目],                       // 正向 / 逆向流程
      "replaces": {"before": "", "after": "", "ev": ""},
      "scoring": {
        "scenario": "测试场景",
        "dims": [{"group": "端到端", "name": "成品质量", "max": 20, "score": 13, "note": ""}],  // 满分合计 100
        "bands": [{"min": 90, "text": "..."}],   // 可选，缺省用模板自带的四档
        "note": "", "ev": ""
      },
      "details": [文本条目]                      // 体验细节
    },
    "l3": {                                     // 03 技术层
      "key": "", "conclusion": {},
      "spectrum": {"position": "Chatbot|Workflow|Agent|多Agent", "reason": "依据", "ev": ""},
      "flow": [{"type": "input|agent|confirm|code|output", "label": "", "note": "", "back": "确认点的回退去向", "ev": ""}],
      "agentsNote": "",
      "agents": [{"name": "", "role": "", "main": true, "duty": "", "hitl": "人在哪介入", "ev": ""}],
      "hitl": [{"step": "", "ai": "", "human": "", "confirm": "", "why": "成本高/主观/担责", "ev": ""}],
      "single": [{"name": "", "arch": "Planner-Executor", "archWhy": "", "input": "", "output": "",
                  "tasks": [""], "tools": [""], "rules": [""], "ev": ""}],
      "mechanisms": [{"title": "全局上下文", "text": "", "ev": ""}],
      "issues": [{"symptom": "", "cause": "", "fix": "", "ev": "", "src": ""}]
    },
    "l4": {                                     // 04 模型层
      "key": "", "conclusion": {},
      "models": [{"step": "", "modality": "", "model": "", "source": "自研/外接", "swap": "", "reason": "", "ev": ""}],
      "routing": [文本条目],                     // 路由逻辑，以及强模型 vs 聪明流程
      "cost": {
        "task": "单任务说明", "unit": " 积分",
        "items": [{"name": "", "value": 63, "detail": "", "ev": ""}],   // 画成堆叠条，最大一项用强调色
        "formula": "成本公式", "totalLabel": "≈ 170 积分 ≈ $1.5",       // 缺省时自动求和
        "note": "", "ev": "",
        "revenue": [{"k": "积分单价", "v": "", "ev": ""}]
      },
      "saving": [文本条目]
    },
    "l5": {                                     // 05 基础层
      "key": "", "conclusion": {},
      "buyable": [文本条目], "unbuyable": [文本条目],
      "data": [{"name": "", "content": "", "source": "", "use": "", "ev": ""}],
      "flywheel": [文本条目],                    // 3–7 个环节，每个 ≤ 10 个字，可用 \n 手动换行
      "flywheelCenter": "越用越强", "flywheelNotes": [文本条目],
      "thickest": {"layer": "03 技术层", "text": "", "ev": ""}
    }
  },
  "pm": {
    "cards": [{"title": "体验设计|能力边界|信任设计", "text": "", "ev": ""}],
    "gaps": [{"gap": "出了错怎么办", "how": "", "ev": ""}],
    "ifIDo": [{"change": "", "why": "", "verify": ""}]
  },
  "todo": [{"item": "", "guess": "", "how": ""}]
}
```

## 拆解文档 → JSON 的对应关系

| 文档小节 | JSON 字段 |
|---|---|
| 一句话定位 / B 端三个人 / 竞争格局 / 商业模式 | `meta.positioning`、`l1.formula` / `l1.people` / `l1.competition` / `l1.business` |
| 用户旅程图 / 异常四条 / 测评表 | `l2.journey` / `l2.exceptions` / `l2.scoring.dims` |
| 技术流程图 / Agent 组成 / 人机分工表 / 单 Agent | `l3.flow` / `l3.agents` / `l3.hitl` / `l3.single` |
| 模型清单 / 成本估算 | `l4.models` / `l4.cost` |
| 买得到 vs 买不到 / 数据飞轮 / 最厚的一层 | `l5.buyable`、`l5.unbuyable` / `l5.flywheel` / `l5.thickest` |
| PM 结论 / 待核实清单 | `pm` / `todo` |

每层的 `conclusion` 是对这一层问题的一句话回答；`key` 是它的缩短版（≤ 30 字），显示在首屏架构图旁。

## 视觉与排版规范（改模板或手写 HTML 时必须遵守）

- **整体**：单文件长页，离线可开，不引用任何外部 CDN、字体或图片；图表一律用内联 SVG/CSS/JS 画。
- **配色**：黑白为主，只用一个强调色（默认橙 `#ff5a1f`，通过 `meta.accent` 改），不要再加第二个强调色。正文用近黑色，辅助信息用灰色；背景是浅色网格纸纹理，和课件风格一致。
- **证据色**：【事实】绿，【推断】琥珀黄，【待确认】灰。只用于证据标签，别挪作装饰色。
- **字体**：系统中文字体栈（PingFang SC、Hiragino Sans GB、Microsoft YaHei、sans-serif），层号和数字用等宽字体。标题粗、正文细，层级靠字号和字重区分，不靠颜色。
- **首屏**：产品名、一句话定位，再加五层架构总览。总览沿用课件视觉：第 01 层是黑色梯形，02–05 层是黑色圆角块；块上方小号灰色写层号，块里白色粗体写层名；每块右侧写一句关键结论，点一下跳到对应层。
- **导航**：左侧固定五层导航，跟着滚动高亮当前层；顶部工具条放“只看事实”开关。
- **每层三段式**：结论卡（一句话回答本层问题，加强调色左边框）→ 可视化主体 → 证据标签。可视化按层固定：01 定位公式卡、B 端三人卡、竞争格局；02 旅程网格（5 列 × 4 行）、异常四条、雷达图加总分徽章；03 流程图（人工确认点用菱形）、Agent 卡片墙、人机分工表、光谱定位标记；04 模型表、成本堆叠条；05 买得到 vs 买不到左右对比、数据飞轮环形图、最厚的一层。
- **卡片**：白底、细灰边、小圆角、轻阴影，留白充足，一张卡只讲一件事。框里写名词短语，不写长句。
- **适配**：宽屏双栏或多栏，窄屏和打印时改成单栏；卡片内部不分页，截长图时排版保持完整。
