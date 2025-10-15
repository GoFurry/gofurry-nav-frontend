// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/nav' },
    { path: '/home', redirect: '/nav' }, // 首页
    { path: '/about', component: () => import('@/pages/About.vue') }, // 关于页
    { path: '/join', component: () => import('@/pages/Join.vue') }, // 加入我们
    { path: '/nav', component: () => import('@/pages/NavPage.vue') }, // 导航页
    { path: '/swagger', component: () => import('@/pages/Swagger.vue') }, // API页
    { path: '/updates', component: () => import('@/pages/Updates.vue') }, // 更新页
    { path: '/tools', component: () => import('@/pages/ToolsPage.vue') }, // 工具页
    { path: '/games', component: () => import('@/pages/GamesPage.vue') }, // 游戏页
    { path: '/survey', component: () => import('@/pages/SurveyPage.vue') }, // 调研页
    { path: '/site/:id', component: () => import('@/pages/Site.vue') }, // 站点详情页
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
