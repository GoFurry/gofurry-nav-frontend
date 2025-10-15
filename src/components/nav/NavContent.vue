<template>
  <div class="p-6 overflow-x-hidden">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-8 text-gray-500">加载中...</div>

    <!-- 站点分组 -->
    <div v-for="group in groups" :key="group.id" class="mb-10 relative">
      <!-- 分组标题 -->
      <div
          class="relative inline-block cursor-pointer"
          @mouseenter="onGroupMouseEnter(group.id, $event)"
          @mouseleave="onGroupMouseLeave"
      >
        <h2 class="text-xl font-semibold hover:text-amber-600 transition-colors">
          {{ group.name }}
        </h2>
        <!-- 标题详情框 -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
          <div
              v-if="hoverGroup === group.id"
              class="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-lg p-3 w-64 text-sm text-gray-700"
              :style="{ left: `${groupHoverLeft}px`, top: `${groupHoverTop}px` }"
              @mouseenter="hoveringGroupDetail = true"
              @mouseleave="hoveringGroupDetail = false"
          >
            {{ group.info }}
          </div>
        </Transition>
      </div>

      <!-- 站点网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-2 relative">
        <div
            v-for="site in sites.filter(s => group.sites.includes(s.id))"
            :key="`${group.id}-${site.id}`"
            class="relative bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer flex gap-3"
            @click="goDomain(getDomains(site))"
            @mouseenter="onSiteMouseEnter(group.id, site.id, $event)"
            @mouseleave="onSiteMouseLeave"
        >
          <!-- 左侧Logo -->
          <img
              :src="`${logoPrefix ? `${logoPrefix}/` : ''}${site.icon || defaultLogo}`"
              alt="icon"
              class="w-12 h-12 rounded flex-shrink-0"
          />

          <!-- 右侧内容 -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <!-- 第一行 -->
            <div class="flex items-center gap-0.5">
              <h3 class="text-base font-medium truncate">{{ site.name }}</h3>

              <!-- 国旗 -->
              <img
                  v-if="site.country"
                  :src="getFlag(site.country)"
                  class="w-4 h-4 ml-auto"
                  alt="flag"
              />

              <!-- NSFW -->
              <span v-if="site.nsfw === '1'" class="ml-1">🔞</span>

              <!-- 商业/公益 -->
              <img
                  v-if="site.welfare === '1'"
                  src="../../assets/svgs/free.svg"
                  class="w-4 h-4 ml-1"
                  alt="welfare"
              />
              <img
                  v-else
                  src="../../assets/svgs/money-bag.svg"
                  class="w-4 h-4 ml-1"
                  alt="paid"
              />
            </div>

            <!-- 第二行 -->
            <p class="text-xs text-gray-500 truncate mt-1">{{ site.info }}</p>
          </div>

          <!-- 站点详情 -->
          <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
          >
            <div
                v-if="hoverSite === `${group.id}-${site.id}`"
                class="absolute z-20 bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-72 text-sm text-gray-700"
                :style="{ left: `${hoverLeft}px`, top: `${hoverTop}px` }"
                @mouseenter="hoveringDetail = true"
                @mouseleave="hoveringDetail = false"
            >
              <h3 class="font-semibold text-base mb-1">{{ site.name }}</h3>
              <p class="text-gray-600 mb-3 break-words">{{ site.info }}</p>

              <div v-if="getDomains(site).length" class="space-y-1 max-h-44 overflow-y-auto">
                <div
                    v-for="domain in getDomains(site)"
                    :key="domain"
                    class="flex items-center justify-between text-xs px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                    @click.stop="goSite(site.id, domain)"
                >
                  <div class="flex items-center gap-1 truncate max-w-[60%]">
                    <img
                        :src="pingData[domain]?.status === 'up' ? greenCircle : redCircle"
                        alt="status"
                        class="w-3 h-3 shrink-0"
                    />
                    <span class="text-gray-800 truncate">{{ domain }}</span>
                  </div>
                  <div class="text-gray-500 text-right shrink-0">
                    {{ pingData[domain]?.loss + "%" }}/{{ pingData[domain]?.delay }}
                  </div>
                </div>
              </div>

              <div v-else class="text-gray-400 text-xs text-center mt-2">
                暂无域名数据
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useLangStore } from '@/store/langStore.ts'
import { getGroups, getSites, getPing } from '@/utils/api/nav.ts'
import type { Group, Site, Delay } from '@/types/nav.ts'
import greenCircle from '@/assets/svgs/green-circle.svg'
import redCircle from '@/assets/svgs/red-circle.svg'

// 国旗
import cnFlag from '@/assets/flags/cn.svg'
import usFlag from '@/assets/flags/us.svg'
import frFlag from '@/assets/flags/fr.svg'
import deFlag from '@/assets/flags/de.svg'
import itFlag from '@/assets/flags/it.svg'
import jpFlag from '@/assets/flags/jp.svg'
import ruFlag from '@/assets/flags/ru.svg'
import krFlag from '@/assets/flags/kr.svg'
import esFlag from '@/assets/flags/es.svg'
import ukFlag from '@/assets/flags/uk.svg'
import globalFlag from '@/assets/flags/global.svg'

