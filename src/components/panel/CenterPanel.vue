<template>
  <div class="center-panel h-full flex flex-col">
    <!-- 顶部数据条 -->
    <div class="barnav mb-4 p-3 rounded-md bg-gradient-to-r from-[#001c3d] to-[#002e5e] shadow-lg">
      <div class="barbox">
        <ul class="grid grid-cols-3 gap-2">
          <li class="text-center text-2xl font-bold text-yellow-400 counter">
            {{ commonStat?.site_count ?? '-' }}
          </li>
          <li class="text-center text-2xl font-bold text-yellow-400 counter">
            {{ commonStat?.domain_count ?? '-' }}
          </li>
          <li class="text-center text-2xl font-bold text-yellow-400 counter">
            {{ (commonStat?.site_reach_rate ?? 0).toFixed(2) }}%
          </li>
        </ul>
      </div>
      <div class="barbox2 mt-2">
        <ul class="grid grid-cols-3 gap-2">
          <li class="text-center text-blue-200 text-sm">收录站点数</li>
          <li class="text-center text-blue-200 text-sm">采集域名数</li>
          <li class="text-center text-blue-200 text-sm">站点可达率</li>
        </ul>
      </div>
    </div>

    <!-- 地图容器 -->
    <div class="mapbox flex-1 p-3 rounded-md relative overflow-hidden">
      <div class="map w-full h-full relative">
        <div class="absolute inset-0 flex items-center justify-center animate-spin-clockwise">
          <img src="@/assets/images/lbx.png" alt="" class="w-[80%] h-[80%] object-contain">
        </div>

        <div class="absolute inset-0 flex items-center justify-center animate-spin-counter">
          <img src="@/assets/images/jt.png" alt="" class="w-[70%] h-[70%] object-contain">
        </div>

        <div class="absolute inset-0 flex items-center justify-center opacity-50">
          <img src="@/assets/images/map.png" alt="" class="w-[60%] h-[60%] object-contain">
        </div>

        <div class="absolute inset-0" ref="mapContainer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import chinaMapData from '@/assets/json/china.json'

// Props
const props = defineProps({
  commonStat: Object,
  cityStat: Object
})

let mapChart = null
const mapContainer = ref(null)

// 城市经纬度映射（可扩展）
const geoCoordMap = {
  '上海': [121.4737, 31.2304],
  '北京': [116.4074, 39.9042],
  '常州市': [119.9816, 31.8170],
  '广州市': [113.2644, 23.1291],
  '成都': [104.0665, 30.5728],
  '武汉': [114.3054, 30.5931],
  '深圳': [114.0579, 22.5431],
  '郑州市': [113.6254, 34.7466]
}

// 转换 cityStat 数据为 echarts series 格式
const getSeriesData = (cityStat) => {
  if (!cityStat?.region_map) return []
  return Object.entries(cityStat.region_map)
      .map(([name, value]) => {
        const coord = geoCoordMap[name]
        return coord ? { name, value: [...coord, value] } : null
      })
      .filter(Boolean)
}

// 初始化地图
const initMapChart = () => {
  if (!mapContainer.value) return
  mapChart && mapChart.dispose()
  mapChart = echarts.init(mapContainer.value)
  echarts.registerMap('china', chinaMapData)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: params => `${params.name}<br/>访问量: ${params.value[2] ?? params.value}`
    },
    geo: {
      map: 'china',
      roam: true,
      label: { show: false },
      itemStyle: {
        normal: { areaColor: '#0c213a', borderColor: '#065aab', borderWidth: 1.5 },
        emphasis: { areaColor: '#0958d9' }
      }
    },
    series: [
      {
        name: '城市访问量',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: getSeriesData(props.cityStat),
        symbolSize: val => val[2] / 80 + 4,  // 小一点的点
        showEffectOn: 'render',
        rippleEffect: { period: 6, scale: 3, brushType: 'stroke' }, // 涟漪也调小
        itemStyle: { color: '#ffeb7b', shadowBlur: 10, shadowColor: '#fff' },
        label: { formatter: '{b}', position: 'right', show: true, color: '#ffeb7b' },
        zlevel: 2
      }
    ]
  }

  mapChart.setOption(option)
}

const handleResize = () => mapChart && mapChart.resize()

onMounted(() => {
  setTimeout(initMapChart, 100)
  window.addEventListener('resize', handleResize)
})

watch(() => props.cityStat, () => {
  if (mapChart) initMapChart()
}, { deep: true })

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  mapChart && mapChart.dispose()
})
</script>

<style scoped>
.counter {
  animation: countUp 2s ease-out forwards;
}
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-spin-clockwise { animation: spinClockwise 20s linear infinite; }
.animate-spin-counter { animation: spinCounter 20s linear infinite; }
@keyframes spinClockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spinCounter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
</style>
