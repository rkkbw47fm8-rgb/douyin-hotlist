<template>
  <div class="hot-card" @click="$emit('click')">
    <div class="hot-card-top">
      <div class="hot-rank" :class="{ top3: item.rank <= 3 }">{{ item.rank }}</div>
      <div class="hot-content">
        <div class="hot-title">{{ item.title }}</div>
        <div class="hot-meta">
          <span class="hot-heat">🔥 {{ item.heat }}</span>
          <span class="hot-trend" :class="item.trendDir">{{ item.trendDir === 'up' ? '↑' : '↓' }} {{ Math.abs(item.trend) }}%</span>
        </div>
        <div class="hot-tags">
          <span class="hot-tag" :class="`tag-${item.category}`">{{ item.category }}</span>
          <span class="hot-tag lifecycle" :class="lifecycleClass">{{ lifecycleIcon }} {{ item.lifecycle }}</span>
        </div>
        <div class="hot-actions">
          <button class="inspire-btn" @click.stop="$emit('inspire')">💡 内容灵感</button>
          <button class="detail-link" @click.stop="$emit('click')">查看详情 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})

defineEmits(['click', 'inspire'])

const lifecycleIcon = computed(() => {
  const map = { '爆发期': '🔥', '峰值': '⚡', '快速增长': '📈', '增长': '📊', '成熟': '📌' }
  return map[props.item.lifecycle] || '⬡'
})

const lifecycleClass = computed(() => {
  const map = { '爆发期': 'burst', '峰值': 'peak', '快速增长': 'rapid', '增长': 'growing', '成熟': 'mature' }
  return map[props.item.lifecycle] || ''
})
</script>

<style scoped>
.hot-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--card-bg);
}
.hot-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
}
.hot-card-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.hot-rank {
  font-size: 14px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: var(--text-muted);
}
.hot-rank.top3 {
  font-size: 16px;
  color: var(--accent);
}
.hot-content { flex: 1; min-width: 0; }
.hot-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--text-primary);
}
.hot-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-muted);
}
.hot-heat { font-weight: 600; }
.hot-trend { font-weight: 500; font-size: 12px; }
.hot-trend.up { color: var(--up); }
.hot-trend.down { color: var(--down); }
.hot-tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.hot-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
}
.hot-tag.tag-社会 { background: rgba(239, 68, 68, 0.12); color: #EF4444; }
.hot-tag.tag-娱乐 { background: rgba(139, 92, 246, 0.12); color: #8B5CF6; }
.hot-tag.tag-生活 { background: rgba(16, 185, 129, 0.12); color: #10B981; }
.hot-tag.tag-科技 { background: rgba(59, 130, 246, 0.12); color: #3B82F6; }
.hot-tag.tag-美食 { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }
.hot-tag.tag-财经 { background: rgba(6, 182, 212, 0.12); color: #06B6D4; }
.hot-tag.lifecycle { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); }
.hot-tag.lifecycle.burst { background: rgba(239, 68, 68, 0.12); color: #EF4444; }
.hot-tag.lifecycle.peak { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }
.hot-tag.lifecycle.rapid { background: rgba(16, 185, 129, 0.12); color: #10B981; }
.hot-tag.lifecycle.growing { background: rgba(59, 130, 246, 0.12); color: #3B82F6; }
.hot-tag.lifecycle.mature { background: rgba(148, 163, 184, 0.15); color: var(--text-secondary); }

.hot-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.inspire-btn {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: transparent;
  color: var(--accent);
}
.inspire-btn:hover {
  background: var(--accent);
  color: var(--theme-a, #fff);
}
.detail-link {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: transparent;
  color: var(--text-secondary);
}
.detail-link:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
