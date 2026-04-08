import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: () => import('@/views/Pokedex.vue'),
    meta: { title: '精灵图鉴' }
  },
  {
    path: '/pokedex/:id',
    name: 'SpriteDetail',
    component: () => import('@/views/SpriteDetail.vue'),
    meta: { title: '精灵详情' }
  },
  {
    path: '/moveset',
    name: 'Moveset',
    component: () => import('@/views/Moveset.vue'),
    meta: { title: '配招推荐' }
  },
  {
    path: '/team',
    name: 'TeamBuilder',
    component: () => import('@/views/TeamBuilder.vue'),
    meta: { title: '配队推荐' }
  },
  {
    path: '/boss',
    name: 'BossGuide',
    component: () => import('@/views/BossGuide.vue'),
    meta: { title: 'BOSS攻略' }
  },
  {
    path: '/type-chart',
    name: 'TypeChart',
    component: () => import('@/views/TypeChart.vue'),
    meta: { title: '属性克制表' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '首页'} - 洛克王国世界资料站`
  next()
})

export default router
