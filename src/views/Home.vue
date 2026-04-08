<template>
  <div class="home-page">
    <section class="hero-section">
      <img
        class="hero-bg"
        src="/images/home.png"
        alt="洛克王国世界冒险封面"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-bg-overlay"></div>
      <div class="hero-badges">
        <span>持续更新中</span>
      </div>
      <h1 class="hero-title">洛克王国世界攻略站</h1>
      <p class="hero-subtitle">像翻冒险图鉴一样，轻松找到精灵、配招与BOSS打法</p>
      <div class="quick-search">
        <el-input
          v-model="searchKeyword"
          placeholder="输入精灵名称，例如：圣水守护..."
          size="large"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>
      <div class="hot-tags">
        <el-tag
          v-for="tag in hotSearchTags"
          :key="tag"
          class="hot-tag"
          @click="quickSearch(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
    </section>

    <section class="feature-cards">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="4" v-for="feature in features" :key="feature.path">
          <el-card class="feature-card" shadow="hover" @click="$router.push(feature.path)">
            <div class="feature-icon">
              <el-icon :size="48"><component :is="feature.icon" /></el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
            <span class="enter-text">立即查看</span>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <section class="stats-section">
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.label">
          <div class="stat-item">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Collection, MagicStick, UserFilled, Trophy, Grid } from '@element-plus/icons-vue'

const router = useRouter()
const searchKeyword = ref('')

const features = [
  { title: '精灵图鉴', desc: '全精灵属性与技能查询', icon: 'Collection', path: '/pokedex' },
  { title: '配招推荐', desc: '主流玩法配招建议', icon: 'MagicStick', path: '/moveset' },
  { title: '配队推荐', desc: '精灵搭配方案展示', icon: 'UserFilled', path: '/team' },
  { title: 'BOSS攻略', desc: '周常活动BOSS打法', icon: 'Trophy', path: '/boss' },
  { title: '属性克制', desc: '可视化属性关系表', icon: 'Grid', path: '/type-chart' }
]

const stats = [
  { value: '500+', label: '精灵收录' },
  { value: '1000+', label: '技能数据' },
  { value: '200+', label: '配招方案' },
  { value: '50+', label: 'BOSS攻略' }
]

const hotSearchTags = ['圣水守护', '火神', '翼王', '草系', '电系']

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/pokedex', query: { keyword: searchKeyword.value } })
  }
}

const quickSearch = (keyword) => {
  searchKeyword.value = keyword
  handleSearch()
}
</script>

<style lang="scss" scoped>
.home-page {
  .hero-section {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #ffffff 0%, #eff6ff 40%, #fef9c3 100%);
    border-radius: 24px;
    border: 2px solid #dbeafe;
    margin-bottom: 40px;
    color: #0f172a;
    box-shadow: 0 16px 28px rgba(148, 163, 184, 0.2);
    position: relative;
    overflow: hidden;

    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transform: scale(1.02);
      filter: saturate(1.05) contrast(1.02);
      z-index: 0;
    }

    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.78), rgba(239, 246, 255, 0.92) 55%),
        linear-gradient(135deg, rgba(250, 204, 21, 0.22), rgba(59, 130, 246, 0.14));
      z-index: 1;
    }

    .hero-badges {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 14px;
      position: relative;
      z-index: 2;

      span {
        padding: 6px 12px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 12px;
        border: 2px solid #fde68a;
        background: #fff7d6;
      }
    }

    .hero-title {
      font-size: 46px;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 0 rgba(255, 255, 255, 0.65);
    }

    .hero-subtitle {
      font-size: 18px;
      color: #475569;
      margin-bottom: 30px;
      position: relative;
      z-index: 2;
    }

    .quick-search {
      max-width: 560px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .hot-tags {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
      position: relative;
      z-index: 2;

      .hot-tag {
        cursor: pointer;
        background: #fff;
        color: #334155;
        border-color: #bfdbfe;
        transition: all 0.2s ease;
      }

      .hot-tag:hover {
        transform: translateY(-1px);
        border-color: #facc15;
        background: #fef9c3;
      }
    }
  }

  .feature-cards {
    margin-bottom: 40px;

    .feature-card {
      text-align: center;
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      margin-bottom: 20px;
      border-radius: 18px;
      border: 2px solid #dbeafe;

      &:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow: 0 14px 26px rgba(148, 163, 184, 0.24);
      }

      .feature-icon {
        color: #eab308;
        margin-bottom: 16px;
      }

      h3 {
        margin-bottom: 8px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 14px;
      }

      .enter-text {
        margin-top: 12px;
        display: inline-block;
        color: #1d4ed8;
        font-weight: 600;
      }
    }
  }

  .stats-section {
    .stat-item {
      text-align: center;
      padding: 30px;
      background: #fff;
      border-radius: 18px;
      border: 2px solid #dbeafe;
      box-shadow: 0 10px 24px rgba(148, 163, 184, 0.18);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .stat-value {
        font-size: 36px;
        font-weight: bold;
        color: #eab308;
      }

      .stat-label {
        color: #64748b;
        margin-top: 8px;
      }
    }
  }
}
</style>
