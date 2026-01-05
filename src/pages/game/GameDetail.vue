<template>
  <div class="flex flex-col w-full min-h-screen bg-gray-50 overflow-clip">
    <NavBar />

    <main
        class="flex-1 bg-[#f2e3d0]"
        :style="{
        backgroundImage: `url(${bgGrid})`,
        backgroundRepeat: 'repeat'
      }"
    >
      <div class="w-full max-w-[1700px] mx-auto flex gap-4 p-6">

        <!-- 左侧主体 -->
        <section class="w-full xl:w-[75%]">
          <GameDetailMain
              :game="gameBaseInfo"
              :remark="remarkInfo"
          />
        </section>

        <!-- 右侧边栏 -->
        <aside class="hidden xl:block xl:w-[25%]">
          <GameDetailSidebar
              :game="gameBaseInfo"
              :recommend="recommendedGame"
          />
        </aside>

      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import bgGrid from '@/assets/pngs/bg-grid.png'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import GameDetailMain from '@/components/game/detail/GameDetailMain.vue'
import GameDetailSidebar from '@/components/game/detail/GameDetailSidebar.vue'

import {getGameBaseInfo, getGameRemark, getRecommendedGame} from '@/utils/api/game'
import type {GameBaseInfoResponse, RecommendedModel, RemarkResponse} from '@/types/game'

import { useLangStore } from '@/store/langStore'

const route = useRoute()
const langStore = useLangStore()

// 当前语言
const lang = ref(langStore.lang)

// 数据
const gameBaseInfo = ref<GameBaseInfoResponse | null>(null)
const recommendedGame = ref<RecommendedModel[] | null>(null)
const remarkInfo = ref<RemarkResponse | null>(null)

async function fetchGameBaseInfo() {
  try {
    const gameId = route.params.id as string
    gameBaseInfo.value = await getGameBaseInfo(gameId, lang.value)
  } catch (err) {
    console.error('[GameDetail] fetchGameBaseInfo failed:', err)
  }
}

async function fetchRecommendedGame() {
  try {
    const gameId = route.params.id as string
    recommendedGame.value = await getRecommendedGame(gameId, lang.value)
  } catch (err) {
    console.error('[GameDetail] fetchGameBaseInfo failed:', err)
  }
}

async function fetchGameRemark() {
  try {
    const gameId = route.params.id as string
    remarkInfo.value = await getGameRemark(gameId)
  } catch (err) {
    console.error('[GameDetail] fetchGameRemark failed:', err)
  }
}

function clearDetail() {
  gameBaseInfo.value = null
  recommendedGame.value = null
  remarkInfo.value = null

  // 再发请求
}

// 监听语言切换
watch(
    () => langStore.lang,
    async (val) => {
      lang.value = val
      await fetchGameBaseInfo()
      await fetchRecommendedGame()
    }
)

watch(
    () => route.params.id,
    async (id) => {
      if (id) {
        clearDetail()
        await fetchGameBaseInfo()
        await fetchGameRemark()
        await fetchRecommendedGame()
      }
    }
)


// 生命周期
onMounted(async () => {
  await fetchGameBaseInfo()
  await fetchGameRemark()
  await fetchRecommendedGame()
})
</script>
