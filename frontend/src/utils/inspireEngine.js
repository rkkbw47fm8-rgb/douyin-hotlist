// 灵感建议规则引擎
// 输入：topic + category + stage → 输出3条可执行内容建议
// 纯规则匹配，先不用AI，V2再升级LLM

import { TEMPLATES, CATEGORY_MAP, STAGE_MAP } from '../assets/inspireTemplates.js'

/**
 * 获取话题的内容灵感建议
 * @param {string} topic - 话题标题
 * @param {string} category - 分类中文名（如"娱乐"、"社会"）
 * @param {string} lifecycle - 生命周期中文名（如"爆发期"、"峰值"）
 * @returns {Array} 3条灵感建议
 */
export function getInspireSuggestions(topic, category, lifecycle) {
  // 1. 映射分类和阶段
  const catKey = CATEGORY_MAP[category] || 'entertainment'
  const stageKey = STAGE_MAP[lifecycle] || 'outbreak'

  // 2. 获取对应模板
  const catTemplates = TEMPLATES[catKey]
  if (!catTemplates) return getFallback(topic)

  const stageTemplates = catTemplates[stageKey]
  if (!stageTemplates || stageTemplates.length === 0) {
    // 降级：取该分类的爆发期模板
    const fallbackTemplates = catTemplates.outbreak
    if (fallbackTemplates) {
      return fillTemplates(fallbackTemplates, topic).slice(0, 3)
    }
    return getFallback(topic)
  }

  // 3. 填充话题名，返回3条
  return fillTemplates(stageTemplates, topic).slice(0, 3)
}

/**
 * 填充模板中的 {topic} 占位符
 */
function fillTemplates(templates, topic) {
  return templates.map(t => ({
    ...t,
    copy: t.copy.replace(/\{topic\}/g, topic),
  }))
}

/**
 * 兜底模板（找不到匹配时使用）
 */
function getFallback(topic) {
  return [
    { angle: '热点解读', copy: `「${topic}」背后的故事，看完就懂`, type: '解读', expected: '基础流量' },
    { angle: '网友反应', copy: `「${topic}」网友怎么说？热评TOP5`, type: '合集', expected: '互动高' },
    { angle: '深度分析', copy: `「${topic}」为什么火？3个原因分析`, type: '分析', expected: '转发达人' },
  ]
}

/**
 * 获取话题的简要解读（供详情页数据解读层使用）
 */
export function getTopicBrief(topic, category, heat, trend) {
  const catKey = CATEGORY_MAP[category]
  const trendText = trend > 0 ? `急速上升 ${trend}%` : `下降中 ${Math.abs(trend)}%`
  const briefs = {
    entertainment: `【娱乐风向】「${topic}」当前热度${heat}，趋势${trendText}。建议关注话题背后的衍生讨论和二创内容。`,
    society: `【社会热点】「${topic}」当前热度${heat}，趋势${trendText}。社会类话题传播路径复杂，建议优先做信息整理类内容，避免争议性解读。`,
    life: `【生活趋势】「${topic}」当前热度${heat}，趋势${trendText}。生活类话题适合做教程/测评/清单型内容，实用价值决定流量。`,
    knowledge: `【知识热度】「${topic}」当前热度${heat}，趋势${trendText}。知识类内容长尾流量稳定，建议做系统性解读或可视化呈现。`,
    finance: `【财经热点】「${topic}」当前热度${heat}，趋势${trendText}。财经内容门槛较高，白话解读和"跟我有关"的角度更容易破圈。`,
  }
  return briefs[catKey] || `「${topic}」当前热度${heat}，趋势${trendText}。建议结合话题特点选择合适的内容形式切入。`
}
