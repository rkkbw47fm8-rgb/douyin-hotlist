// 模拟抖音热榜数据
export const mockHotList = [
  {
    id: 1,
    rank: 1,
    title: '#高考成绩即将公布 各地查分时间汇总',
    heat: '856.2w',
    heatNum: 8562000,
    trend: 28.5,
    trendDir: 'up',
    category: '社会',
    lifecycle: '爆发期',
    tags: ['社会', '教育'],

  },
  {
    id: 2,
    rank: 2,
    title: '#暑期档电影票房破30亿 你看了几部？',
    heat: '672.4w',
    heatNum: 6724000,
    trend: 15.2,
    trendDir: 'up',
    category: '娱乐',
    lifecycle: '峰值',
    tags: ['娱乐', '电影'],

  },
  {
    id: 3,
    rank: 3,
    title: '#City不City 海外博主带火中国旅游新梗',
    heat: '543.1w',
    heatNum: 5431000,
    trend: 42.3,
    trendDir: 'up',
    category: '生活',
    lifecycle: '快速增长',
    tags: ['生活', '旅游', '梗'],

  },
  {
    id: 4,
    rank: 4,
    title: '#AI换脸诈骗新手法 警方紧急提醒',
    heat: '432.8w',
    heatNum: 4328000,
    trend: 5.1,
    trendDir: 'down',
    category: '社会',
    lifecycle: '峰值',
    tags: ['社会', '科技', '安全'],

  },
  {
    id: 5,
    rank: 5,
    title: '#全网挑战：连续30天早睡早起',
    heat: '398.5w',
    heatNum: 3985000,
    trend: 22.7,
    trendDir: 'up',
    category: '生活',
    lifecycle: '快速增长',
    tags: ['生活', '健康', '挑战'],

  },
  {
    id: 6,
    rank: 6,
    title: '#密室大逃脱最新一期你看了吗',
    heat: '356.2w',
    heatNum: 3562000,
    trend: 8.3,
    trendDir: 'up',
    category: '娱乐',
    lifecycle: '增长',
    tags: ['娱乐', '综艺'],

  },
  {
    id: 7,
    rank: 7,
    title: '#夏日饮品测评 哪杯最好喝？',
    heat: '312.7w',
    heatNum: 3127000,
    trend: 3.2,
    trendDir: 'down',
    category: '美食',
    lifecycle: '成熟',
    tags: ['美食', '夏日', '测评'],

  },
  {
    id: 8,
    rank: 8,
    title: '#00后职场生存指南',
    heat: '289.4w',
    heatNum: 2894000,
    trend: 18.6,
    trendDir: 'up',
    category: '社会',
    lifecycle: '快速增长',
    tags: ['社会', '职场', '00后'],

  },
  {
    id: 9,
    rank: 9,
    title: '#这届年轻人开始反向消费',
    heat: '256.1w',
    heatNum: 2561000,
    trend: 11.4,
    trendDir: 'up',
    category: '财经',
    lifecycle: '增长',
    tags: ['财经', '消费', '年轻人'],

  },
  {
    id: 10,
    rank: 10,
    title: '#歌手2024 总决赛倒计时',
    heat: '234.8w',
    heatNum: 2348000,
    trend: 35.2,
    trendDir: 'up',
    category: '娱乐',
    lifecycle: '快速增长',
    tags: ['娱乐', '音乐', '综艺'],

  },
]

// 模拟热度趋势数据（24h）
export const mockTrendData = {
  1: [320, 450, 580, 620, 710, 780, 790, 810, 830, 856, 852, 840],
  2: [410, 430, 480, 510, 540, 580, 610, 640, 660, 672, 670, 665],
  3: [120, 180, 260, 340, 400, 450, 490, 520, 535, 543, 540, 538],
  4: [400, 420, 435, 440, 438, 435, 430, 432, 433, 432, 430, 428],
}

// 分类列表
export const categories = ['全部', '娱乐', '社会', '科技', '生活', '美食', '财经', '⬆ 上升']

// 统计数据
export const statsData = {
  totalTopics: 50,
  newTopics: 8,
  newTrend: 3,
  burstTopics: 5,
  burstTrend: -2,
  avgHeat: '28.4w',
  avgHeatTrend: 8,
}
