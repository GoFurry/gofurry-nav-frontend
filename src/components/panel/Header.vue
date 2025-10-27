<template>
  <header
      class="h-18 px-6 py-3 bg-no-repeat bg-cover bg-center relative"
      :style="{
      backgroundImage: `url(${bgHeader})`,
    }"
  >
    <h1 class="font-bold text-center text-[clamp(1rem,2vw,1.5rem)]">
      GoFurry兽人控导航站数据总览
    </h1>
    <div class="hidden sm:block time absolute right-6 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.8)] text-[clamp(0.8rem,1.5vw,1.2rem)]">
      {{ currentTime }}
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import bgHeader from '@/assets/images/head_bg.png'

// 时间状态管理
const currentTime = ref('')
let timer = null

const appendZero = (num) => {
  return num < 10 ? `0${num}` : num
}

// 更新时间函数
const updateTime = () => {
  const dt = new Date()
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const day = dt.getDate()
  const hours = dt.getHours()
  const minutes = dt.getMinutes()
  const seconds = dt.getSeconds()

  currentTime.value = `${year}/${appendZero(month)}/${appendZero(day)} ${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)  // 每秒更新一次
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
h1, .time {
  transition: font-size 0.3s ease;
}
</style>