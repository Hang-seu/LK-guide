import { defineStore } from 'pinia'
import { ref } from 'vue'
import spritesData from '@/data/sprites.json'
import skillsData from '@/data/skills.json'
import evolutionsData from '@/data/evolutions.json'

export const useSpriteStore = defineStore('sprite', () => {
  const sprites = ref([])
  const skills = ref([])
  const evolutions = ref([])
  const loading = ref(false)

  const loadSprites = () => {
    loading.value = true
    sprites.value = spritesData.sprites
    loading.value = false
  }

  const loadSkills = () => {
    skills.value = skillsData.skills
  }

  const loadEvolutions = () => {
    evolutions.value = evolutionsData.evolutions
  }

  const getSpritesById = (id) => {
    return sprites.value.find(s => s.id === id)
  }

  const getSkillsBySpriteId = (spriteId) => {
    const sprite = getSpritesById(spriteId)
    if (!sprite) return []
    return skills.value.filter(s => sprite.skills.includes(s.id))
  }

  const getEvolutionChain = (spriteId) => {
    const chains = evolutions.value.filter(e => e.chain.includes(spriteId))
    if (chains.length === 0) return []

    const chainIds = chains[0].chain
    return chainIds.map(id => {
      const sprite = getSpritesById(id)
      return sprite ? { id: sprite.id, name: sprite.name } : null
    }).filter(Boolean)
  }

  const searchSprites = (keyword) => {
    if (!keyword) return sprites.value
    return sprites.value.filter(s =>
      s.name.includes(keyword) ||
      s.id.toString().includes(keyword)
    )
  }

  const filterByType = (type) => {
    if (!type) return sprites.value
    return sprites.value.filter(s => s.types.includes(type))
  }

  return {
    sprites,
    skills,
    evolutions,
    loading,
    loadSprites,
    loadSkills,
    loadEvolutions,
    getSpritesById,
    getSkillsBySpriteId,
    getEvolutionChain,
    searchSprites,
    filterByType
  }
})
