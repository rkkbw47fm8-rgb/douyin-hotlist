import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'theme-a')

  function setTheme(t) {
    theme.value = t
    localStorage.setItem('theme', t)
  }

  function toggle() {
    theme.value = theme.value === 'theme-a' ? 'theme-b' : 'theme-a'
    localStorage.setItem('theme', theme.value)
  }

  return { theme, setTheme, toggle }
})
