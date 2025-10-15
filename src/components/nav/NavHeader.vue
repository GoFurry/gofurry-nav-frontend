<template>
  <header
      class="w-full h-90 md:h-70 relative flex flex-col justify-between px-4 shadow-sm overflow-hidden"
  >
    <!-- 背景图 -->
    <div
        v-if="bgImage"
        class="absolute inset-0 bg-cover bg-center transition-all duration-700"
        :style="{ backgroundImage: `url(${bgImage})` }"
    ></div>

    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-[#414141]/55"></div>

    <!-- 主要内容 -->
    <div class="relative z-10 flex flex-col justify-between h-full py-2">
      <div class="flex items-center justify-between">
        <!-- 左侧导航按钮 -->
        <div class="flex items-center gap-5 text-gray-100 text-lg">
          <div
              class="flex items-center gap-1 cursor-pointer transition-all"
              :class="route.path === '/home'
                ? 'text-orange-400 drop-shadow-[0_0_5px_rgb(251,146,60)]'
                : 'hover:text-orange-400 hover:drop-shadow-[0_0_5px_rgb(251,146,60)]'"
              @click="goTo('/home')"
          >
            <img src="@/assets/svgs/home.svg" alt="home" class="w-5 h-5" />
            {{ t('navHeader.home') }}
          </div>

          <div
              class="flex items-center gap-1 cursor-pointer transition-all"
              :class="route.path === '/updates'
                ? 'text-orange-400 drop-shadow-[0_0_5px_rgb(251,146,60)]'
                : 'hover:text-orange-400 hover:drop-shadow-[0_0_5px_rgb(251,146,60)]'"
              @click="goTo('/updates')"
          >
            <img src="@/assets/svgs/tv.svg" alt="update" class="w-5 h-5" />
            {{ t('navHeader.update') }}
          </div>

          <div
              class="flex items-center gap-1 cursor-pointer transition-all"
              :class="route.path === '/swagger'
                ? 'text-orange-400 drop-shadow-[0_0_5px_rgb(251,146,60)]'
                : 'hover:text-orange-400 hover:drop-shadow-[0_0_5px_rgb(251,146,60)]'"
              @click="goTo('/swagger')"
          >
            <img src="@/assets/svgs/api.svg" alt="api" class="w-5 h-5" />
            API
          </div>
        </div>

        <!-- 右侧联系方式 -->
        <div class="flex items-center gap-4">
          <div>
            <img src="@/assets/icons/bilibili.svg" alt="bilibili" class="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100 transition-transform transform hover:scale-125 hover:drop-shadow-[0_0_6px_rgb(240,128,128)]" @click="openLink('https://space.bilibili.com/37124259')" />
          </div>
          <div class="hidden sm:block">
            <img src="@/assets/icons/weibo.svg" alt="weibo" class="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100 transition-transform transform hover:scale-125 hover:drop-shadow-[0_0_6px_rgb(255,69,0)]" @click="openLink('https://www.weibo.com/u/6233129221')" />
          </div>
          <div class="hidden sm:block">
            <img src="@/assets/icons/github.svg" alt="github" class="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100 transition-transform transform hover:scale-125 hover:drop-shadow-[0_0_6px_rgb(56,189,248)]" @click="openLink('https://github.com/GoFurry')" />
          </div>
          <div class="hidden sm:block">
            <img src="@/assets/icons/twitter.svg" alt="twitter" class="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100 transition-transform transform hover:scale-125 hover:drop-shadow-[0_0_6px_rgb(29,155,240)]" @click="openLink('https://x.com/InLoveWithCharr')" />
          </div>
        </div>
      </div>

      <!-- 第二行 - 搜索框 -->
      <div class="flex justify-center mt-1">
        <SearchBox />
      </div>

      <!-- 第三行 -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mt-2 text-gray-100 text-sm gap-2">
        <!-- 左侧天气 -->
        <div class="flex flex-col bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm w-fit">
          <div class="flex items-center gap-2 text-[13px]">
            <span>{{ formattedDateTime }}</span>
          </div>
          <iframe
              width="300"
              scrolling="no"
              height="25"
              frameborder="0"
              allowtransparency="true"
              src="https://i.tianqi.com/index.php?c=code&id=34&icon=1&num=3"
          ></iframe>
        </div>

        <!-- 右侧福瑞金句 -->
        <div class="text-white truncate italic opacity-90 max-w-[300px] text-right md:text-right md:self-end self-start">
          "{{ saying }}"
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import SearchBox from './SearchBox.vue'
import { getSaying} from "@/utils/api/nav.ts";
import {i18n} from "@/main.ts";

const router = useRouter()
const route = useRoute()

const bgImage = ref<string | null>(null)
const formattedDateTime = ref('')
const saying = ref('')
const apiurl = import.meta.env.VITE_API_BASE_URL || ''
const t = (key: string) => i18n.global.t(key)


const goTo = (path: string) => {
  if (route.path !== path) router.push(path)
}

const openLink = (url: string) => window.open(url, '_blank')

const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekdayNames = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  const weekday = weekdayNames[now.getDay()]
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  formattedDateTime.value = `${year}年${month}月${day}日 ${weekday} ${hours}:${minutes}`
}

let updateBackground: (() => void) | null = null
let timeTimer: number | null = null // 定时器存值，便于清理

onMounted(async () => {
  updateTime()
  timeTimer = window.setInterval(updateTime, 1000 * 60)

  try {
    const [resizedRes, normalRes] = await Promise.all([
      axios.get(apiurl+'/nav/page/header/getImage', {
        params: { type: 'resized' },
        responseType: 'blob',
      }),
      axios.get(apiurl+'/nav/page/header/getImage', {
        params: { type: 'normal' },
        responseType: 'blob',
      }),
    ])

    const resizedUrl = URL.createObjectURL(resizedRes.data)
    const normalUrl = URL.createObjectURL(normalRes.data)

    updateBackground = () => {
      bgImage.value = window.innerWidth >= 768 ? resizedUrl : normalUrl
    }

    updateBackground()
    window.addEventListener('resize', updateBackground)
  } catch (err) {
    console.error('背景图加载失败:', err)
  }

  try {
    const sayingData = await getSaying()
    // 验证接口返回数据（避免空值/格式错误）
    if (typeof sayingData === 'string') {
      saying.value = sayingData
    } else {
      console.warn('每日一句接口返回格式异常:', sayingData)
      saying.value = '你的恩情, 狼不会忘记.'
    }
  } catch (err) {
    console.error('每日一句获取失败:', err)
    saying.value = '你的恩情, 狼不会忘记.'
  }
})

onUnmounted(() => {
  if (timeTimer) {
    window.clearInterval(timeTimer)
  }
  if (updateBackground) {
    window.removeEventListener('resize', updateBackground)
  }
  if (bgImage.value) {
    URL.revokeObjectURL(bgImage.value)
  }
})
</script>

<style scoped>
header {
  transition: background 0.4s ease-in-out;
}
</style>
