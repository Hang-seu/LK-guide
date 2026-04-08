import { defineStore } from 'pinia'
import { ref } from 'vue'
import teamsData from '@/data/teams.json'

export const useTeamStore = defineStore('team', () => {
  const teams = ref([])
  const loading = ref(false)

  const loadTeams = () => {
    loading.value = true
    teams.value = teamsData.teams
    loading.value = false
  }

  const getTeamById = (id) => {
    return teams.value.find(t => t.id === id)
  }

  const getTeamsByTag = (tag) => {
    return teams.value.filter(t => t.tags.includes(tag))
  }

  const searchTeams = (keyword) => {
    if (!keyword) return teams.value
    return teams.value.filter(t =>
      t.name.includes(keyword) ||
      t.strategy.includes(keyword)
    )
  }

  return {
    teams,
    loading,
    loadTeams,
    getTeamById,
    getTeamsByTag,
    searchTeams
  }
})
