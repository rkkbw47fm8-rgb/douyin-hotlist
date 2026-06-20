<template>
  <div>
    <div class="page-header">
      <div>
        <div class="page-title">
          👤 个人中心
          <span class="page-subtitle">管理你的热榜订阅与偏好</span>
        </div>
      </div>
    </div>

    <div class="profile-grid">
      <!-- User Info -->
      <div class="profile-card">
        <div class="profile-avatar">👤</div>
        <div class="profile-name">数据分析师</div>
        <div class="profile-bio">关注热点趋势 · 寻找内容机会</div>
      </div>

      <!-- Subscribed Topics -->
      <div class="profile-card">
        <div class="profile-card-title">🔔 关注话题</div>
        <div class="subscribed-list">
          <div class="subscribed-item" v-for="topic in subscribedTopics" :key="topic">
            <span>{{ topic }}</span>
            <button class="unsub-btn">✕</button>
          </div>
        </div>
        <div class="add-topic-row">
          <input
            v-model="newTopic"
            class="add-topic-input"
            placeholder="添加关注话题..."
            @keyup.enter="addTopic"
          />
        </div>
      </div>

      <!-- History -->
      <div class="profile-card">
        <div class="profile-card-title">📋 浏览历史</div>
        <div class="history-list">
          <div
            class="history-item"
            v-for="item in hotlistStore.items.slice(0, 5)"
            :key="item.id"
            @click="$router.push(`/detail/${item.id}`)"
          >
            <div class="history-rank">#{{ item.rank }}</div>
            <div class="history-title">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <!-- Custom List Config -->
      <div class="profile-card">
        <div class="profile-card-title">⚙️ 榜单配置</div>
        <div class="config-row">
          <label>默认显示条数</label>
          <select class="config-select" v-model="config.count">
            <option :value="10">10条</option>
            <option :value="20">20条</option>
            <option :value="50">50条</option>
          </select>
        </div>
        <div class="config-row">
          <label>推送频率</label>
          <select class="config-select" v-model="config.push">
            <option value="实时">实时</option>
            <option value="每小时">每小时</option>
            <option value="每日">每日</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHotlistStore } from '../stores/hotlist.js'

const hotlistStore = useHotlistStore()

const subscribedTopics = ref(['City不City', 'AI换脸', '暑期档电影'])
const newTopic = ref('')
const config = reactive({
  count: 20,
  push: '每日',
})

function addTopic() {
  const t = newTopic.value.trim()
  if (t && !subscribedTopics.value.includes(t)) {
    subscribedTopics.value.push(t)
    newTopic.value = ''
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
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

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.profile-card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
}
.profile-card:first-child {
  text-align: center;
}
.profile-avatar {
  font-size: 48px;
  margin-bottom: 8px;
}
.profile-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.profile-bio {
  font-size: 13px;
  color: var(--text-muted);
}

.profile-card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Subscribed */
.subscribed-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.subscribed-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  font-size: 13px;
  color: var(--accent);
}
.unsub-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-muted);
  padding: 0;
}
.add-topic-row {
  display: flex;
}
.add-topic-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  font-size: 13px;
  font-family: inherit;
  background: var(--input-bg);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease;
}
.add-topic-input:focus {
  border-color: var(--accent);
}

/* History */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.history-item:hover {
  background: var(--hover);
}
.history-rank {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  min-width: 24px;
}
.history-title {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Config */
.config-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}
.config-row label {
  font-size: 14px;
  color: var(--text-secondary);
}
.config-select {
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  font-size: 13px;
  font-family: inherit;
  background: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
