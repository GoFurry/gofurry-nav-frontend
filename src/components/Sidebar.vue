<template>
  <aside
      class="fixed left-0 top-0 h-screen bg-gray-700 flex flex-col transition-all duration-300
           w-12 sm:w-16 lg:w-40"
  >
    <!-- Logo -->
    <div class="h-8 lg:h-32 flex items-center justify-center">
      <img src="../assets/svgs/logo-mini.svg" alt="Logo" class="w-8 h-8 lg:w-24" />
    </div>

    <!-- 分隔线 -->
    <div class="w-[80%] self-center flex justify-center">
      <div
          class="lg:h-1.5 h-0.5 rounded-full
               bg-gradient-to-r from-transparent via-stone-400 to-transparent w-full"
      ></div>
    </div>

    <!-- 上部菜单 -->
    <nav class="flex-1 py-4 overflow-y-hidden">
      <ul class="space-y-1">
        <li
            v-for="item in menuItems"
            :key="item.path"
            class="relative"
            @mouseenter="hoveredItem = item.path"
            @mouseleave="hoveredItem = null"
            @mousemove="updateTooltipPosition"
        >
          <RouterLink
              :to="item.path"
              class="flex items-center gap-1 px-4 py-2 text-sm font-medium transition rounded-lg relative
                   justify-center lg:justify-start"
              :class="isActive(item.path)
              ? 'bg-gray-200'
              : 'hover:bg-gray-500 hover:bg-opacity-40'"
          >
            <!-- 左侧选中条 -->
            <span
                v-if="isActive(item.path)"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-stone-600 rounded-r"
            ></span>

            <!-- 图标 -->
            <span class="w-5 h-5 flex-shrink-0">
              <img
                  :src="item.icon"
                  :alt="item.label + '图标'"
                  class="w-full h-full object-contain transition-colors duration-200"
                  :class="isActive(item.path) ? 'icon-active' : 'icon-normal'"
              />
            </span>

            <!-- 文字 -->
            <span
                class="hidden lg:inline-block text-base font-bold transition-all duration-200"
                :class="isActive(item.path) ? 'text-gray-700' : 'text-white'"
            >
              {{ item.label }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- 下部菜单 -->
    <div class="mt-auto">
      <!-- 分隔线 -->
      <div class="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-4 mb-2"></div>

      <nav class="pb-4">
        <ul class="space-y-1">
          <li
              v-for="item in bottomMenuItems"
              :key="item.path"
              class="relative"
              @mouseenter="hoveredItem = item.path"
              @mouseleave="hoveredItem = null"
              @mousemove="updateTooltipPosition"
          >
            <RouterLink
                :to="item.path"
                class="flex items-center gap-1 px-4 py-2 text-sm font-medium transition rounded-lg relative
                     justify-center lg:justify-start"
                :class="isActive(item.path)
                ? 'bg-gray-200'
                : 'hover:bg-gray-500 hover:bg-opacity-40'"
            >
              <!-- 左侧选中条-->
              <span
                  v-if="isActive(item.path)"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-stone-600 rounded-r"
              ></span>

              <span class="w-5 h-5 flex-shrink-0">
                <img
                    :src="item.icon"
                    :alt="item.label + '图标'"
                    class="w-full h-full object-contain transition-colors duration-200"
                    :class="isActive(item.path) ? 'icon-active' : 'icon-normal'"
                />
              </span>
              <span class="hidden lg:inline-block text-base font-bold"
                    :class="isActive(item.path) ? 'text-gray-700' : 'text-white'">
                {{ item.label }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- 版权 -->
      <div class="hidden lg:flex items-center justify-center gap-1 py-2 text-gray-400 hover:text-orange-600 text-xs">
        <img src="../assets/svgs/copyright.svg" alt="cc" class="w-4 h-4" />
        <span>2025 GoFurry</span>
      </div>
    </div>

    <!-- 文字提示 -->
    <Teleport to="body">
      <div
          v-if="hoveredItem"
          class="lg:hidden fixed z-50 text-sm text-white bg-gray-800 rounded-lg px-2 py-1
               shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200 opacity-0 animate-fadeIn"
          :style="tooltipStyle"
      >
        {{ getLabel(hoveredItem) }}
      </div>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { i18n } from '@/main.ts'

import compassIcon from '@/assets/svgs/compass.svg'
import briefcaseIcon from '@/assets/svgs/briefcase.svg'
import gamepadIcon from '@/assets/svgs/gamepad.svg'
import clipboardIcon from '@/assets/svgs/clipboard.svg'
import featherIcon from '@/assets/svgs/feather.svg'
import pawIcon from '@/assets/svgs/paw.svg'

const route = useRoute()
const isActive = (path: string) => route.path.startsWith(path)

const { t } = i18n.global

// 悬浮提示逻辑
const hoveredItem = ref<string | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipStyle = ref({ top: '0px', left: '0px' })

const updateTooltipPosition = (event: MouseEvent) => {
  const offset = 12
  tooltipX.value = event.clientX + offset
  tooltipY.value = event.clientY - 12
}
watchEffect(() => {
  tooltipStyle.value = {
    top: `${tooltipY.value}px`,
    left: `${tooltipX.value}px`,
  }
})

// 文字随语言变化自动更新
const menuItems = computed(() => [
  { label: t('sidebar.nav'), path: '/nav', icon: compassIcon },
  { label: t('sidebar.tools'), path: '/tools', icon: briefcaseIcon },
  { label: t('sidebar.games'), path: '/games', icon: gamepadIcon },
  { label: t('sidebar.survey'), path: '/survey', icon: clipboardIcon }
])

const bottomMenuItems = computed(() => [
  { label: t('sidebar.about'), path: '/about', icon: featherIcon },
  { label: t('sidebar.join'), path: '/join', icon: pawIcon }
])

// 提示文本
const getLabel = (path: string) => {
  const allItems = [...menuItems.value, ...bottomMenuItems.value]
  const item = allItems.find(i => i.path === path)
  return item?.label || ''
}
</script>


<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.15s forwards;
}

/* 图标颜色样式 */
.icon-normal {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.icon-active {
  filter: invert(23%) sepia(14%) saturate(1067%) hue-rotate(175deg) brightness(93%) contrast(89%);
}
</style>
