# eval/ 目录约定（S7）

```
eval/
├── README.md                 # 本项目评测说明与版本
├── rubric.md                 # 标注/评分规范（链 07）
├── gold/
│   └── v0/                   # 黄金集 v0
│       ├── manifest.csv      # 题号,题型,路径,维度
│       └── items/            # 每题一个 md/json
├── runs/                     # S11/S10 跑分记录
│   └── YYYYMMDD-HHMM/
│       ├── scores.csv
│       └── notes.md
└── badcases/                 # 从线上/验收回流
```

`07-评测设计与测试集.md` 必须写明 `gold_set_v0_path`。
