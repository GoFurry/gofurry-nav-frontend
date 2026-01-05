<template>
  <div class="space-y-4 sticky top-6">
    <GameSidebarLinks :game="game" />
    <GameSidebarSimilar :recommend="recommend" />
  </div>
</template>

<script setup lang="ts">
import type { GameBaseInfoResponse, RecommendedModel } from '@/types/game'
import GameSidebarLinks from '@/components/game/detail/GameSidebarLinks.vue'
import GameSidebarSimilar from '@/components/game/detail/GameSidebarSimilar.vue'

defineProps<{
  game: GameBaseInfoResponse | null
  recommend: RecommendedModel[] | null
}>()
</script>
