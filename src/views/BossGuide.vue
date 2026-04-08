<template>
  <div class="boss-guide-page">
    <div class="page-header">
      <h1>BOSS攻略</h1>
      <p>周常与活动BOSS打法及推荐阵容</p>
    </div>

    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="keyword" placeholder="搜索BOSS名称" clearable>
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="selectedCategory" placeholder="选择分类" clearable>
            <el-option label="周常BOSS" value="weekly" />
            <el-option label="活动BOSS" value="event" />
            <el-option label="剧情BOSS" value="story" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="boss-list">
      <el-card v-for="boss in filteredBosses" :key="boss.id" class="boss-card">
        <div class="boss-header">
          <div class="boss-info">
            <div class="boss-avatar">
              <el-icon :size="64"><Picture /></el-icon>
            </div>
            <div>
              <h3>{{ boss.name }}</h3>
              <div class="boss-types">
                <el-tag v-for="type in boss.types" :key="type" size="small">{{ type }}</el-tag>
              </div>
              <el-tag :type="boss.category === 'weekly' ? 'warning' : 'success'" size="small">
                {{ boss.category === 'weekly' ? '周常' : boss.category === 'event' ? '活动' : '剧情' }}
              </el-tag>
            </div>
          </div>
        </div>

        <el-divider />

        <div class="boss-details">
          <el-row :gutter="20">
            <el-col :span="12">
              <h4>BOSS特点</h4>
              <ul class="feature-list">
                <li v-for="(feature, index) in boss.features" :key="index">{{ feature }}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <h4>弱点分析</h4>
              <div class="weakness-tags">
                <el-tag v-for="weak in boss.weaknesses" :key="weak" type="danger" size="small">{{ weak }}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="recommended-team">
          <h4>推荐阵容</h4>
          <div class="team-members">
            <div class="member-item" v-for="member in boss.recommendedTeam" :key="member.spriteId">
              <el-icon :size="32"><Picture /></el-icon>
              <span>{{ member.name }}</span>
            </div>
          </div>
        </div>

        <div class="boss-strategy">
          <h4>打法攻略</h4>
          <p>{{ boss.strategy }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Picture } from '@element-plus/icons-vue'
import { useBossStore } from '@/stores/boss'

const bossStore = useBossStore()

const keyword = ref('')
const selectedCategory = ref('')

const filteredBosses = computed(() => {
  let result = bossStore.bosses

  if (keyword.value) {
    result = result.filter(b => b.name.includes(keyword.value))
  }

  if (selectedCategory.value) {
    result = result.filter(b => b.category === selectedCategory.value)
  }

  return result
})

onMounted(() => {
  bossStore.loadBosses()
})
</script>

<style lang="scss" scoped>
.boss-guide-page {
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

  .boss-list {
    .boss-card {
      margin-bottom: 20px;

      .boss-header {
        .boss-info {
          display: flex;
          gap: 20px;

          .boss-avatar {
            width: 100px;
            height: 100px;
            background: #f5f7fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          h3 {
            margin: 0 0 8px 0;
          }

          .boss-types {
            display: flex;
            gap: 4px;
            margin-bottom: 8px;
          }
        }
      }

      .boss-details {
        margin-bottom: 20px;

        h4 { margin-bottom: 12px; }

        .feature-list {
          padding-left: 20px;
          color: #606266;

          li { margin-bottom: 4px; }
        }

        .weakness-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      }

      .recommended-team {
        margin-bottom: 20px;

        h4 { margin-bottom: 12px; }

        .team-members {
          display: flex;
          gap: 12px;

          .member-item {
            padding: 12px;
            background: #f5f7fa;
            border-radius: 8px;
            text-align: center;
            min-width: 80px;

            span {
              display: block;
              margin-top: 4px;
              font-size: 12px;
            }
          }
        }
      }

      .boss-strategy {
        h4 { margin-bottom: 8px; }
        p { color: #606266; line-height: 1.6; }
      }
    }
  }
}
</style>
