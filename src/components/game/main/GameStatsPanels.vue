<template>
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- 在线人数 TOP -->
    <div class="flex-1 bg-white/1 backdrop-blur-md rounded-xl p-5 shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-lg">{{ t("game.panel.playerCount") }}</h2>
        <div class="text-sm text-gray-500 hidden sm:table-cell">{{ t("game.panel.playerCountDesc") }}</div>
      </div>

      <table class="w-full text-sm table-fixed">
        <thead class="text-gray-600">
        <tr>
          <th class="w-28 text-center hidden sm:table-cell"></th>
          <th class="text-left">{{ t("common.game") }}</th>
          <th class="text-right">{{ t("game.panel.recentOnline") }}</th>
          <th class="text-right hidden sm:table-cell">{{ t("game.panel.onlinePeak") }}</th>
          <th class="text-right hidden sm:table-cell">{{ t("common.time") }}</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="item in countListToShow"
            :key="item.id"
            class="group odd:bg-orange-50 even:bg-white/1 hover:bg-orange-100 transition-colors duration-150 h-16"
        >
          <td class="px-2 hidden sm:table-cell">
            <img :src="item.header" class="h-full w-full object-cover" alt="cover" />
          </td>
          <td class="px-2 font-medium truncate max-w-[200px]">{{ item.name }}</td>
          <td class="text-right px-2 font-semibold truncate">{{ item.count_recent }}</td>
          <td class="text-right px-2 font-semibold truncate hidden sm:table-cell">{{ item.count_peak }}</td>
          <td class="text-right px-2 text-gray-500 text-xs truncate hidden sm:table-cell">{{ formatTime(item.collect_time) }}</td>
        </tr>
        </tbody>
      </table>

      <!-- 展开/收起按钮 -->
      <div v-if="countList.length > 5" class="text-center mt-2">
        <div
            class="text-md text-cyan-900 hover:text-cyan-700 transition cursor-pointer hover:bg-orange-100 p-2 rounded-md"
            @click="toggleCountList"
        >
          {{ showAllCountList ? t('common.collapse') : t('common.expand') }}
        </div>
      </div>
    </div>

    <!-- 价格 TOP -->
    <div class="flex-1 bg-white/1 backdrop-blur-md rounded-xl p-5 shadow">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-lg">{{ t("game.panel.topPrice") }}</h2>
        <div class="text-sm text-gray-500 hidden sm:table-cell">{{ t("game.panel.topPriceDesc") }}</div>
      </div>

      <table class="w-full text-sm table-fixed">
        <thead class="text-gray-600">
        <tr>
          <th class="w-28 text-center hidden sm:table-cell"></th>
          <th class="text-left">{{ t("common.game") }}</th>
          <th class="text-right hidden sm:table-cell">{{ t("game.panel.global") }}</th>
          <th class="text-right">{{ t("game.panel.china") }}</th>
          <th class="text-right hidden sm:table-cell">{{ t("game.panel.discount") }}</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="item in priceListToShow"
            :key="item.id"
            class="group odd:bg-orange-50 even:bg-white/1 hover:bg-orange-100 transition-colors duration-150 h-16"
        >
          <td class="px-2 hidden sm:table-cell">
            <img :src="item.header" class="h-full w-full object-cover" alt="cover" />
          </td>
          <td class="px-2 font-medium truncate max-w-[200px]">{{ item.name }}</td>
          <td class="text-right px-2 font-semibold hidden sm:table-cell">{{ formatPrice(item.global_price, true) }}</td>
          <td class="text-right px-2 font-semibold">{{ formatPrice(item.china_price, false) }}</td>
          <td class="text-right px-2 font-bold hidden sm:table-cell" :class="item.discount > 0 ? 'text-red-500' : 'text-gray-400'">
            <span v-if="item.discount > 0">-{{ item.discount }}%</span>
            <span v-else>{{t("game.panel.none")}}</span>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 展开/收起按钮 -->
      <div v-if="priceList.length > 5" class="text-center mt-2">
        <div
            class="text-md text-cyan-900 hover:text-cyan-700 transition cursor-pointer hover:bg-orange-100 p-2 rounded-md"
            @click="togglePriceList"
        >
          {{ showAllPriceList ? t('common.collapse') : t('common.expand') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TopPlayerCountRecord, TopPriceRecord } from "@/types/game.ts";
import { i18n } from '@/main.ts'

const { t } = i18n.global

const props = defineProps<{
  countList: TopPlayerCountRecord[];
  priceList: TopPriceRecord[];
}>();

import { ref, computed } from 'vue'

// 默认显示5个, 最多15个
const showAllCountList = ref(false)
const showAllPriceList = ref(false)

const countListToShow = computed(() => {
  return showAllCountList.value ? props.countList.slice(0, 15) : props.countList.slice(0, 5)
})
const priceListToShow = computed(() => {
  return showAllPriceList.value ? props.priceList.slice(0, 15) : props.priceList.slice(0, 5)
})

function toggleCountList() {
  showAllCountList.value = !showAllCountList.value
}
function togglePriceList() {
  showAllPriceList.value = !showAllPriceList.value
}

function formatTime(t: number) {
  const chinaOffset = 24 * 3600;
  const d = new Date((t + chinaOffset) * 1000);

  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;
}


// 价格格式化, 最后两位是小数
function formatPrice(v: number, isGlobal: boolean) {
  if (v === 0) return t("game.panel.none");
  const price = (v / 100).toFixed(2);
  return isGlobal ? `$${price}` : `¥${price}`;
}
</script>
