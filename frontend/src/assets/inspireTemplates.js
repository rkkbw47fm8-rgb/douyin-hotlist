// 曹植-content · 灵感模板库
// 按照 category × stage 维度组织，72条规则模板
// 匹配逻辑：输入 topic + category + stage → 输出3条建议

export const CATEGORIES = {
  entertainment: { label: '娱乐', emoji: '🎭' },
  society: { label: '社会', emoji: '📰' },
  life: { label: '生活', emoji: '🍽️' },
  knowledge: { label: '知识', emoji: '📚' },
  finance: { label: '财经', emoji: '💼' },
  sports_game: { label: '体育·游戏', emoji: '⚽' },
}

export const STAGES = {
  bud: { label: '萌芽', emoji: '🌱' },
  outbreak: { label: '爆发', emoji: '🔥' },
  peak: { label: '高峰', emoji: '📈' },
  decline: { label: '衰退', emoji: '📉' },
  resurgence: { label: '复燃', emoji: '🔄' },
}

// 完整模板库
export const TEMPLATES = {
  // ====== 🎭 娱乐 ======
  entertainment: {
    bud: [
      { angle: '快速吃瓜', copy: '「{topic}，一句话说清楚发生了什么」', type: '短视频', expected: '首发快，蹭到就是赚到' },
      { angle: '八卦盘点', copy: '「{topic}背后的人物关系网，一张图看懂」', type: '信息图', expected: '收藏型，长尾流量大' },
      { angle: '网友反应', copy: '「{topic}热搜下的网友神评论，笑死了」', type: '图文合集', expected: '互动性强，评论区二次发酵' },
    ],
    outbreak: [
      { angle: '深度解析', copy: '「{topic}为什么全网都在刷？3个原因」', type: '分析视频', expected: '专业感，转发达人' },
      { angle: '情绪共鸣', copy: '「看完{topic}，我的反应跟所有人一样」', type: '情景短片', expected: '播放量高' },
      { angle: '多角度吃瓜', copy: '「{topic}的几个版本，你信哪个？」', type: '投票/讨论', expected: '互动率飙升' },
    ],
    peak: [
      { angle: '全盘回顾', copy: '「{topic}来龙去脉，看这一篇够了」', type: '长图文/视频', expected: '搜一搜长尾' },
      { angle: '同款推荐', copy: '「{topic}同款合集🔗」', type: '种草列表', expected: '带货潜力' },
      { angle: '二创挑战', copy: '「来，用{topic}的方式打开XXX」', type: '创意模仿', expected: '跟拍量大' },
    ],
    decline: [
      { angle: '回忆杀', copy: '「{topic}你刷到了吗？上一轮追这个还是XXX」', type: '回忆短片', expected: '精准粉丝' },
      { angle: '冷知识', copy: '「{topic}里你可能没注意到的3个细节」', type: '小知识', expected: '差异化内容' },
      { angle: '终局复盘', copy: '「{topic}结束后，谁赢谁输？」', type: '盘点', expected: '争议性互动' },
    ],
    resurgence: [
      { angle: '新角度', copy: '「{topic}又上热搜了？这次不一样」', type: '对比分析', expected: '新解读' },
      { angle: '再盘点', copy: '「{topic}再刷屏，你还记得第一期吗」', type: '老内容翻新', expected: '怀旧+新流量' },
      { angle: '跟新动态', copy: '「{topic}最新进展，你漏了什么」', type: '快讯', expected: '信息增量' },
    ],
  },

  // ====== 📰 社会 ======
  society: {
    bud: [
      { angle: '信息整理', copy: '「{topic}一图看懂」', type: '信息图', expected: '收藏型，首发优势' },
      { angle: '实用攻略', copy: '「{topic}来了，普通人应该怎么做」', type: '行动指南', expected: '实用性强' },
      { angle: '科普解读', copy: '「{topic}到底是什么意思？3分钟搞懂」', type: '科普视频', expected: '知识型长尾' },
    ],
    outbreak: [
      { angle: '多维分析', copy: '「{topic}各方怎么看？一次性梳理」', type: '多视角整理', expected: '平衡客观' },
      { angle: '普通人故事', copy: '「{topic}下的真实经历，我采访了3个人」', type: '采访/讲述', expected: '情感共鸣' },
      { angle: '时间线', copy: '「{topic}完整时间线，从开始到现在」', type: '时间轴', expected: '信息增量' },
    ],
    peak: [
      { angle: '后续影响', copy: '「{topic}后续影响，长期来看意味着什么」', type: '深度文章', expected: '专业思考' },
    ],
    decline: [
      { angle: '别忘了', copy: '「{topic}之后，别忘了这些」', type: '提醒型清单', expected: '长尾提醒' },
    ],
    resurgence: [
      { angle: '新进展', copy: '「{topic}新进展，跟上变化」', type: '更新快讯', expected: '信息增量' },
    ],
  },

  // ====== 🍽️ 生活 ======
  life: {
    bud: [
      { angle: '教程攻略', copy: '「{topic}保姆级教程，看完就会」', type: '步骤教程', expected: '收藏高' },
      { angle: '好物推荐', copy: '「{topic}必备好物清单，亲测不踩雷」', type: '好物合集', expected: '种草转化' },
      { angle: '避坑指南', copy: '「{topic}坑太多？这3个千万别踩」', type: '避坑清单', expected: '实用性强' },
    ],
    outbreak: [
      { angle: '对比测评', copy: '「{topic}测评，5款全网最火实测」', type: '对比视频', expected: '客观种草' },
      { angle: '生活技巧', copy: '「{topic}带来的灵感，这3个技巧太绝」', type: '技巧分享', expected: '实用价值' },
      { angle: '省钱攻略', copy: '「{topic}怎么玩最省钱？精打细算版」', type: '省钱指南', expected: '受众广' },
    ],
    peak: [
      { angle: '进阶玩法', copy: '「{topic}高阶版，普通人也能做」', type: '进阶教程', expected: '差异化' },
      { angle: '故事分享', copy: '「{topic}改变了我的生活方式」', type: '个人叙述', expected: '真实感' },
      { angle: '资源打包', copy: '「{topic}全套资源包，拿走不谢」', type: '资源列表', expected: '涨粉利器' },
    ],
    decline: [
      { angle: '长期报告', copy: '「{topic}用一段时间后的真实感受」', type: '长期使用报告', expected: '真实反馈' },
    ],
    resurgence: [
      { angle: '新旧对比', copy: '「{topic}又火了？这次迭代了什么」', type: '对比分析', expected: '迭代分析' },
    ],
  },

  // ====== 📚 知识 ======
  knowledge: {
    bud: [
      { angle: '快速科普', copy: '「{topic}3分钟速通，零基础也能懂」', type: '速成视频', expected: '收藏型' },
      { angle: '一张图', copy: '「{topic}核心知识点，一张图搞定」', type: '知识卡片', expected: '长尾流量' },
      { angle: '常见误区', copy: '「{topic}最常见的3个错误理解」', type: '误区辨析', expected: '互动性强' },
    ],
    outbreak: [
      { angle: '深度解读', copy: '「{topic}完整解读，这一篇就够了」', type: '长文/系列', expected: '专业度' },
      { angle: '应用场景', copy: '「{topic}在实际中的应用，看完就懂」', type: '案例分析', expected: '实用感' },
      { angle: '书单推荐', copy: '「{topic}相关的5本书，入门到精通」', type: '书单列表', expected: '高收藏' },
    ],
    peak: [
      { angle: '来龙去脉', copy: '「{topic}的来龙去脉，历史演进」', type: '时间线', expected: '系统性' },
    ],
    decline: [
      { angle: '深度思考', copy: '「{topic}后记，值得记住的3个思考」', type: '深度思考文', expected: '差异化' },
    ],
    resurgence: [
      { angle: '新视角', copy: '「{topic}再次引发关注，这次要看什么」', type: '新解读', expected: '信息增量' },
    ],
  },

  // ====== 💼 财经 ======
  finance: {
    bud: [
      { angle: '白话解读', copy: '「{topic}一句话说清楚」', type: '15s短视频', expected: '门槛低，传播快' },
      { angle: '对你影响', copy: '「{topic}普通人会受影响吗？」', type: '亲民科普', expected: '受众广' },
      { angle: '趋势分析', copy: '「{topic}意味着什么？3个判断」', type: '分析', expected: '专业度' },
    ],
    outbreak: [
      { angle: '深度拆解', copy: '「{topic}产业链拆解，谁赢谁输」', type: '长视频/图文', expected: '专业粉丝' },
      { angle: '数据可视化', copy: '「{topic}关键数据，一张图看懂」', type: '图表', expected: '传播性强' },
      { angle: '投资策略', copy: '「{topic}下怎么操作？3个策略」', type: '策略指南', expected: '精准受众' },
    ],
    peak: [
      { angle: '长期跟踪', copy: '「{topic}后续影响，长期跟踪分析」', type: '跟踪报告', expected: '深度' },
    ],
    decline: [
      { angle: '复盘总结', copy: '「{topic}复盘，学到的3个教训」', type: '复盘文章', expected: '干货' },
    ],
    resurgence: [
      { angle: '再解读', copy: '「{topic}回归，这次有什么不同？」', type: '对比分析', expected: '新观察' },
    ],
  },

  // ====== ⚽ 体育·游戏 ======
  sports_game: {
    bud: [
      { angle: '战报速递', copy: '「{topic}结果速递，一句话说清楚」', type: '战报/速递', expected: '首发快' },
      { angle: '亮点集锦', copy: '「{topic}高光时刻TOP5」', type: '集锦', expected: '传播性强' },
      { angle: '赛前分析', copy: '「{topic}赛前前瞻，谁更有优势？」', type: '前瞻分析', expected: '精准受众' },
    ],
    outbreak: [
      { angle: '深度复盘', copy: '「{topic}完整复盘，关键转折点」', type: '复盘视频', expected: '专业感' },
      { angle: '数据统计', copy: '「{topic}关键数据一览」', type: '数据解读', expected: '硬核粉丝' },
      { angle: '争议讨论', copy: '「{topic}最有争议的3个瞬间」', type: '讨论帖', expected: '互动率高' },
    ],
    peak: [
      { angle: '选手故事', copy: '「{topic}选手/战队背后的故事」', type: '人物志', expected: '情感共鸣' },
      { angle: '后续影响', copy: '「{topic}对后续赛程的影响分析」', type: '影响分析', expected: '深度' },
      { angle: '表情包', copy: '「{topic}名场面表情包合集」', type: '表情包', expected: '传播性强' },
    ],
    decline: [
      { angle: '经典回顾', copy: '「{topic}经典时刻回顾」', type: '回顾', expected: '怀旧' },
      { angle: '假设分析', copy: '「如果{topic}中XXX没发生，会怎样？」', type: '假设分析', expected: '讨论度高' },
    ],
    resurgence: [
      { angle: '新赛程关联', copy: '「{topic}与新赛程的关联，看点分析」', type: '关联分析', expected: '信息增量' },
      { angle: '名场面回看', copy: '「当年{topic}这个时候…经典不会忘记」', type: '回忆向', expected: '情感共鸣' },
    ],
  },
}

// 话题分类到模板分类的映射
export const CATEGORY_MAP = {
  '娱乐': 'entertainment',
  '社会': 'society',
  '生活': 'life',
  '知识': 'knowledge',
  '财经': 'finance',
  '美食': 'life',       // 美食映射到生活
  '科技': 'knowledge',  // 科技映射到知识
  '教育': 'knowledge',  // 教育映射到知识
}

// 热度阶段映射
export const STAGE_MAP = {
  '萌芽': 'bud',
  '爆发期': 'outbreak',
  '爆发': 'outbreak',
  '峰值': 'peak',
  '高峰': 'peak',
  '增长': 'peak',
  '快速增长': 'outbreak',
  '成熟': 'peak',
  '衰退': 'decline',
  '复燃': 'resurgence',
}
