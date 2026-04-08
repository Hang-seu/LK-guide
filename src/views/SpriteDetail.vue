<template>
  <div class="sprite-detail-page">
    <div class="back-btn">
      <el-button @click="$router.back()">
        <el-icon><ArrowLeft /></el-icon>
        返回图鉴
      </el-button>
    </div>

    <el-row :gutter="20" v-if="sprite">
      <el-col :span="8">
        <el-card class="sprite-card">
          <div class="sprite-image">
            <el-icon :size="128"><Picture /></el-icon>
          </div>
          <div class="sprite-basic">
            <span class="sprite-id">#{{ String(sprite.id).padStart(3, '0') }}</span>
            <h2>{{ sprite.name }}</h2>
            <div class="sprite-types">
              <el-tag v-for="type in sprite.types" :key="type" size="large">{{ type }}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card class="stats-card">
          <template #header>
            <span>种族值</span>
          </template>
          <div class="stats-list">
            <div class="stat-row" v-for="(value, key) in sprite.stats" :key="key">
              <span class="stat-name">{{ statNames[key] }}</span>
              <el-progress :percentage="value / 150 * 100" :stroke-width="20" :show-text="false" />
              <span class="stat-value">{{ value }}</span>
            </div>
          </div>
        </el-card>

        <el-card class="evolution-card" style="margin-top: 20px;">
          <template #header>
            <span>进化链</span>
          </template>
          <div class="evolution-chain">
            <div class="evo-item" v-for="evo in evolutionChain" :key="evo.id">
              <div class="evo-sprite" @click="goToSprite(evo.id)">
                <el-icon :size="48"><Picture /></el-icon>
              </div>
              <span>{{ evo.name }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="skills-card" style="margin-top: 20px;" v-if="sprite">
      <template #header>
        <span>技能池</span>
      </template>
      <el-table :data="skills" stripe>
        <el-table-column prop="name" label="技能名称" />
        <el-table-column prop="type" label="属性" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="power" label="威力" width="80" />
        <el-table-column prop="accuracy" label="命中" width="80" />
        <el-table-column prop="effect" label="效果" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Picture } from '@element-plus/icons-vue'
import { useSpriteStore } from '@/stores/sprite'

const route = useRoute()
const router = useRouter()
const spriteStore = useSpriteStore()

const statNames = {
  hp: 'HP',
  attack: '攻击',
  defense: '防御',
  spAtk: '特攻',
  spDef: '特防',
  speed: '速度'
}

const sprite = computed(() => spriteStore.getSpritesById(Number(route.params.id)))
const skills = computed(() => spriteStore.getSkillsBySpriteId(Number(route.params.id)))
const evolutionChain = computed(() => spriteStore.getEvolutionChain(Number(route.params.id)))

const goToSprite = (id) => {
  router.push(`/pokedex/${id}`)
}

onMounted(() => {
  spriteStore.loadSprites()
  spriteStore.loadSkills()
})
</script>

<style lang="scss" scoped>
.sprite-detail-page {
  .back-btn {
    margin-bottom: 20px;
  }

  .sprite-card {
    text-align: center;

    .sprite-image {
      padding: 40px;
      background: #f5f7fa;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .sprite-basic {
      .sprite-id {
        color: #909399;
      }

      h2 {
        margin: 12px 0;
      }

      .sprite-types {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
    }
  }

  .stats-card {
    .stats-list {
      .stat-row {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .stat-name {
          width: 60px;
          font-weight: 500;
        }

        .el-progress {
          flex: 1;
          margin: 0 16px;
        }

        .stat-value {
          width: 40px;
          text-align: right;
        }
      }
    }
  }

  .evolution-card {
    .evolution-chain {
      display: flex;
      align-items: center;
      gap: 20px;

      .evo-item {
        text-align: center;
        cursor: pointer;

        .evo-sprite {
          width: 80px;
          height: 80px;
          background: #f5f7fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;

          &:hover {
            background: #e6e8eb;
          }
        }
      }
    }
  }
}
</style>
