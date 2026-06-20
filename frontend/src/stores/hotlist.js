import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockHotList, mockTrendData } from '../assets/mockData.js'
import { getInspireSuggestions, getTopicBrief } from '../utils/inspireEngine.js'

export const useHotlistStore = defineStore('hotlist', () => {
  const items = ref([])
  const currentCategory = ref('全部')
  const selectedItem = ref(null)
  const loading = ref(false)

  function fetchList() {
    loading.value = true
    // 模拟 API 请求
    setTimeout(() => {
      items.value = mockHotList
      loading.value = false
    }, 300)
  }

  const filteredItems = computed(() => {
    if (currentCategory.value === '全部' || currentCategory.value === '⬆ 上升') {
      if (currentCategory.value === '⬆ 上升') {
        return items.value.filter(i => i.trendDir === 'up')
      }
      return items.value
    }
    return items.value.filter(i => i.category === currentCategory.value)
  })

  function setCategory(cat) {
    currentCategory.value = cat
  }

  function selectItem(item) {
    selectedItem.value = item
  }

  function getTrendData(id) {
    return mockTrendData[id] || []
  }

  function getInspire(item) {
    if (!item) return []
    return getInspireSuggestions(item.title, item.category, item.lifecycle)
  }

  function getBrief(item) {
    if (!item) return ''
    return getTopicBrief(item.title, item.category, item.heat, item.trend)
  }

  return {
    items, currentCategory, selectedItem, loading,
    filteredItems, fetchList, setCategory, selectItem, getTrendData,
    getInspire, getBrief
  }
})
