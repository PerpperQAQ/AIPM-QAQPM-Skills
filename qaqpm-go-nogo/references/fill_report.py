#!/usr/bin/env python3
"""把拆解数据 JSON 填进 report-template.html，生成单文件报告。
用法: python3 fill_report.py data.json out.html [--template report-template.html]
"""
import json, re, sys, os

def main():
    args = sys.argv[1:]
    if len(args) < 2:
        sys.exit(__doc__)
    tpl = os.path.join(os.path.dirname(os.path.abspath(__file__)), "report-template.html")
    if "--template" in args:
        i = args.index("--template"); tpl = args[i + 1]; del args[i:i + 2]
    data_path, out_path = args[0], args[1]
    data = json.load(open(data_path, encoding="utf-8"))  # 解析失败会直接报错
    warn = []
    if not data.get("meta", {}).get("product"):
        warn.append("meta.product 为空")
    for k in ["l1", "l2", "l3", "l4", "l5"]:
        lay = data.get("layers", {}).get(k)
        if not lay:
            warn.append(f"layers.{k} 缺失（该层只会显示标题）")
        elif not lay.get("conclusion"):
            warn.append(f"layers.{k}.conclusion 缺失")
    bad = set()
    def walk(o, path):
        if isinstance(o, dict):
            if "ev" in o and o["ev"] not in ("fact", "infer", "tbd"):
                bad.add(f"{path}.ev={o['ev']!r}")
            for kk, v in o.items(): walk(v, f"{path}.{kk}")
        elif isinstance(o, list):
            for i, v in enumerate(o): walk(v, f"{path}[{i}]")
    walk(data, "$")
    warn += [f"非法证据标签 {b}（只能是 fact/infer/tbd）" for b in sorted(bad)]
    payload = json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")
    html = open(tpl, encoding="utf-8").read()
    pat = re.compile(r'(<script id="report-data" type="application/json">)(.*?)(</script>)', re.S)
    if not pat.search(html):
        sys.exit("模板里找不到 report-data 数据块")
    html = pat.sub(lambda m: m.group(1) + "\n" + payload + "\n" + m.group(3), html, count=1)
    open(out_path, "w", encoding="utf-8").write(html)
    for w in warn: print("警告:", w)
    print("已生成:", out_path)

if __name__ == "__main__":
    main()
