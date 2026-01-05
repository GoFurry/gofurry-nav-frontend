<template>
  <div class="bg-white rounded-xl shadow-sm transition-all hover:shadow-md overflow-hidden">
    <!-- 顶部标题栏 -->
    <div class="p-5 cursor-pointer flex items-center justify-between" @click="togglePanel">
      <h3 class="font-semibold flex items-center gap-2">
        {{ t('site.siteDnsPanel.dnsRecord') }}
      </h3>
    </div>

    <!-- 折叠面板内容 -->
    <transition name="fade">
      <div v-if="isOpen" class="border-t border-gray-100">
        <!-- 类型切换导航 -->
        <div class="flex overflow-x-auto border-b border-gray-100">
          <button
              v-for="type in dnsTypes"
              :key="type"
              @click="setDnsType(type)"
              class="px-4 py-3 whitespace-nowrap text-sm font-bold"
              :class="activeDnsType === type
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'">
            {{ type }}
          </button>
        </div>

        <!-- 记录表格 -->
        <div class="p-5 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-lg">{{ t('site.siteDnsPanel.type') }}</th>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{{ t('site.siteDnsPanel.value') }}</th>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">TTL</th>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">DNSSEC</th>
              <th class="px-3 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tr-lg">{{ t('site.siteDnsPanel.more') }}</th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="dnsData[activeDnsType] && dnsData[activeDnsType]?.length">
              <template v-for="(record, index) in dnsData[activeDnsType]" :key="index">
                <!-- 主行 -->
                <tr class="hover:bg-gray-50">
                  <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.type }}</td>
                  <td class="px-3 py-3 text-sm max-w-xs truncate hover:whitespace-normal hover:max-w-none">
                    <span class="text-blue-500 cursor-pointer hover:underline">{{ record.value }}</span>
                  </td>
                  <td class="px-3 py-3 whitespace-nowrap text-sm">{{ record.ttl }}s</td>
                  <td class="px-3 py-3 whitespace-nowrap text-sm">
                    <span v-if="record.dnssec" class="text-green-500">✓</span>
                    <span v-else class="text-gray-400">✗</span>
                  </td>
                  <td class="px-3 py-3 whitespace-nowrap text-sm">
                    <button
                        class="text-blue-500 text-xs"
                        @click.stop="toggleDnsDetails(activeDnsType, index)"
                    >
                      {{ dnsDetails[activeDnsType]?.[index] ? t('common.collapse') : t('common.expand') }}
                    </button>
                  </td>
                </tr>

                <!-- 详情行 -->
                <tr
                    v-if="dnsDetails[activeDnsType]?.[index]"
                    class="bg-gray-50"
                >
                  <td colspan="5" class="px-5 py-3 text-sm text-gray-700">
                    <div class="space-y-1">
                      <div><span class="font-bold">ASN:</span> {{ record.asn || t('site.siteDnsPanel.unk') }}</div>
                      <div><span class="font-bold">ISP:</span> {{ record.isp || t('site.siteDnsPanel.unk') }}</div>
                      <div><span class="font-bold">{{ t('site.siteDnsPanel.country') }}:</span> {{ record.country || t('site.siteDnsPanel.unk') }}</div>
                      <div><span class="font-bold">{{ t('site.siteDnsPanel.city') }}:</span> {{ record.city || t('site.siteDnsPanel.unk') }}</div>
                      <div><span class="font-bold">{{ t('site.siteDnsPanel.reversePtr') }}:</span> {{ record.reverse_ptr || t("site.siteDnsPanel.none") }}</div>
                      <div><span class="font-bold">{{ t('site.siteDnsPanel.hijacked') }}:</span> {{ record.hijacked ? t('common.yes') : t('common.no') }}</div>

                      <!-- 子记录 -->
                      <div v-if="record.children?.length" class="mt-3">
                        <div class="font-bold mb-1">子记录:</div>
                        <table class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                          <thead>
                          <tr class="bg-gray-100 text-gray-600">
                            <th class="px-2 py-1 text-left">{{ t('site.siteDnsPanel.type') }}</th>
                            <th class="px-2 py-1 text-left">{{ t('site.siteDnsPanel.value') }}</th>
                            <th class="px-2 py-1 text-left">ASN</th>
                            <th class="px-2 py-1 text-left">{{ t('site.siteDnsPanel.country') }}</th>
                            <th class="px-2 py-1 text-left">ISP</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr
                              v-for="(child, ci) in record.children"
                              :key="ci"
                              class="border-t border-gray-200"
                          >
                            <td class="px-2 py-1">{{ child.type }}</td>
                            <td class="px-2 py-1">{{ child.value }}</td>
                            <td class="px-2 py-1">{{ child.asn || t("site.siteDnsPanel.none") }}</td>
                            <td class="px-2 py-1">{{ child.country || t("site.siteDnsPanel.none") }}</td>
                            <td class="px-2 py-1">{{ child.isp || t("site.siteDnsPanel.none") }}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </template>

            <tr v-else>
              <td colspan="5" class="px-5 py-6 text-center text-gray-400 text-sm">
                {{ t('site.siteDnsPanel.none') }} {{ activeDnsType }} {{ t('site.siteDnsPanel.record') }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DnsItem, DnsRecord } from '@/types/nav'
import {i18n} from "@/main.ts";

const t = (key: string) => i18n.global.t(key)

const props = defineProps<{ record: DnsRecord | null }>()

const isOpen = ref(true)
const activeDnsType = ref('A')
const dnsTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS']
const dnsData = ref<Record<string, DnsItem[]>>({})
const dnsDetails = ref<Record<string, Record<number, boolean>>>({})

watch(
    () => props.record,
    (newVal) => {
      if (!newVal) return
      dnsData.value = {
        A: (newVal.a as any) || [],
        AAAA: (newVal.AAAA as any) || [],
        CNAME: (newVal.CNAME as any) || [],
        MX: (newVal.MX as any) || [],
        TXT: (newVal.txt as any) || [],
        NS: (newVal.ns as any) || []
      }
    },
    { immediate: true }
)

const togglePanel = () => (isOpen.value = !isOpen.value)
const setDnsType = (type: string) => (activeDnsType.value = type)
const toggleDnsDetails = (type: string, index: number) => {
  if (!dnsDetails.value[type]) dnsDetails.value[type] = {}
  dnsDetails.value[type][index] = !dnsDetails.value[type][index]
}
</script>

<style scoped>

</style>
