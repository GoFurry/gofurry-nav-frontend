<template>
  <nav class="flex items-center px-6 bg-gray-800 text-gray-300 h-8">
    <!-- 左侧slogan -->
    <div class="text-sm font-medium flex items-center">
      <span class="hidden sm:block">{{ t('navbar.slogan') }}</span>
      <span class="sm:hidden text-lg">🐺GoFurry</span>
    </div>

    <!-- 右侧切语言 -->
    <div class="relative ml-auto" @mouseenter="showDropdown" @mouseleave="hideDropdown">
      <button class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 text-sm">
        <img :src="currentFlag" class="w-4 h-4" alt="flag" />
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <transition name="fade">
        <div v-if="open" class="absolute right-0 mt-1 min-w-max bg-white text-black rounded shadow-lg overflow-hidden z-10">
          <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2 whitespace-nowrap" @click="switchLang('zh')">
            <img :src="cnFlag" class="w-4 h-4" alt="cn" /> 中文
          </div>
          <div class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-2 whitespace-nowrap" @click="switchLang('en')">
            <img :src="usFlag" class="w-4 h-4" alt="us" /> English
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLangStore } from '@/store/langStore'
import cnFlag from '@/assets/flags/cn.svg'
import usFlag from '@/assets/flags/us.svg'
import { useI18n } from 'vue-i18n'

const langStore = useLangStore()
const { t } = useI18n()
const open = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

const currentFlag = computed(() => (langStore.lang === 'zh' ? cnFlag : usFlag))

function switchLang(lang: 'zh' | 'en') {
  langStore.setLang(lang)
  open.value = false
}

// 显示下拉框
function showDropdown() {
  if (timeout) clearTimeout(timeout)
  open.value = true
}

// 隐藏下拉框
function hideDropdown() {
  timeout = setTimeout(() => {
    open.value = false
  }, 200)
}
</script>

<style scoped></style>
