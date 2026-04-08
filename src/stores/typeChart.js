import { defineStore } from 'pinia'
import { ref } from 'vue'
import typeChartData from '@/data/typeChart.json'

export const useTypeChartStore = defineStore('typeChart', () => {
  const typeChart = ref({})
  const loading = ref(false)

  const loadTypeChart = () => {
    loading.value = true
    typeChart.value = typeChartData.typeChart
    loading.value = false
  }

  const getRelations = (type) => {
    return typeChart.value[type] || { strong: [], weak: [], resist: [], immune: [] }
  }

  const getEffectiveness = (attackType, defenseType) => {
    const defenseRelations = typeChart.value[defenseType]
    if (!defenseRelations) return 1

    if (defenseRelations.immune?.includes(attackType)) return 0
    if (defenseRelations.weak?.includes(attackType)) return 2
    if (defenseRelations.resist?.includes(attackType)) return 0.5
    return 1
  }

  const calculateDualTypeEffectiveness = (attackType, defenseType1, defenseType2) => {
    if (!defenseType2) return getEffectiveness(attackType, defenseType1)
    return getEffectiveness(attackType, defenseType1) * getEffectiveness(attackType, defenseType2)
  }

  return {
    typeChart,
    loading,
    loadTypeChart,
    getRelations,
    getEffectiveness,
    calculateDualTypeEffectiveness
  }
})
