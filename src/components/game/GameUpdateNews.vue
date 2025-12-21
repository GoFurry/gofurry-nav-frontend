<template>
  <div class="bg-white/1 backdrop-blur-md rounded-2xl shadow p-5 mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold text-lg">{{ t("game.news.title") }}</h2>
      <div class="text-sm text-gray-500">{{ t("game.news.desc") }}</div>
    </div>

    <div class="overflow-x-auto">
      <div class="flex gap-4 min-w-max">
        <div
            v-for="(news) in newsList"
            :key="news.id"
            class="relative flex-shrink-0 w-72 rounded-lg p-3 mb-1 cursor-pointer transition bg-orange-50 hover:bg-orange-100"
            @click="openUrl(news.url)"
            ref="newsRefs"
        >
          <!-- 封面图 -->
          <img
              :src="news.header"
              alt="cover"
              class="w-full h-36 object-cover rounded-lg mb-2"
              ref="coverRefs"
              @mouseenter="onNewsMouseEnter(news, $event)"
              @mouseleave="onNewsMouseLeave"
          />

          <!-- 标题 -->
          <h3 class="font-semibold truncate">{{ htmlToPlainText(news.headline) }}</h3>

          <!-- 时间 + 作者 -->
          <div class="text-xs text-gray-500 mt-1 flex justify-between">
            <span>{{ formatTime(news.post_time) }}</span>
            <span>{{ news.author }}</span>
          </div>

          <!-- 简短描述 -->
          <p class="text-sm text-gray-700 mt-2 line-clamp-3">
            {{ htmlToPlainText(news.content) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 浮动卡片 -->
    <Teleport to="body">
      <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
      >
        <div
            v-if="hoverNews"
            class="fixed bg-orange-100 backdrop-blur-md shadow-lg p-4 rounded-lg w-80 text-sm text-gray-800 overflow-x-hidden"
            :style="{ left: hoverLeft + 'px', top: hoverTop + 'px' }"
        >
          <div v-html="hoverNews.content"></div>
        </div>
      </Transition>
    </Teleport>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { i18n } from '@/main.ts';
import { useLangStore } from '@/store/langStore';
import { getLatestGameNews } from "@/utils/api/game.ts";
import type { TopPriceRecord, NewsBaseModel } from "@/types/game.ts";

const { t } = i18n.global;
const langStore = useLangStore();
const lang = ref(langStore.lang);

const newsList = ref<NewsBaseModel[]>([]);
const newsRefs = ref<HTMLElement[]>([]);
const coverRefs = ref<HTMLElement[]>([]);

const hoverNews = ref<NewsBaseModel | null>(null);
const hoveringDetail = ref(false);
const hideTimer: { timer: number | null } = { timer: null };

const hoverTop = ref(0);
const hoverLeft = ref(0);

// 格式化时间
function formatTime(postTime: string) {
  const d = new Date(postTime);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

// 去掉 HTML
function htmlToPlainText(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// 点击打开链接
function openUrl(url: string) {
  window.open(url, "_blank");
}

function onNewsMouseEnter(news: NewsBaseModel, event: MouseEvent) {
  if (hideTimer.timer) clearTimeout(hideTimer.timer)
  hoverNews.value = news;

  nextTick(() => {
    const img = event.currentTarget as HTMLElement
    const rect = img.getBoundingClientRect()
    const gap = 180

    // 封面图下方
    hoverTop.value = rect.bottom + gap

    // 左侧完全对齐封面图
    hoverLeft.value = rect.left - 28
  })
}


function onNewsMouseLeave() {
  hideTimer.timer = setTimeout(() => {
    if (!hoveringDetail.value) hoverNews.value = null;
  }, 200);
}

// 获取新闻数据
async function loadNews() {
  try {
    const res: TopPriceRecord = await getLatestGameNews();
    newsList.value = lang.value === "en" ? res.news_en : res.news_zh;
    nextTick(() => {
      newsRefs.value = newsRefs.value.slice(0, newsList.value.length);
      coverRefs.value = coverRefs.value.slice(0, newsList.value.length);
    });
  } catch (e) {
    console.error("加载新闻失败", e);
    newsList.value = [];
  }
}

onMounted(() => {
  loadNews();
});

watch(() => langStore.lang, (newLang) => {
  lang.value = newLang;
  loadNews();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 横向滚动条美化 */
::-webkit-scrollbar {
  height: 8px; /* 横向滚动条高度 */
}

::-webkit-scrollbar-track {
  background: transparent; /* 背景透明更现代 */
}

::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.4); /* 橘色（tailwind: orange-500） */
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 115, 22, 0.7); /* 悬浮变亮 */
}
</style>
