<template>
  <div>
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <div class="page-title">
          🔥 热榜总览
          <span class="page-subtitle">实时更新 · 每5分钟自动刷新</span>
        </div>
      </div>
      <div class="filter-bar">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: hotlistStore.currentCategory === cat }"
          @click="hotlistStore.setCategory(cat)"
        >
          {{ cat === '⬆ 上升' ? '⬆ ' + cat : cat }}
        </button>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-label">总话题数</div>
        <div class="stat-value">{{ stats.totalTopics }}</div>
        <div class="stat-change up">↑ 12 较昨日</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">新生话题</div>
        <div class="stat-value">{{ stats.newTopics }}</div>
        <div class="stat-change up">↑ {{ stats.newTrend }} 较昨日</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">爆发话题</div>
        <div class="stat-value">{{ stats.burstTopics }}</div>
        <div class="stat-change" :class="stats.burstTrend >= 0 ? 'up' : 'down'">
          {{ stats.burstTrend >= 0 ? '↑' : '↓' }} {{ Math.abs(stats.burstTrend) }} 较昨日
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">平均热度</div>
        <div class="stat-value">{{ stats.avgHeat }}</div>
        <div class="stat-change up">↑ {{ stats.avgHeatTrend }}%</div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="hotlistStore.loading" class="loading">加载中...</div>

    <!-- Hot List -->
    <div v-else class="hot-list">
      <HotCard
        v-for="item in hotlistStore.filteredItems"
        :key="item.id"
        :item="item"
        @click="goDetail(item)"
        @inspire="showInspire(item)"
      />
    </div>

    <!-- 💡 内容灵感弹窗（曹植引擎驱动） -->
    <div v-if="inspireItem" class="modal-overlay" @click.self="inspireItem = null">
      <div class="modal-content">
        <div class="modal-header">
          <span>💡 内容灵感</span>
          <button class="modal-close" @click="inspireItem = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-topic">#{{ inspireItem.title }}</div>
          <div class="modal-category-tag">{{ categoryLabel }} · {{ stageLabel }}</div>

          <!-- 灵感建议卡片列表（曹植规则引擎输出） -->
          <div class="inspire-list">
            <div class="inspire-card" v-for="(s, i) in inspireSuggestions" :key="i">
              <div class="inspire-card-angle">🎯 {{ s.angle }}</div>
              <div class="inspire-card-copy">{{ s.copy }}</div>
              <div class="inspire-card-meta">
                <span class="inspire-badge">{{ s.type }}</span>
                <span class="inspire-expected">{{ s.expected }}</span>
              </div>
            </div>
          </div>

          <!-- 数据解读层 -->
          <div class="modal-brief">
            <div class="modal-brief-label">📋 数据解读</div>
            <div class="modal-brief-text">{{ topicBrief }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHotlistStore } from '../stores/hotlist.js'
import { CATEGORIES, STAGES } from '../assets/inspireTemplates.js'
import { categories, statsData } from '../assets/mockData.js'
import HotCard from '../components/HotCard.vue'

const router = useRouter()
const hotlistStore = useHotlistStore()
const stats = statsData
const inspireItem = ref(null)

const inspireSuggestions = computed(() => {
  if (!inspireItem.value) return []
  return hotlistStore.getInspire(inspireItem.value)
})

const topicBrief = computed(() => {
  if (!inspireItem.value) return ''
  return hotlistStore.getBrief(inspireItem.value)
})

const categoryLabel = computed(() => {
  if (!inspireItem.value) return ''
  return inspireItem.value.category
})

const stageLabel = computed(() => {
  if (!inspireItem.value) return ''
  return inspireItem.value.lifecycle
})

function goDetail(item) {
  hotlistStore.selectItem(item)
  router.push(`/detail/${item.id}`)
}

function showInspire(item) {
  inspireItem.value = item
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-subtitle {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--card-border);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: none;
  color: var(--text-secondary);
}
.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--theme-a, #fff);
}
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.stat-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
.stat-label {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-muted);
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}
.stat-change {
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-top: 2px;
}
.stat-change.up { color: var(--up); }
.stat-change.down { color: var(--down); }
.hot-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 12px;
}
.loading {
  text-align: center;
  padding: 48px;
  color: var(--text-muted);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
}
.modal-content {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}
.modal-close {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-muted);
  padding: 4px;
}
.modal-topic {
  font-size: 14px;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 4px;
}
.modal-category-tag {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

/* 灵感建议卡片列表 */
.inspire-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}
.inspire-card {
  padding: 14px;
  border-radius: 10px;
  border: 1px solid var(--card-border);
  background: color-mix(in srgb, var(--card-bg) 50%, var(--bg));
  transition: all 0.2s ease;
}
.inspire-card:hover {
  border-color: var(--accent);
}
.inspire-card-angle {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}
.inspire-card-copy {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.inspire-card-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
.inspire-badge {
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

/* 数据解读 */
.modal-brief {
  padding: 14px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent-secondary) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-secondary) 15%, transparent);
}
.modal-brief-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.modal-brief-text {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .hot-list {
    grid-template-columns: 1fr;
  }
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
