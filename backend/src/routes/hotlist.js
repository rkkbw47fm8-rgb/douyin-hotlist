import { Router } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = join(__dirname, '../../data/hotlist.json')

const router = Router()

// 确保数据目录存在
import { mkdirSync } from 'fs'
const dataDir = join(__dirname, '../../data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

// GET /api/hotlist — 获取热榜列表
router.get('/', (req, res) => {
  const { category } = req.query
  let list = []
  const stats = { totalTopics: 0, newTopics: 0, burstTopics: 0, avgHeat: '0' }

  // 尝试读取真实数据
  if (existsSync(DATA_FILE)) {
    try {
      const raw = readFileSync(DATA_FILE, 'utf-8')
      const data = JSON.parse(raw)
      list = data.list || []
    } catch (e) {
      // fallback to mock
    }
  }

  // 如果没有真实数据，用 mock
  if (list.length === 0) {
    list = getMockList()
  }

  // 分类筛选
  if (category && category !== '全部') {
    if (category === '⬆ 上升') {
      list = list.filter(i => i.trendDir === 'up')
    } else {
      list = list.filter(i => i.category === category)
    }
  }

  // 计算统计
  stats.totalTopics = list.length
  stats.newTopics = Math.ceil(list.length * 0.15)
  stats.burstTopics = list.filter(i => (i.trend || 0) > 20).length
  const heats = list.map(i => parseFloat(String(i.heat || '0').replace('w', ''))).filter(Boolean)
  stats.avgHeat = heats.length ? (heats.reduce((a, b) => a + b, 0) / heats.length).toFixed(1) + 'w' : '0'

  res.json({ code: 0, data: { list, stats, total: list.length } })
})

// POST /api/hotlist/sync — 采集器推送数据
router.post('/sync', (req, res) => {
  const { items } = req.body
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ code: 400, message: '无效数据' })
  }

  // 处理数据
  const list = items.map((item, i) => ({
    id: i + 1,
    rank: i + 1,
    title: item.title || `话题${i+1}`,
    heat: item.heat || '0',
    heatNum: parseInt(String(item.heat || '0').replace(/[^0-9]/g, '')) || 0,
    trend: item.trend || 0,
    trendDir: (item.trend || 0) >= 0 ? 'up' : 'down',
    category: item.category || '娱乐',
    lifecycle: item.lifecycle || '增长',
    tags: item.tags || [item.category || '娱乐'],
    updatedAt: new Date().toISOString(),
  }))

  // 存文件
  writeFileSync(DATA_FILE, JSON.stringify({ list, updatedAt: new Date().toISOString() }, null, 2))

  res.json({ code: 0, message: `同步成功：${list.length} 条`, count: list.length })
})

// GET /api/hotlist/:id — 详情
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  let list = []
  if (existsSync(DATA_FILE)) {
    try {
      const raw = readFileSync(DATA_FILE, 'utf-8')
      list = JSON.parse(raw).list || []
    } catch (e) {}
  }
  if (list.length === 0) list = getMockList()
  const item = list.find(i => i.id === id)
  if (!item) return res.status(404).json({ code: 404, message: '话题不存在' })
  res.json({ code: 0, data: item })
})

// GET /api/hotlist/:id/trend — 趋势
router.get('/:id/trend', (req, res) => {
  const trends = {
    1: [320, 450, 580, 620, 710, 780, 790, 810, 830, 856, 852, 840],
    2: [410, 430, 480, 510, 540, 580, 610, 640, 660, 672, 670, 665],
    3: [120, 180, 260, 340, 400, 450, 490, 520, 535, 543, 540, 538],
    4: [400, 420, 435, 440, 438, 435, 430, 432, 433, 432, 430, 428],
  }
  const trend = trends[Number(req.params.id)] || []
  res.json({ code: 0, data: trend })
})

function getMockList() {
  return [
    { id: 1, rank: 1, title: '#高考成绩即将公布 各地查分时间汇总', heat: '856.2w', heatNum: 8562000, trend: 28.5, trendDir: 'up', category: '社会', lifecycle: '爆发期', tags: ['社会', '教育'] },
    { id: 2, rank: 2, title: '#暑期档电影票房破30亿 你看了几部？', heat: '672.4w', heatNum: 6724000, trend: 15.2, trendDir: 'up', category: '娱乐', lifecycle: '峰值', tags: ['娱乐', '电影'] },
    { id: 3, rank: 3, title: '#City不City 海外博主带火中国旅游新梗', heat: '543.1w', heatNum: 5431000, trend: 42.3, trendDir: 'up', category: '生活', lifecycle: '快速增长', tags: ['生活', '旅游', '梗'] },
  ]
}

export default router
