<template>
  <aside
      class="fixed left-0 top-0 h-screen bg-gray-700 flex flex-col
         transition-all duration-300 ease-in-out"
      :class="collapsed ? 'lg:w-14 w-12 sm:w-16' : 'lg:w-40 w-12 sm:w-16'"
  >

    <!-- Logo -->
    <div class="h-8 lg:h-32 flex items-center justify-center">
      <img src="../assets/svgs/logo-mini.svg"
           alt="Logo"
           class="w-8 h-8 lg:w-24 transition-all duration-300"/>
    </div>

    <!-- 分隔线 -->
    <div class="relative w-[80%] self-center flex justify-center my-2">
      <div class="lg:h-1.5 h-0.5 rounded-full
                  bg-gradient-to-r from-transparent via-stone-400 to-transparent w-full">
      </div>
    </div>

    <!-- 折叠按钮 -->
    <button
        class="hidden lg:flex absolute top-32 left-full -translate-x-1/2
               w-6 h-6 items-center justify-center
               rounded-full bg-gray-600 hover:bg-gray-500
               shadow-lg z-9999"
        @click="emit('toggle')"
    >
      <svg class="w-4 h-4 text-white transition-transform duration-300"
           :class="collapsed ? 'rotate-180' : ''"
           fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- 上部菜单 -->
    <nav class="flex-1 py-4 overflow-hidden">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.path"
            class="relative"
            @mouseenter="hoveredItem = item.path"
            @mouseleave="hoveredItem = null"
            @mousemove="updateTooltipPosition">
          <RouterLink
              :to="item.path"
              class="flex items-center gap-2 px-4 py-2 transition rounded-lg relative justify-center lg:justify-start"
              :class="isActive(item.path) ? 'bg-gray-200' : 'hover:bg-gray-500 hover:bg-opacity-40'">
            <!-- 左侧选中条 -->
            <span v-if="isActive(item.path)"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-stone-600 rounded-r">
            </span>

            <!-- 图标 -->
            <span class="w-5 h-5 flex-shrink-0">
              <img :src="item.icon"
                   class="w-full h-full object-contain"
                   :class="isActive(item.path) ? 'icon-active' : 'icon-normal'"/>
            </span>

            <!-- 文字 -->
            <span class="hidden lg:inline-block text-base font-bold transition-all duration-300 whitespace-nowrap"
                  :class="[isActive(item.path) ? 'text-gray-700' : 'text-white',
                           collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100']">
              {{ item.label }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- 下部菜单 -->
    <div>
      <div class="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-4 mb-2"></div>
      <nav class="pb-4">
        <ul class="space-y-1">
          <li v-for="item in bottomMenuItems" :key="item.path"
              class="relative"
              @mouseenter="hoveredItem = item.path"
              @mouseleave="hoveredItem = null"
              @mousemove="updateTooltipPosition">
            <RouterLink
                :to="item.path"
                class="flex items-center gap-2 px-4 py-2 transition rounded-lg relative justify-center lg:justify-start"
                :class="isActive(item.path) ? 'bg-gray-200' : 'hover:bg-gray-500 hover:bg-opacity-40'">
              <span v-if="isActive(item.path)"
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-stone-600 rounded-r"></span>
              <span class="w-5 h-5 flex-shrink-0">
                <img :src="item.icon"
                     class="w-full h-full object-contain"
                     :class="isActive(item.path) ? 'icon-active' : 'icon-normal'"/>
              </span>
              <span class="hidden lg:inline-block text-base font-bold transition-all duration-300 whitespace-nowrap"
                    :class="[isActive(item.path) ? 'text-gray-700' : 'text-white',
                             collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100']">
                {{ item.label }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="absolute top-0 right-0 h-full w-1 pointer-events-none
            rounded-l-full
            bg-gradient-to-r from-white/5 to-white/0
            backdrop-blur-md
            shadow-[inset_0_0_6px_rgba(255,255,255,0.1)]"></div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div v-if="hoveredItem"
           class="lg:hidden fixed z-50 text-sm text-white bg-gray-800
                  rounded-lg px-2 py-1 shadow-lg pointer-events-none animate-fadeIn"
           :style="tooltipStyle">
        {{ getLabel(hoveredItem) }}
      </div>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { i18n } from '@/main'

import compassIcon from '@/assets/svgs/compass.svg'
import briefcaseIcon from '@/assets/svgs/briefcase.svg'
import gamepadIcon from '@/assets/svgs/gamepad.svg'
import clipboardIcon from '@/assets/svgs/clipboard.svg'
import featherIcon from '@/assets/svgs/feather.svg'
import pawIcon from '@/assets/svgs/paw.svg'
import panelIcon from '@/assets/svgs/panel.svg'

const { collapsed = true } = defineProps<{ collapsed?: boolean }>()
const emit = defineEmits<{ (e: 'toggle'): void }>()

const route = useRoute()
const { t } = i18n.global
const isActive = (path: string) => route.path.startsWith(path)

const hoveredItem = ref<string | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipStyle = ref({ top: '0px', left: '0px' })

const updateTooltipPosition = (e: MouseEvent) => {
  tooltipX.value = e.clientX + 12
  tooltipY.value = e.clientY - 12
}

watchEffect(() => {
  tooltipStyle.value = {
    top: `${tooltipY.value}px`,
    left: `${tooltipX.value}px`,
  }
})

const menuItems = computed(() => [
  { label: t('sidebar.nav'), path: '/nav', icon: compassIcon },
  { label: t('sidebar.games'), path: '/games', icon: gamepadIcon },
  { label: t('sidebar.tools'), path: '/tools', icon: briefcaseIcon },
  { label: t('sidebar.survey'), path: '/survey', icon: clipboardIcon },
  { label: t('sidebar.panel'), path: '/panel', icon: panelIcon },
])

const bottomMenuItems = computed(() => [
  { label: t('sidebar.about'), path: '/about', icon: featherIcon },
  { label: t('sidebar.join'), path: '/join', icon: pawIcon },
])

const getLabel = (path: string) =>
    [...menuItems.value, ...bottomMenuItems.value]
        .find(i => i.path === path)?.label ?? ''
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.15s forwards; }
.icon-normal { filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%); }
.icon-active { filter: invert(23%) sepia(14%) saturate(1067%) hue-rotate(175deg) brightness(93%) contrast(89%); }
</style>