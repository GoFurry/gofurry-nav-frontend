// /utils/api/stat.ts
import request from '@/utils/request.ts'
import type { GroupCount, ViewsCount, RegionStat } from '@/types/stat.ts'

// 获取分组统计
export function getGroupCount(): Promise<GroupCount[]> {
    return request.get('/stat/chart/group/count')
}

// 获取访问统计
export function getViewsCount(): Promise<ViewsCount> {
    return request.get('/stat/chart/views/count')
}

// 获取城市访问统计
export function getCityStat(): Promise<RegionStat> {
    return request.get('/stat/chart/views/region/city')
}

// 获取国家访问统计
export function getCountryStat(): Promise<RegionStat> {
    return request.get('/stat/chart/views/region/country')
}

// 获取省份访问统计
export function getProvinceStat(): Promise<RegionStat> {
    return request.get('/stat/chart/views/region/province')
}
