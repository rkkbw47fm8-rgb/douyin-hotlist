<template>
  <aside class="sidebar">
    <div class="logo" @click="$router.push('/')">
      <div class="logo-icon">⬡</div>
      <span>热榜分析</span>
    </div>
    <nav class="nav-list">
      <button
        class="nav-item"
        :class="{ active: $route.name === 'hotlist' }"
        @click="$router.push('/')"
      >
        <span class="nav-icon">🔥</span>
        热榜总览
        <span class="nav-badge">2新</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: $route.name === 'detail' }"
        @click="$router.push('/detail/1')"
      >
        <span class="nav-icon">📊</span>
        详情分析
      </button>
      <button
        class="nav-item"
        :class="{ active: $route.name === 'profile' }"
        @click="$router.push('/profile')"
      >
        <span class="nav-icon">👤</span>
        个人中心
      </button>
    </nav>
    <div class="nav-bottom">
      <button class="nav-item" @click="themeStore.toggle()">
        <span class="nav-icon">🎨</span>
        {{ themeStore.theme === 'theme-a' ? '切换浅色' : '切换深色' }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useThemeStore } from '../stores/theme.js'
const themeStore = useThemeStore()
</script>

<style scoped>
.sidebar {
  width: 220px;
  flex-shrink: 0;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--separator);
  position: sticky; top: 0; height: 100vh;
  background: var(--nav-bg);
  transition: background var(--transition), border-color var(--transition);
}
.logo {
  display: flex; align-items: center; gap: 8px;
  padding: 0 12px 24px;
  font-size: 18px; font-weight: 700;
  cursor: pointer;
  color: var(--text-primary);
}
.logo-icon {
  width: 28px; height: 28px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800;
  background: var(--accent);
  color: var(--theme-a, #0A0F1E);
}
.nav-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
.nav-item {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px; font-weight: 500;
  transition: all 0.2s ease;
  border: none; background: none; width: 100%; text-align: left;
  font-family: inherit;
  color: var(--text-secondary);
}
.nav-item:hover { background: var(--hover); color: var(--text-primary); }
.nav-item.active { background: var(--hover); color: var(--accent); font-weight: 600; }
.nav-icon { font-size: 16px; width: 20px; text-align: center; }
.nav-badge {
  margin-left: auto;
  padding: 1px 8px; border-radius: 999px; font-size: 11px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
}
.nav-bottom {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--separator);
}
@media (max-width: 900px) {
  .sidebar { display: none; }
}
</style>
