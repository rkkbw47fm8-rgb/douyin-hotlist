<template>
  <body :class="themeStore.theme">
    <div class="app">
      <!-- PC Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <main class="main">
        <router-view />
      </main>

      <!-- Mobile Bottom Nav -->
      <MobileNav />
    </div>
  </body>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme.js'
import { useHotlistStore } from './stores/hotlist.js'
import Sidebar from './components/Sidebar.vue'
import MobileNav from './components/MobileNav.vue'

const themeStore = useThemeStore()
const hotlistStore = useHotlistStore()

onMounted(() => {
  hotlistStore.fetchList()
})
</script>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
  transition: background var(--transition);
}
.main {
  flex: 1;
  padding: 24px 32px;
  max-width: 1200px;
  overflow-y: auto;
  padding-bottom: 80px;
}
@media (max-width: 900px) {
  .main {
    padding: 16px;
    padding-bottom: 80px;
  }
}
</style>
