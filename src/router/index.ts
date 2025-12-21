// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/nav' },
    { path: '/home', redirect: '/nav' }, // 首页
    { path: '/panel', component: () => import('@/pages/nav/Dashboard.vue') }, // 数据大屏
    { path: '/about', component: () => import('@/pages/other/About.vue') }, // 关于页
    { path: '/join', component: () => import('@/pages/other/Join.vue') }, // 加入我们
    { path: '/nav', component: () => import('@/pages/nav/NavPage.vue') }, // 导航页
    { path: '/swagger', component: () => import('@/pages/other/Swagger.vue') }, // API页
    { path: '/updates', component: () => import('@/pages/other/Updates.vue') }, // 更新页
    { path: '/tools', component: () => import('@/pages/tool/ToolsPage.vue') }, // 工具页
    { path: '/games', component: () => import('@/pages/game/GamesPage.vue') }, // 游戏页
    { path: '/survey', component: () => import('@/pages/survey/SurveyPage.vue') }, // 调研页
    { path: '/site/:id', component: () => import('@/pages/nav/Site.vue') }, // 站点详情页
    { path: '/games/:id', component: () => import('@/pages/game/Game.vue') }, // 游戏详情页
    { path: '/games/news/:id', component: () => import('@/pages/game/GameNews.vue') }, // 游戏新闻页
    { path: '/games/list', component: () => import('@/pages/game/GameList.vue') }, // 游戏搜索页
    { path: '/games/creator', component: () => import('@/pages/game/GameCreators.vue') }, // 游戏创作者页

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
