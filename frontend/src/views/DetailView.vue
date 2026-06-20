<template>
  <div>
    <button class="back-btn" @click="$router.push('/')">← 返回热榜</button>

    <div v-if="item" class="detail-header">
      <div class="detail-rank">#{{ item.rank }}</div>
      <div class="detail-title">{{ item.title }}</div>
      <div class="detail-meta">
        <span class="detail-stat">🔥 {{ item.heat }}</span>
        <span class="detail-stat">
          <span :class="item.trendDir">{{ item.trendDir === 'up' ? '↑' : '↓' }} {{ Math.abs(item.trend) }}%</span>
        </span>
        <span class="detail-stat tag" :class="`tag-${item.category}`">{{ item.category }}</span>
        <span class="detail-stat lifecycle">{{ item.lifecycle }}</span>
      </div>
    </div>

    <div v-if="item" class="detail-grid">
      <!-- 热度趋势 -->
      <div class="detail-card">
        <div class="detail-card-title">📈 热度趋势（24h）</div>
        <div class="trend-chart">
          <svg viewBox="0 0 240 60" class="trend-svg">
            <polyline
              :points="trendPoints"
              fill="none"
              stroke="var(--accent)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="trend-labels">
          <span>昨日</span>
          <span>现在</span>
        </div>
      </div>

      <!-- 关联话题 -->
      <div class="detail-card">
        <div class="detail-card-title">🏷️ 关联话题</div>
        <div class="tag-cloud">
          <span class="cloud-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- 数据解读层 -->
      <div class="detail-card inspire-card">
        <div class="detail-card-title">📋 数据解读</div>
        <div class="inspire-text">{{ topicBrief }}</div>
      </div>

      <!-- 内容灵感（曹植引擎） -->
      <div class="detail-card inspire-card">
        <div class="detail-card-title">💡 内容灵感建议</div>
        <div class="inspire-list">
          <div class="inspire-suggestion" v-for="(s, i) in inspireSuggestions" :key="i">
            <div class="inspire-num">#{{ i + 1 }}</div>
            <div class="inspire-body">
              <div class="inspire-angle">🎯 {{ s.angle }}</div>
              <div class="inspire-desc">{{ s.copy }}</div>
              <div class="inspire-footer">
                <span class="inspire-type">{{ s.type }}</span>
                <span class="inspire-expected">{{ s.expected }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="inspire-actions">
          <button class="inspire-action-btn">📋 复制灵感</button>
          <button class="inspire-action-btn secondary">📌 收藏话题</button>
        </div>
      </div>

      <!-- 视频数据概览 -->
      <div class="detail-card">
        <div class="detail-card-title">🎬 视频数据概览</div>
        <div class="video-stats">
          <div class="video-stat">
            <div class="video-stat-value">{{ formatNum(item.heatNum) }}</div>
            <div class="video-stat-label">总热度</div>
          </div>
          <div class="video-stat">
            <div class="video-stat-value">12.3w</div>
            <div class="video-stat-label">讨论量</div>
          </div>
          <div class="video-stat">
            <div class="video-stat-value">3.2w</div>
            <div class="video-stat-label">原创视频</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      请从热榜总览选择一个话题查看详情
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHotlistStore } from '../stores/hotlist.js'

const route = useRoute()
const hotlistStore = useHotlistStore()

const id = computed(() => Number(route.params.id))
const item = computed(() => hotlistStore.items.find(i => i.id === id.value))

const inspireSuggestions = computed(() => {
  return hotlistStore.getInspire(item.value)
})

const topicBrief = computed(() => {
  return hotlistStore.getBrief(item.value)
})

const trendData = computed(() => {
  return hotlistStore.getTrendData(id.value)
})

const trendPoints = computed(() => {
  if (!trendData.value || trendData.value.length === 0) return ''
  const max = Math.max(...trendData.value)
  const min = Math.min(...trendData.value)
  const range = max - min || 1
  const w = 240 / (trendData.value.length - 1)
  return trendData.value.map((v, i) => {
    const x = i * w
    const y = 55 - ((v - min) / range) * 48
    return `${x},${y}`
  }).join(' ')
})

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  return n.toString()
}
</script>

<style scoped>
.back-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: transparent;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.back-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.detail-header {
  margin-bottom: 24px;
}
.detail-rank {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 4px;
}
.detail-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}
.detail-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.detail-stat {
  font-size: 13px;
  color: var(--text-secondary);
}
.detail-stat .up { color: var(--up); }
.detail-stat .down { color: var(--down); }
.detail-stat.tag {
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 500;
}
.detail-stat.tag.tag-社会 { background: rgba(239, 68, 68, 0.12); color: #EF4444; }
.detail-stat.tag.tag-娱乐 { background: rgba(139, 92, 246, 0.12); color: #8B5CF6; }
.detail-stat.tag.tag-生活 { background: rgba(16, 185, 129, 0.12); color: #10B981; }
.detail-stat.lifecycle {
  padding: 1px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.detail-card {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
.detail-card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Trend chart */
.trend-chart {
  height: 72px;
  display: flex;
  align-items: center;
}
.trend-svg {
  width: 100%;
  height: 60px;
}
.trend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* Tag cloud */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cloud-tag {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
}

/* Inspire card */
.inspire-card {
  grid-column: span 2;
}
.inspire-text {
  font-size: 14px;
  line-height: 1.7;
  padding: 12px 16px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent-secondary) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-secondary) 15%, transparent);
  margin-bottom: 8px;
}

.inspire-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}
.inspire-suggestion {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid var(--card-border);
  transition: all 0.2s ease;
}
.inspire-suggestion:hover {
  border-color: var(--accent);
}
.inspire-num {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  min-width: 24px;
}
.inspire-body { flex: 1; }
.inspire-angle {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
.inspire-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.inspire-footer {
  display: flex;
  gap: 8px;
  align-items: center;
}
.inspire-type {
  padding: 1px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}
.inspire-expected {
  font-size: 11px;
  color: var(--text-muted);
}
.inspire-actions {
  display: flex;
  gap: 8px;
}
.inspire-action-btn {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: var(--accent);
  color: var(--theme-a, #fff);
}
.inspire-action-btn.secondary {
  background: transparent;
  color: var(--accent);
}

/* Video stats */
.video-stats {
  display: flex;
  gap: 20px;
}
.video-stat { flex: 1; text-align: center; }
.video-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}
.video-stat-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  .inspire-card {
    grid-column: span 1;
  }
}
</style>
