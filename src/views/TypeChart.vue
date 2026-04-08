<template>
  <div class="type-chart-page">
    <div class="page-header">
      <h1>属性克制表</h1>
      <p>可视化查看各属性之间的克制关系</p>
    </div>

    <div class="type-selector">
      <h3>选择属性查看克制关系</h3>
      <div class="type-buttons">
        <el-button
          v-for="type in types"
          :key="type"
          :type="selectedType === type ? 'primary' : 'default'"
          @click="selectedType = type"
        >
          {{ type }}
        </el-button>
      </div>
    </div>

    <el-row :gutter="20" v-if="selectedType">
      <el-col :span="8">
        <el-card class="relation-card">
          <template #header>
            <span class="card-title">克制 (2x)</span>
          </template>
          <div class="type-tags">
            <el-tag v-for="type in typeRelations.strong" :key="type" type="success" size="large">{{ type }}</el-tag>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="relation-card">
          <template #header>
            <span class="card-title">被克制 (2x)</span>
          </template>
          <div class="type-tags">
            <el-tag v-for="type in typeRelations.weak" :key="type" type="danger" size="large">{{ type }}</el-tag>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="relation-card">
          <template #header>
            <span class="card-title">抵抗 (0.5x)</span>
          </template>
          <div class="type-tags">
            <el-tag v-for="type in typeRelations.resist" :key="type" type="warning" size="large">{{ type }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="matrix-card" style="margin-top: 20px;">
      <template #header>
        <span>属性克制矩阵</span>
      </template>
      <div class="matrix-container">
        <table class="type-matrix">
          <thead>
            <tr>
              <th>攻\防</th>
              <th v-for="type in types" :key="type">{{ type }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attackType in types" :key="attackType">
              <th>{{ attackType }}</th>
              <td
                v-for="defenseType in types"
                :key="defenseType"
                :class="getEffectivenessClass(attackType, defenseType)"
              >
                {{ getEffectiveness(attackType, defenseType) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>

    <el-card class="calculator-card" style="margin-top: 20px;">
      <template #header>
        <span>双属性克制计算器</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-select v-model="calcType1" placeholder="选择属性1">
            <el-option v-for="type in types" :key="type" :label="type" :value="type" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="calcType2" placeholder="选择属性2 (可选)" clearable>
            <el-option v-for="type in types" :key="type" :label="type" :value="type" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="calculateDualType">计算</el-button>
        </el-col>
      </el-row>

      <div class="calc-result" v-if="calcResult">
        <h4>计算结果</h4>
        <el-row :gutter="20">
          <el-col :span="12">
            <h5>弱点 (2x以上)</h5>
            <div class="type-tags">
              <el-tag v-for="type in calcResult.weaknesses" :key="type" type="danger">{{ type }}</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <h5>抗性 (0.5x以下)</h5>
            <div class="type-tags">
              <el-tag v-for="type in calcResult.resistances" :key="type" type="success">{{ type }}</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTypeChartStore } from '@/stores/typeChart'

const typeChartStore = useTypeChartStore()

const types = ['火', '水', '草', '电', '冰', '岩石', '地面', '飞行', '毒', '虫', '幽灵', '钢', '龙', '恶', '妖精', '超能', '格斗', '普通']

const selectedType = ref('')
const calcType1 = ref('')
const calcType2 = ref('')
const calcResult = ref(null)

const typeRelations = computed(() => {
  if (!selectedType.value) return { strong: [], weak: [], resist: [] }
  return typeChartStore.getRelations(selectedType.value)
})

const getEffectiveness = (attack, defense) => {
  return typeChartStore.getEffectiveness(attack, defense)
}

const getEffectivenessClass = (attack, defense) => {
  const eff = getEffectiveness(attack, defense)
  if (eff === 2) return 'effective'
  if (eff === 0.5) return 'resist'
  if (eff === 0) return 'immune'
  return ''
}

const calculateDualType = () => {
  if (!calcType1.value) return

  const weaknesses = []
  const resistances = []

  types.forEach(attackType => {
    let multiplier = 1

    if (calcType2.value) {
      multiplier = getEffectiveness(attackType, calcType1.value) * getEffectiveness(attackType, calcType2.value)
    } else {
      multiplier = getEffectiveness(attackType, calcType1.value)
    }

    if (multiplier >= 2) {
      weaknesses.push(`${attackType} (${multiplier}x)`)
    } else if (multiplier <= 0.5 && multiplier > 0) {
      resistances.push(`${attackType} (${multiplier}x)`)
    }
  })

  calcResult.value = { weaknesses, resistances }
}

onMounted(() => {
  typeChartStore.loadTypeChart()
})
</script>

<style lang="scss" scoped>
.type-chart-page {
  .page-header {
    margin-bottom: 24px;
    h1 { margin-bottom: 8px; }
    p { color: #909399; }
  }

  .type-selector {
    margin-bottom: 24px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;

    h3 { margin-bottom: 16px; }

    .type-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .relation-card {
    .card-title {
      font-weight: 600;
    }

    .type-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .matrix-card {
    .matrix-container {
      overflow-x: auto;

      .type-matrix {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;

        th, td {
          padding: 8px;
          text-align: center;
          border: 1px solid #ebeef5;
          min-width: 50px;
        }

        th {
          background: #f5f7fa;
          font-weight: 600;
        }

        td {
          &.effective {
            background: #f0f9eb;
            color: #67c23a;
            font-weight: 600;
          }

          &.resist {
            background: #fdf6ec;
            color: #e6a23c;
          }

          &.immune {
            background: #f4f4f5;
            color: #909399;
          }
        }
      }
    }
  }

  .calculator-card {
    .calc-result {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ebeef5;

      h4 { margin-bottom: 16px; }
      h5 { margin-bottom: 8px; color: #909399; }

      .type-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }
  }
}
</style>
