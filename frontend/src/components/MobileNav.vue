<template>
  <nav class="mobile-nav">
    <button
      class="mobile-nav-item"
      :class="{ active: $route.name === 'hotlist' }"
      @click="$router.push('/')"
    >
      <span class="mobile-nav-icon">🔥</span>
      <span class="mobile-nav-label">热榜</span>
    </button>
    <button
      class="mobile-nav-item"
      :class="{ active: $route.name === 'profile' }"
      @click="$router.push('/profile')"
    >
      <span class="mobile-nav-icon">👤</span>
      <span class="mobile-nav-label">我的</span>
    </button>
    <button
      class="mobile-nav-item theme-toggle"
      @click="themeStore.toggle()"
    >
      <span class="mobile-nav-icon">🎨</span>
      <span class="mobile-nav-label">主题</span>
    </button>
  </nav>
</template>

<script setup>
import { useThemeStore } from '../stores/theme.js'
const themeStore = useThemeStore()
</script>

<style scoped>
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: var(--nav-bg);
  border-top: 1px solid var(--separator);
  z-index: 100;
  transition: background var(--transition), border-color var(--transition);
}
@media (max-width: 900px) {
  .mobile-nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  color: var(--text-muted);
}
.mobile-nav-item.active {
  color: var(--accent);
}
.mobile-nav-icon {
  font-size: 20px;
  line-height: 1;
}
.mobile-nav-label {
  font-size: 10px;
  font-weight: 500;
}
</style>
