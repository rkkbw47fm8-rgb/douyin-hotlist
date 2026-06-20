# 抖音热榜分析

网页端热榜数据分析小应用，支持实时热榜展示、热度趋势分析、内容灵感建议。

## 项目结构

```
douyin-hotlist/
├── frontend/          # Vue 3 + Vite + Tailwind 前端
├── backend/           # Node.js + Express API 后端
├── collector/         # Python Playwright 采集脚本
└── database/          # PostgreSQL Schema
```

## 快速启动

### 前端

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

### 后端

```bash
cd backend
npm install
npm run dev     # http://localhost:3000
```

### 采集器（可选，MVP 阶段先用模拟数据）

```bash
cd collector
pip install playwright httpx schedule
playwright install chromium
python collector.py
```

## 技术栈

- **前端**: Vue 3 + Vite + Tailwind CSS + Pinia + Vue Router
- **后端**: Node.js + Express 5
- **数据库**: PostgreSQL + Redis（缓存）
- **采集**: Python + Playwright（定时抓取）
- **部署**: 前端 Vercel / 后端 Railway / 阿里云

## 功能

- 🔥 实时热榜总览（分类筛选、热度趋势、生命周期标识）
- 📊 话题详情分析（24h热度趋势图、关联话题、灵感建议）
- 👤 个人中心（话题订阅、浏览历史、榜单配置）
- 💡 内容灵感建议（点击每条热榜获取可执行的内容策略）
- 🎨 双主题切换（深色数据仪表风 / 浅色轻资讯风）
- 📱 响应式适配（PC + 移动端）
