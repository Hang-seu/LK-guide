import { defineStore } from 'pinia'
import { ref } from 'vue'
import bossesData from '@/data/bosses.json'

export const useBossStore = defineStore('boss', () => {
  const bosses = ref([])
  const loading = ref(false)

  const loadBosses = () => {
    loading.value = true
    bosses.value = bossesData.bosses
    loading.value = false
  }

  const getBossById = (id) => {
    return bosses.value.find(b => b.id === id)
  }

  const getBossesByCategory = (category) => {
    return bosses.value.filter(b => b.category === category)
  }

  const searchBosses = (keyword) => {
    if (!keyword) return bosses.value
    return bosses.value.filter(b =>
      b.name.includes(keyword) ||
      b.strategy.includes(keyword)
    )
  }

  return {
    bosses,
    loading,
    loadBosses,
    getBossById,
    getBossesByCategory,
    searchBosses
  }
})
