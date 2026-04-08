<template>
  <div class="app-container">
    <div class="bg-decoration decoration-left"></div>
    <div class="bg-decoration decoration-right"></div>
    <AppHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-pop" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<style lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 5% 5%, rgba(250, 204, 21, 0.22), transparent 30%),
    radial-gradient(circle at 95% 0%, rgba(59, 130, 246, 0.18), transparent 26%),
    #eff6ff;
}

.bg-decoration {
  position: absolute;
  z-index: 0;
  width: 220px;
  height: 220px;
  border-radius: 999px;
  filter: blur(6px);
  opacity: 0.45;
  pointer-events: none;
}

.decoration-left {
  top: 90px;
  left: -70px;
  background: #facc15;
}

.decoration-right {
  top: 220px;
  right: -80px;
  background: #93c5fd;
}

.main-content {
  flex: 1;
  padding: 26px 20px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.page-pop-enter-active,
.page-pop-leave-active {
  transition: all 0.22s ease;
}

.page-pop-enter-from,
.page-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.99);
}
</style>
