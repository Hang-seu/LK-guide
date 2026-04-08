<template>
  <div class="team-builder-page">
    <div class="page-header">
      <h1>配队推荐</h1>
      <p>查看各种精灵搭配方案与打法思路</p>
    </div>

    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="keyword" placeholder="搜索配队名称" clearable>
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="selectedTag" placeholder="选择标签" clearable>
            <el-option label="PVP" value="pvp" />
            <el-option label="PVE" value="pve" />
            <el-option label="推图" value="story" />
            <el-option label="BOSS战" value="boss" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="team-list">
      <el-card v-for="team in filteredTeams" :key="team.id" class="team-card">
        <div class="team-header">
          <h3>{{ team.name }}</h3>
          <div class="team-tags">
            <el-tag v-for="tag in team.tags" :key="tag" size="small">{{ tag }}</el-tag>
          </div>
        </div>

        <div class="team-members">
          <div class="member-item" v-for="member in team.members" :key="member.id" @click="goToSprite(member.spriteId)">
            <div class="member-avatar">
              <el-icon :size="40"><Picture /></el-icon>
            </div>
            <span class="member-name">{{ member.name }}</span>
            <el-tag size="small" v-for="type in member.types" :key="type">{{ type }}</el-tag>
          </div>
        </div>

        <div class="team-desc">
          <h4>打法思路</h4>
          <p>{{ team.strategy }}</p>
        </div>

        <div class="team-weakness">
          <h4>弱点分析</h4>
          <el-tag v-for="weak in team.weaknesses" :key="weak" type="danger" size="small">{{ weak }}</el-tag>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Picture } from '@element-plus/icons-vue'
import { useTeamStore } from '@/stores/team'

const router = useRouter()
const teamStore = useTeamStore()

const keyword = ref('')
const selectedTag = ref('')

const filteredTeams = computed(() => {
  let result = teamStore.teams

  if (keyword.value) {
    result = result.filter(t => t.name.includes(keyword.value))
  }

  if (selectedTag.value) {
    result = result.filter(t => t.tags.includes(selectedTag.value))
  }

  return result
})

const goToSprite = (id) => {
  router.push(`/pokedex/${id}`)
}

onMounted(() => {
  teamStore.loadTeams()
})
</script>

<style lang="scss" scoped>
.team-builder-page {
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

  .team-list {
    .team-card {
      margin-bottom: 20px;

      .team-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h3 { margin: 0; }

        .team-tags {
          display: flex;
          gap: 8px;
        }
      }

      .team-members {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;

        .member-item {
          flex: 1;
          text-align: center;
          padding: 16px;
          background: #f5f7fa;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: #e6e8eb;
          }

          .member-avatar {
            margin-bottom: 8px;
          }

          .member-name {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
          }
        }
      }

      .team-desc {
        margin-bottom: 16px;

        h4 { margin-bottom: 8px; }
        p { color: #606266; line-height: 1.6; }
      }

      .team-weakness {
        h4 { margin-bottom: 8px; }
      }
    }
  }
}
</style>
