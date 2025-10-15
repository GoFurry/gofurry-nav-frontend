<template>
  <div class="flex flex-col w-full h-[100vh] overflow-x-hidden">
    <!-- 顶部栏 -->
    <div
        class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-100 shadow-sm sticky top-0 z-10"
    >
      <h2
          class="text-lg font-semibold flex items-center gap-2 text-gray-800 hover:text-gray-600 hover:cursor-pointer"
          @click="goTo('/home')"
      >
        <img src="@/assets/svgs/home-dark.svg" alt="home" class="w-5 h-5" />
        {{ t('site.title') }}
      </h2>
    </div>

    <NavBar />

    <!-- 加载中 -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-gray-500">加载中...</div>

    <!-- 错误状态 -->
    <div v-else-if="errorMsg" class="flex-1 flex items-center justify-center text-red-500">
      {{ errorMsg }}
    </div>

    <!-- 顶部概览区 -->
    <div class="mx-10 my-8">
      <SiteOverview
          v-if="siteInfo"
          :site="{
          name: siteInfo.name || '',
          icon: siteInfo.icon || undefined,
          domain: domain || '',
          welfare: siteInfo.welfare === '1',
          nsfw: siteInfo.nsfw === '1',
          description: siteInfo.info || ''
        }"
      />
    </div>

    <div class="mx-10 mb-8">
      <SitePerformance
          v-if="sitePingRecord && siteHttpRecord"
          :pingRecord="sitePingRecord"
          :httpRecord="siteHttpRecord"
      />
    </div>

    <div class="mx-10 mb-8">
      <SiteHttpPanel
          v-if="siteHttpRecord"
          :record="siteHttpRecord"
      />
    </div>

    页面开发中...不代表最终品质
    <div class="h-1100"></div>
    <div class="mb-8 mr-4 flex flex-wrap gap-3 justify-end">
      <button class="px-4 py-2 bg-orange-200 hover:bg-orange-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors">
        <i class="fa fa-refresh"></i>
        生成报告
      </button>
      <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors">
        <i class="fa fa-exclamation-triangle"></i>
        刷新数据
      </button>
    </div>
    <Footer />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLangStore } from '@/store/langStore.ts'
import { getSiteDetail, getSitePingRecord, getSiteHttpRecord, getSiteDnsRecord } from '@/utils/api/nav'
import SiteOverview from '@/components/site/SiteOverview.vue'
import SitePerformance from '@/components/site/SitePerformance.vue'
import SiteHttpPanel from '@/components/site/SiteHttpPanel.vue'
import {i18n} from "@/main.ts";

import type { SiteInfo, PingRecord, HttpRecord, DnsRecord, DnsItem } from '@/types/nav'
import { safeJsonParse } from '@/utils/util.ts'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'


const t = (key: string) => i18n.global.t(key)

// 基础实例
const route = useRoute()
const router = useRouter()
const langStore = useLangStore()

const siteId = route.params.id as string
const domain = route.query.domain as string

// 状态
const loading = ref(true)
const errorMsg = ref('')
const siteInfo = ref<SiteInfo | null>(null)
const sitePingRecord = ref<PingRecord | null>(null)
const siteHttpRecord = ref<HttpRecord | null>(null)
const siteDnsRecord = ref<DnsRecord | null>(null)

async function loadData() {
  loading.value = true
  errorMsg.value = ''
  try {
    const lang = langStore.lang

    // 并行拉取
    const [info, http, dns, ping] = await Promise.all([
      getSiteDetail(siteId, lang),
      getSiteHttpRecord(domain),
      getSiteDnsRecord(domain),
      getSitePingRecord(domain)
    ])

    // 存储
    siteInfo.value = info

    // 解析 HTTP 记录
    siteHttpRecord.value = safeJsonParse<HttpRecord>(http as any)

    // DNS：后端字段可能是字符串形式的 JSON，需要拆解
    const parsedDns = { ...dns }
    for (const key in parsedDns) {
      if (typeof parsedDns[key as keyof DnsRecord] === 'string') {
        parsedDns[key as keyof DnsRecord] = safeJsonParse<DnsItem[]>(
            parsedDns[key as keyof DnsRecord]
        ) as any
      }
    }
    siteDnsRecord.value = parsedDns

    // 延迟时序直接赋值
    sitePingRecord.value = ping
  } catch (err: any) {
    console.error('加载详情页数据失败:', err)
    errorMsg.value = '加载站点信息失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 切换语言时仅重新加载站点文字信息
async function loadSiteInfoOnly() {
  try {
    const lang = langStore.lang
    siteInfo.value = await getSiteDetail(siteId, lang)
  } catch (e) {
    console.error('加载站点基础信息失败:', e)
  }
}

// 生命周期
onMounted(() => loadData())
watch(() => langStore.lang, () => loadSiteInfoOnly())

// 导航跳转
const goTo = (path: string) => {
  if (route.path !== path) router.push(path)
}
</script>

