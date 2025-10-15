<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    <!-- 本站数据卡片 Info Box -->
    <DashboardCard>
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-24 h-24 rounded-full bg-[#ccaa88]">
          <img src="@/assets/svg/logo-mini.svg" alt="logo" class="w-24 h-24" />
        </div>
        <div class="flex flex-col">
          <div class="text-xl font-bold text-gray-700">{{ t('dashboard.siteData') }}</div>
          <div class="text-gray-500 text-sm mt-1">
            {{ t('dashboard.totalViews') }}：<span class="font-semibold text-gray-800">{{ views?.total ?? 0 }}</span><br/>
            {{ t('dashboard.yearViews') }}：<span class="font-semibold text-gray-800">{{ views?.year_count ?? 0 }}</span><br/>
            {{ t('dashboard.monthViews') }}：<span class="font-semibold text-gray-800">{{ views?.month_count ?? 0 }}</span>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- 柱状图卡片 -->
    <DashboardCard>
      <div class="mb-2 text-lg font-bold text-gray-700">{{ t('dashboard.groupStats') }}</div>
      <div ref="barChart" class="w-full h-64 flex justify-center items-center"></div>
    </DashboardCard>

    <!-- 折线图卡片 -->
    <DashboardCard>
      <div class="mb-2 text-lg font-bold text-gray-700">{{ t('dashboard.weeklyVisits') }}</div>
      <div ref="lineChart" class="w-full h-64 flex justify-center items-center"></div>
    </DashboardCard>

    <!-- 环形图卡片：国家 -->
    <DashboardCard>
      <div class="mb-2 text-lg font-bold text-gray-700">{{ t('dashboard.countryVisits') }}</div>
      <div ref="pieCountryChart" class="w-80 h-64 flex justify-center items-center"></div>
    </DashboardCard>

    <!-- 环形图卡片：省份 -->
    <DashboardCard>
      <div class="mb-2 text-lg font-bold text-gray-700">{{ t('dashboard.provinceVisits') }}</div>
      <div ref="pieProvinceChart" class="w-80 h-64 flex justify-center items-center"></div>
    </DashboardCard>

    <!-- 环形图卡片：城市 -->
    <DashboardCard>
      <div class="mb-2 text-lg font-bold text-gray-700">{{ t('dashboard.cityVisits') }}</div>
      <div ref="pieCityChart" class="w-80 h-64 flex justify-center items-center"></div>
    </DashboardCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import DashboardCard from './DashboardCard.vue'
import * as echarts from 'echarts'
import { getGroupCount, getViewsCount, getCityStat, getCountryStat, getProvinceStat } from '@/utils/api/stat.ts'
import type { ViewsCount, RegionStat, GroupCount } from '@/types/stat'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// echarts 容器
const barChart = ref<HTMLDivElement>()
const lineChart = ref<HTMLDivElement>()
const pieCityChart = ref<HTMLDivElement>()
const pieCountryChart = ref<HTMLDivElement>()
const pieProvinceChart = ref<HTMLDivElement>()

// 图表实例
let barChartInstance: echarts.ECharts | null = null
let lineChartInstance: echarts.ECharts | null = null
let pieCityInstance: echarts.ECharts | null = null
let pieCountryInstance: echarts.ECharts | null = null
let pieProvinceInstance: echarts.ECharts | null = null

// 本站数据
const views = ref<ViewsCount | null>(null)

// props 接收 groups
interface Group { id: string; name: string }
const props = defineProps<{ groups: Group[] }>()
const groupNameMap = () => {
  const map: Record<string, string> = {}
  props.groups.forEach(g => { map[g.id] = g.name })
  return map
}

// 色彩渐变
const minimalGradients = [
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#ebded1'},{offset:1,color:'#e5d4c3'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#ccaa88'},{offset:1,color:'#d9a6a6'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#d2bd96'},{offset:1,color:'#ccb488'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#c6ab79'},{offset:1,color:'#c0a96b'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#967f41'},{offset:1,color:'#b37f4d'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#a48347'},{offset:1,color:'#967841'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#876c3a'},{offset:1,color:'#775f33'}]),
  new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'#6b4c2e'},{offset:1,color:'#5e4229'}])
]