function getFlag(country: string) {
  switch (country) {
    case 'CN': return cnFlag
    case 'USA': return usFlag
    case 'FR': return frFlag
    case 'DE': return deFlag
    case 'IT': return itFlag
    case 'JP': return jpFlag
    case 'RU': return ruFlag
    case 'KR': return krFlag
    case 'ES': return esFlag
    case 'UK': return ukFlag
    case 'GLOBAL': return globalFlag
    default: return ''
  }
}

const groups = ref<Group[]>([])
const sites = ref<Site[]>([])
const pingData = ref<Record<string, Delay>>({})
const loading = ref(true)
const langStore = useLangStore()
let timer: ReturnType<typeof setInterval> | null = null

const logoPrefix = import.meta.env.VITE_SITE_LOGO_PREFIX_URL || ''
const defaultLogo = 'defaultLogo.svg'

// 站点悬浮
const hoverSite = ref<string | null>(null)
const hoveringDetail = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null
const hoverLeft = ref(0)
const hoverTop = ref(0)

// 分组悬浮
const hoverGroup = ref<string | null>(null)
const hoveringGroupDetail = ref(false)
let hideGroupTimer: ReturnType<typeof setTimeout> | null = null
const groupHoverLeft = ref(0)
const groupHoverTop = ref(0)

// 请求数据
async function loadData() {
  try {
    const lang = langStore.lang
    const [groupRes, siteRes, pingRes] = await Promise.all([
      getGroups(lang),
      getSites(lang),
      getPing()
    ])
    groups.value = groupRes.sort((a, b) => Number(a.priority) - Number(b.priority))
    sites.value = siteRes
    parsePingData(pingRes)
  } catch (e) {
    console.error('加载导航数据失败', e)
  } finally {
    loading.value = false
  }
}

// 解析数据
function parsePingData(data: Record<string, string>) {
  const parsed: Record<string, Delay> = {}
  for (const domain in data) {
    try {
      const raw = data[domain] ? JSON.parse(data[domain]) : null
      parsed[domain] = {
        status: raw?.status ?? 'down',
        delay: raw?.delay ?? '-',
        loss: raw?.loss ?? '-',
        time: raw?.time ?? '-',
      }
    } catch {
      parsed[domain] = { status: 'down', delay: '-', loss: '-', time: '-' }
    }
  }
  pingData.value = parsed
}

function getDomains(site: Site): string[] {
  try {
    if (Array.isArray(site.domain)) return site.domain
    const obj = JSON.parse(site.domain)
    return Array.isArray(obj?.domain) ? obj.domain : []
  } catch {
    return [site.domain]
  }
}

// 鼠标事件
function onSiteMouseEnter(groupId: string, siteId: string, event: MouseEvent) {
  if (hideTimer) clearTimeout(hideTimer)
  hoverSite.value = `${groupId}-${siteId}`
  nextTick(() => {
    const target = event.currentTarget as HTMLElement
    const tooltipWidth = 288
    const rect = target.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const gap = 8
    let left = rect.width + gap
    let top = 0

    if (rect.left + rect.width + tooltipWidth + gap > viewportWidth) {
      left = 0
      top = rect.height + gap
    }

    const group = groups.value[groups.value.length - 1] as Group
    if (group.id === groupId) {
      top = -rect.height - gap
    }

    hoverLeft.value = left
    hoverTop.value = top
  })
}

function onSiteMouseLeave() {
  hideTimer = setTimeout(() => {
    if (!hoveringDetail.value) hoverSite.value = null
  }, 200)
}

function onGroupMouseEnter(groupId: string, event: MouseEvent) {
  if (hideGroupTimer) clearTimeout(hideGroupTimer)
  hoverGroup.value = groupId
  nextTick(() => {
    const target = event.currentTarget as HTMLElement
    const tooltipWidth = 256
    const rect = target.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const gap = 8

    let left = 0
    let top = rect.height + gap

    if (rect.left + tooltipWidth > viewportWidth) {
      left = viewportWidth - rect.left - tooltipWidth - gap
    }

    groupHoverLeft.value = left
    groupHoverTop.value = top
  })
}

function onGroupMouseLeave() {
  hideGroupTimer = setTimeout(() => {
    if (!hoveringGroupDetail.value) hoverGroup.value = null
  }, 200)
}

// 路由跳转
import { useRouter } from 'vue-router'
const router = useRouter()
function goSite(siteId: string, domain: string) {
  router.push(`/site/${siteId}?domain=${domain}`)
}
function goDomain(domain: string[]) {
  window.open(`https://${domain[0]}`, '_blank')
}

// 生命周期
onMounted(() => {
  loadData()
  timer = setInterval(async () => {
    try {
      const pingRes = await getPing()
      parsePingData(pingRes)
    } catch (err) {
      console.warn('Ping 刷新失败', err)
    }
  }, 60000)
})

// 监听语言切换
watch(() => langStore.lang, () => {
  loadData()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (hideTimer) clearTimeout(hideTimer)
  if (hideGroupTimer) clearTimeout(hideGroupTimer)
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>
