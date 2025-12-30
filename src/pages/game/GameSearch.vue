<template>
  <NavBar />
  <div class="flex flex-col w-full min-h-screen bg-[#f2e3d0]">
    <div class="p-6 space-y-4">

      <!-- 搜索 & 筛选栏 -->
      <div class="relative flex gap-4 items-center w-full">
        <div class="flex-1">
          <GameSidebarSearch />
        </div>

        <div
            class="shrink-0 px-4 py-2 rounded-lg cursor-pointer
           text-orange-900 bg-orange-50
           hover:bg-orange-200 transition"
            @click="showFilter = true"
        >
          {{t("game.search.advancedFilter")}}
        </div>
      </div>

      <!-- 结果展示 -->
      <GameSearchResult
          :game-list="gameList"
          :current-page="query.pageNum"
          :total-pages="totalPages"
          :total="total"
          @page-change="onPageChange"
      />

      <!-- 高级筛选 -->
      <GameSearchFilter
          v-if="showFilter"
          :tag-groups="tagGroups"
          :query="query"
          @close="showFilter = false"
          @search="onSearch"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue'
import GameSidebarSearch from '@/components/game/GameSidebarSearch.vue'
import GameSearchFilter from '@/components/game/GameSearchFilter.vue'
import GameSearchResult from '@/components/game/GameSearchResult.vue'
import { searchGameAdvanced, getTagList } from '@/utils/api/game'
import type {
  SearchPageResponseItem,
  GameTagRecord,
  SearchPageQueryRequest
} from '@/types/game'
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { useLangStore } from '@/store/langStore'
import { i18n } from '@/main.ts'

const { t } = i18n.global

const langStore = useLangStore()
const lang = ref(langStore.lang)

// 展示过滤器组件
const showFilter = ref(false)

// 数据
const gameList = ref<SearchPageResponseItem[]>([])
const total = ref(0)
const totalPages = ref(1)

// 查询参数
const query = reactive<SearchPageQueryRequest>({
  pageNum: 1,
  pageSize: 20,
  content: '',
  pub_start_time: '2000-01-01 00:00:00',
  pub_end_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
  update_start_time: '2000-01-01 00:00:00',
  update_end_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
  score: false,
  remark_order: false,
  time_order: true,
  tag_list: []
})

// 标签, 仅请求一次
const tagGroups = ref<GameTagRecord[]>([])

const loadTags = async () => {
  tagGroups.value = await getTagList(lang.value)
}

// 数据请求
const fetchData = async () => {
  const res = await searchGameAdvanced(query, lang.value)
  gameList.value = res.list ?? []
  total.value = res.total ?? 0
  totalPages.value = Math.max(
      1,
      Math.ceil(total.value / query.pageSize)
  )
}

// 分页请求
const onPageChange = async (page: number) => {
  query.pageNum = page
  await fetchData()
}

// 筛选触发
const onSearch = async () => {
  query.pageNum = 1
  showFilter.value = false
  await fetchData()
}

watch(
    () => langStore.lang,
    async (val) => {
      lang.value = val
      await loadTags()
      await fetchData()
    }
)

// 生命周期
onMounted(async () => {
  await loadTags()
  await fetchData()
})
</script>
