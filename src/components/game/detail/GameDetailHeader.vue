<template>
  <div
      class="bg-orange-50 rounded-2xl p-5 shadow
           flex flex-col sm:flex-row gap-5"
  >

    <!-- 封面图 -->
    <div class="flex justify-center sm:justify-start shrink-0">
      <img
          :src="coverUrl"
          class="w-[180px] h-[240px] rounded-xl object-cover"
          :alt="game?.name || 'cover'"
      />
    </div>

    <!-- 右侧信息 -->
    <div class="flex-1 min-w-0 flex flex-col gap-3">

      <!-- 标题 -->
      <h1 class="text-2xl font-bold text-gray-800 break-words">
        {{ game?.name || t("game.panel.none") }}
      </h1>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2">
        <span
            v-for="tag in displayTags"
            :key="tag.id"
            class="px-2 py-0.5 text-xs rounded-md bg-orange-100 text-orange-700 cursor-default relative"
        >
          <span class="relative group">
            {{ tag.name }}

            <!-- tooltip -->
            <div
                v-if="tag.desc"
                class="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-1
                       bg-gray-800 text-white text-xs rounded px-2 py-1
                       opacity-0 group-hover:opacity-100 transition
                       whitespace-nowrap pointer-events-none"
            >
              {{ tag.desc }}
            </div>
          </span>
        </span>

        <!-- 展开 / 收起 -->
        <span
            v-if="tags.length > 8"
            class="px-2 py-0.5 text-xs rounded-md cursor-pointer
             bg-orange-200 text-orange-700 hover:bg-orange-300"
            @click="expanded = !expanded"
        >
          {{ expanded ? t("common.collapse") : t("common.expand") }}
        </span>
      </div>


      <!-- 评分 -->
      <div class="flex items-center gap-2 flex-wrap">
        <div class="flex items-center gap-1">
          <!-- 整星 -->
          <img
              v-for="i in fullStars"
              :key="'full-' + i"
              :src="starSvg"
              alt="star"
              class="w-4 h-4"
          />

          <!-- 半星 -->
          <img
              v-if="hasHalfStar"
              :src="starHalfSvg"
              alt="half-star"
              class="w-4 h-4"
          />

          <!-- 空星 -->
          <img
              v-for="i in emptyStars"
              :key="'empty-' + i"
              :src="starSvg"
              alt="empty-star"
              class="w-4 h-4 opacity-30"
          />
        </div>

        <span class="text-orange-500 font-bold">
          {{ avgScore.toFixed(1) }}
        </span>

        <span class="text-sm text-gray-500">
          ( {{ remark?.total ?? 0 }} {{t("game.detail.commentCountSuffix")}} )
        </span>
      </div>

      <!-- 简介 -->
      <p
          class="text-sm text-gray-700 leading-relaxed
               break-words line-clamp-3"
      >
        {{ game?.info || t("game.panel.none") }}
      </p>

      <!-- 分享 -->
      <div class="flex items-center gap-3 mt-auto">
        <span class="text-sm text-gray-500">{{t("game.detail.share")}}:</span>

        <button
            v-for="item in shareList"
            :key="item.name"
            class="w-8 h-8 flex items-center justify-center
                 rounded-full bg-orange-100 hover:bg-orange-200
                 transition"
            @click="share(item.type)"
            :title="item.name"
        >
          <img
              :src="item.icon"
              :alt="item.name"
              class="w-4 h-4 share-icon"
          />
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GameBaseInfoResponse, RemarkResponse } from '@/types/game'

import starSvg from '@/assets/svgs/star.svg'
import starHalfSvg from '@/assets/svgs/star-half-alt.svg'

import telegramIcon from '@/assets/icons/telegram.svg'
import twitterIcon from '@/assets/icons/twitter.svg'
import weiboIcon from '@/assets/icons/weibo.svg'
import { i18n } from '@/main.ts'

const { t } = i18n.global

const props = defineProps<{
  game: GameBaseInfoResponse | null
  remark: RemarkResponse | null
}>()

const expanded = ref(false)

// Steam 官方封面
const coverUrl = computed(() => {
  if (!props.game?.appid) {
    return ''
  }
  return `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${props.game.appid}/library_600x900.jpg`
})

// 标签
const tags = computed(() => props.game?.tags ?? [])
const displayTags = computed(() =>
    expanded.value ? tags.value : tags.value.slice(0, 8)
)

// 评分逻辑
const avgScore = computed(() => props.remark?.avg_score ?? 0)

// 整星
const fullStars = computed(() => Math.floor(avgScore.value))

// 半星
const hasHalfStar = computed(() => {
  const decimal = avgScore.value - fullStars.value
  return decimal >= 0.25 && decimal < 0.75
})

// 空星
const emptyStars = computed(() => {
  return 5 - fullStars.value - (hasHalfStar.value ? 1 : 0)
})

// 分享
const shareList = [
  { name: 'Telegram', type: 'telegram', icon: telegramIcon },
  { name: 'Twitter', type: 'twitter', icon: twitterIcon },
  { name: '微博', type: 'weibo', icon: weiboIcon }
]

function share(type: string) {
  const url = encodeURIComponent(location.href)
  const title = encodeURIComponent(props.game?.name || '')

  let shareUrl = ''

  switch (type) {
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${url}&text=${title}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
      break
    case 'weibo':
      shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`
      break
  }

  window.open(shareUrl, '_blank')
}
</script>

<style scoped>
.share-icon {
  filter:
      invert(42%)
      sepia(96%)
      saturate(1150%)
      hue-rotate(3deg)
      brightness(90%)
      contrast(95%);
}
</style>
