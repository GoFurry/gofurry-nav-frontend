<template>
  <section class="space-y-4">

    <!-- 顶部信息 -->
    <GameDetailHeader
        :game="game"
        :remark="remark"
    />

    <!-- Tabs -->
    <div class="bg-orange-50 rounded-2xl shadow">
      <!-- Tab Header -->
      <div class="flex border-b border-orange-100">
        <div
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
        'px-4 py-3 text-sm cursor-pointer select-none',
        activeTab === tab.key
          ? 'text-orange-500 border-b-2 border-orange-400'
          : 'text-gray-500 hover:text-orange-400'
      ]"
        >
          {{ tab.label }}
        </div>
      </div>

      <!-- Tab Content -->
      <div class="p-5 text-sm text-gray-700">
        <GameTabIntro
            v-if="activeTab === 'intro'"
            :game="game"
        />
        <GameTabGallery
            v-else-if="activeTab === 'gallery'"
            :movies="game?.movies ?? null"
            :screenshots="game?.screenshots ?? null"
        />
        <GameTabComment
            v-else-if="activeTab === 'comment'"
            :remark="remark"
        />
        <GameTabNews
            v-else-if="activeTab === 'news'"
            :news="game?.news ?? []"
        />
        <GameTabDetail
            v-else-if="activeTab === 'detail'"
            :game="game"
        />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { GameBaseInfoResponse, RemarkResponse } from '@/types/game'
import GameDetailHeader from '@/components/game/detail/GameDetailHeader.vue'
import GameTabIntro from '@/components/game/detail/tabs/GameTabIntro.vue'
import GameTabGallery from '@/components/game/detail/tabs/GameTabGallery.vue'
import GameTabComment from '@/components/game/detail/tabs/GameTabComment.vue'
import GameTabNews from '@/components/game/detail/tabs/GameTabNews.vue'
import GameTabDetail from '@/components/game/detail/tabs/GameTabDetail.vue'
import { i18n } from '@/main.ts'

const { t } = i18n.global

const props = defineProps<{
  game: GameBaseInfoResponse | null
  remark: RemarkResponse | null
}>()

type TabKey = typeof tabs.value[number]['key']

const activeTab = ref<TabKey>('intro')

const tabs = computed(() => ([
  { key: 'intro', label: t("game.detail.introduction") },
  { key: 'gallery', label: t("game.detail.gallery") },
  { key: 'comment', label: t("game.detail.comments")+`(${props.remark?.total ?? 0})` },
  { key: 'news', label: t("game.detail.news") },
  { key: 'detail', label: t("game.detail.details") }
] as const))
</script>