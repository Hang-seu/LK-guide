<template>
  <div class="pokedex-page">
    <div class="page-header">
      <h1>精灵图鉴</h1>
      <p>查询所有精灵的属性、种族值、技能池与进化链</p>
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
          <el-select v-model="selectedType" placeholder="选择属性" clearable>
            <el-option v-for="type in types" :key="type" :label="type" :value="type" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="sortBy" placeholder="排序方式">
            <el-option label="编号" value="id" />
            <el-option label="名称" value="name" />
            <el-option label="种族值总和" value="total" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="sprite-grid">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="sprite in filteredSprites" :key="sprite.id">
          <el-card class="sprite-card" shadow="hover" @click="goToDetail(sprite.id)">
            <div class="sprite-image">
              <el-icon :size="64"><Picture /></el-icon>
            </div>
            <div class="sprite-info">
              <span class="sprite-id">#{{ String(sprite.id).padStart(3, '0') }}</span>
              <h4 class="sprite-name">{{ sprite.name }}</h4>
              <div class="sprite-types">
                <el-tag v-for="type in sprite.types" :key="type" :class="`type-${type}`" size="small">
                  {{ type }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="pagination-wrapper" v-if="total > pageSize">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        background
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, Picture } from '@element-plus/icons-vue'
import { useSpriteStore } from '@/stores/sprite'

const router = useRouter()
const route = useRoute()
const spriteStore = useSpriteStore()

const keyword = ref('')
const selectedType = ref('')
const sortBy = ref('id')
const currentPage = ref(1)
const pageSize = ref(30)

const types = ['火', '水', '草', '电', '冰', '岩石', '地面', '飞行', '毒', '虫', '幽灵', '钢', '龙', '恶', '妖精', '超能', '格斗', '普通']

const filteredSprites = computed(() => {
  let result = spriteStore.sprites

  if (keyword.value) {
    result = result.filter(s => s.name.includes(keyword.value))
  }

  if (selectedType.value) {
    result = result.filter(s => s.types.includes(selectedType.value))
  }

  return result
})

const total = computed(() => filteredSprites.value.length)

const goToDetail = (id) => {
  router.push(`/pokedex/${id}`)
}

onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword
  }
  spriteStore.loadSprites()
})
</script>

<style lang="scss" scoped>
.pokedex-page {
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

  .sprite-grid {
    margin-bottom: 24px;
  }

  .sprite-card {
    cursor: pointer;
    text-align: center;
    margin-bottom: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .sprite-image {
      padding: 20px;
      background: #f5f7fa;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .sprite-info {
      .sprite-id {
        color: #909399;
        font-size: 12px;
      }

      .sprite-name {
        margin: 8px 0;
      }

      .sprite-types {
        display: flex;
        justify-content: center;
        gap: 4px;
      }
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
