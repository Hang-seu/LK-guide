<template>
  <div class="moveset-page">
    <div class="page-header">
      <h1>配招推荐</h1>
      <p>查看各精灵的主流玩法配招建议</p>
    </div>

    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="keyword" placeholder="搜索精灵名称" clearable>
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="selectedStyle" placeholder="选择玩法流派" clearable>
            <el-option label="物理输出" value="physical" />
            <el-option label="特殊输出" value="special" />
            <el-option label="辅助" value="support" />
            <el-option label="坦克" value="tank" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="moveset-list">
      <el-card v-for="moveset in filteredMovesets" :key="moveset.id" class="moveset-card">
        <div class="moveset-header">
          <div class="sprite-info">
            <el-icon :size="48"><Picture /></el-icon>
            <div>
              <h3>{{ moveset.spriteName }}</h3>
              <el-tag size="small">{{ moveset.style }}</el-tag>
            </div>
          </div>
          <el-button type="primary" @click="goToSprite(moveset.spriteId)">查看精灵</el-button>
        </div>

        <div class="moveset-skills">
          <h4>推荐技能</h4>
          <el-row :gutter="12">
            <el-col :span="6" v-for="skill in moveset.skills" :key="skill.id">
              <div class="skill-item">
                <el-tag :type="getSkillType(skill.type)">{{ skill.name }}</el-tag>
                <span class="skill-info">{{ skill.type }} · {{ skill.category }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="moveset-desc">
          <h4>配招建议</h4>
          <p>{{ moveset.description }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Picture } from '@element-plus/icons-vue'
import { useMovesetStore } from '@/stores/moveset'

const router = useRouter()
const movesetStore = useMovesetStore()

const keyword = ref('')
const selectedStyle = ref('')

const filteredMovesets = computed(() => {
  let result = movesetStore.movesets

  if (keyword.value) {
    result = result.filter(m => m.spriteName.includes(keyword.value))
  }

  if (selectedStyle.value) {
    result = result.filter(m => m.style === selectedStyle.value)
  }

  return result
})

const getSkillType = (type) => {
  const typeMap = {
    '火': 'danger',
    '水': 'primary',
    '草': 'success',
    '电': 'warning'
  }
  return typeMap[type] || ''
}

const goToSprite = (id) => {
  router.push(`/pokedex/${id}`)
}

onMounted(() => {
  movesetStore.loadMovesets()
})
</script>

<style lang="scss" scoped>
.moveset-page {
  .page-header {
    margin-bottom: 24px;
    h1 { margin-bottom: 8px; }
    p { color: #909399; }
  }

  .filter-section {
    margin-bottom: 24px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
  }

  .moveset-list {
    .moveset-card {
      margin-bottom: 20px;

      .moveset-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .sprite-info {
          display: flex;
          align-items: center;
          gap: 16px;

          h3 {
            margin: 0 0 4px 0;
          }
        }
      }

      .moveset-skills {
        margin-bottom: 20px;

        h4 {
          margin-bottom: 12px;
        }

        .skill-item {
          text-align: center;
          padding: 12px;
          background: #f5f7fa;
          border-radius: 8px;

          .skill-info {
            display: block;
            font-size: 12px;
            color: #909399;
            margin-top: 4px;
          }
        }
      }

      .moveset-desc {
        h4 { margin-bottom: 8px; }
        p { color: #606266; line-height: 1.6; }
      }
    }
  }
}
</style>
