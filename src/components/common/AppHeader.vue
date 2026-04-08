<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo" @click="$router.push('/')">
        <div class="logo-icon-wrap">
          <el-icon :size="28"><Collection /></el-icon>
        </div>
        <div class="logo-text">
          <strong>洛克王国资料站</strong>
          <small>冒险家攻略地图</small>
        </div>
      </div>

      <nav class="nav-menu">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </router-link>
      </nav>

      <div class="header-actions">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索精灵..."
          size="small"
          @keyup.enter="handleSearch"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch">出发</el-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Collection, Search, Grid, MagicStick, UserFilled, Trophy, Document } from '@element-plus/icons-vue'

const router = useRouter()
const searchKeyword = ref('')

const menuItems = [
  { title: '精灵图鉴', path: '/pokedex', icon: 'Grid' },
  { title: '配招推荐', path: '/moveset', icon: 'MagicStick' },
  { title: '配队推荐', path: '/team', icon: 'UserFilled' },
  { title: 'BOSS攻略', path: '/boss', icon: 'Trophy' },
  { title: '属性克制', path: '/type-chart', icon: 'Document' }
]

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/pokedex', query: { keyword: searchKeyword.value } })
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #dbeafe;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 8px 20px rgba(148, 163, 184, 0.14);

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: #1e293b;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }

    .logo-icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(145deg, #fef3c7, #facc15);
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 14px rgba(250, 204, 21, 0.35);
    }

    .logo-text {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 18px;
        line-height: 1.2;
      }

      small {
        font-size: 12px;
        color: #64748b;
      }
    }
  }

  .nav-menu {
    display: flex;
    gap: 8px;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      color: #475569;
      text-decoration: none;
      border-radius: 999px;
      border: 2px solid transparent;
      transition: all 0.2s;

      &:hover {
        background: #fff7d6;
        color: #1f2937;
      }

      &.active {
        border-color: #facc15;
        background: #fff7d6;
        color: #1f2937;
        box-shadow: 0 6px 14px rgba(250, 204, 21, 0.25);
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    :deep(.el-input) {
      width: 190px;

      .el-input__wrapper {
        background: #fff;

        .el-input__inner {
          color: #1f2937;

          &::placeholder {
            color: #94a3b8;
          }
        }
      }
    }
  }
}
</style>
