import { defineStore } from 'pinia'
import { ref } from 'vue'
import movesetsData from '@/data/movesets.json'

export const useMovesetStore = defineStore('moveset', () => {
  const movesets = ref([])
  const loading = ref(false)

  const loadMovesets = () => {
    loading.value = true
    movesets.value = movesetsData.movesets
    loading.value = false
  }

  const getMovesetsBySpriteId = (spriteId) => {
    return movesets.value.filter(m => m.spriteId === spriteId)
  }

  const getMovesetsByStyle = (style) => {
    return movesets.value.filter(m => m.style === style)
  }

  const searchMovesets = (keyword) => {
    if (!keyword) return movesets.value
    return movesets.value.filter(m =>
      m.spriteName.includes(keyword) ||
      m.name.includes(keyword)
    )
  }

  return {
    movesets,
    loading,
    loadMovesets,
    getMovesetsBySpriteId,
    getMovesetsByStyle,
    searchMovesets
  }
})