// ------------------ 柱状图 ------------------
const initBarChart = async () => {
  const data: GroupCount[] = await getGroupCount()
  const nameMap = groupNameMap()
  if (!barChart.value) return
  barChartInstance = echarts.init(barChart.value)
  barChartInstance.setOption({
    grid: { left: '5%', right: '5%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(item => nameMap[item.group_id] || item.group_id),
      axisLabel: {
        interval: 0,
        rotate: 0,
        formatter: (val: string) => val.length>7 ? val.slice(0,7)+'…':val
      }
    },
    yAxis: {
      type: 'value',
      name: t('dashboard.countUnit'),
      nameLocation: 'end',
      nameTextStyle: { color:'#555', fontSize:12 }
    },
    series: [{
      type:'bar',
      data:data.map(item=>item.count),
      showBackground:true,
      backgroundStyle:{ color:"rgba(41,37,36,0.1)" },
      itemStyle:{ color:'#5e4229', borderRadius:[4,4,0,0] }
    }]
  })
}

// ------------------ 折线图 ------------------
const initLineChart = async () => {
  const data = await getViewsCount()
  views.value = data
  if (!lineChart.value) return
  lineChartInstance = echarts.init(lineChart.value)
  lineChartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params:any) => `${params[0].axisValue}<br/>${t('dashboard.visits')}: ${params[0].data}`
    },
    xAxis: { type:'category', data:data.date.map(d=>d.slice(5)), axisLabel:{rotate:0,color:'#555'} },
    yAxis: { type:'value', name:t('dashboard.visitsUnit'), nameLocation:'end', nameTextStyle:{color:'#555',fontSize:12}, axisLabel:{formatter:'{value}'} },
    series:[{ type:'line', data:data.count, smooth:true,
      label:{show:true,position:'top',color:'#57534e',fontSize:12},
      lineStyle:{color:'#5e4229',width:2},
      itemStyle:{color:'#5e4229',borderColor:'#5e4229',borderWidth:2},
      areaStyle:{color:'rgba(41,37,36,0.1)'}
    }],
    grid:{left:'5%',right:'5%',bottom:'15%',containLabel:true}
  })
}

// ------------------ 环形图 ------------------
const initPieChart = async (el: HTMLDivElement | undefined, fetchFn: () => Promise<RegionStat>, title:string) => {
  if (!el) return
  const data = await fetchFn()
  const chart = echarts.init(el)
  chart.setOption({
    tooltip:{trigger:'item'},
    legend:{orient:'vertical',left:'left',top:'center'},
    series:[{
      type:'pie',
      radius:['40%','70%'],
      label:{show:false},
      labelLine:{show:false},
      hoverAnimation:false,
      minAngle:1,
      data:Object.entries(data.region_map).map(([name,value],i)=>({
        name,value,
        itemStyle:{color:minimalGradients[i%minimalGradients.length], borderColor:minimalGradients, borderWidth:1}
      })),
      center:['50%','50%']
    }],
    title: {
      text: title,
      left: 'center',
      top: 'center',
    },
    graphic:{
      type:'text',
      left:'center',
      top:'center',
      style:{ text:title, textAlign:'center', fill:'#fff', fontSize:16, fontWeight:'bold' }
    }
  })
  return chart
}

// 初始化所有图表
const initAllCharts = async () => {
  await Promise.all([
    initBarChart(),
    initLineChart(),
    nextTick(() => {
      pieCityInstance = initPieChart(pieCityChart.value,getCityStat,t('dashboard.city')) as any
      pieCountryInstance = initPieChart(pieCountryChart.value,getCountryStat,t('dashboard.country')) as any
      pieProvinceInstance = initPieChart(pieProvinceChart.value,getProvinceStat,t('dashboard.province')) as any
    })
  ])
}

// 窗口缩放时保持图表自适应
const resizeCharts = () => {
  [barChartInstance,lineChartInstance,pieCityInstance,pieCountryInstance,pieProvinceInstance].forEach(chart=>{
    chart?.resize()
  })
}

onMounted(async () => {
  await initAllCharts()
  window.addEventListener('resize', resizeCharts)
})

// 监听 groups 或语言变化刷新图表
watch([() => props.groups, locale], async () => {
  await initAllCharts()
}, { deep: true })

</script>
