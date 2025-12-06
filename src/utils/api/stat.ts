// /utils/api/stat.ts
import request from '@/utils/request.ts'
import type {GroupCount, ViewsCount, RegionStat, CommonStat, SiteModel, PingModel} from '@/types/stat.ts'

// Nav API
const apiUrl = import.meta.env.VITE_NAV_API_BASE_URL
request.defaults.baseURL = apiUrl

// 获取分组统计
export function getGroupCount(lang :string): Promise<GroupCount[]> {
    return request.get('/stat/chart/group/count', { params: { lang } })
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

// 获取导航站点的基本数据
export function getSiteCommonStat(): Promise<CommonStat> {
    return request.get('/stat/nav/site/common')
}

// 获取近日收录的站点
export function getLatestSiteList(lang :string): Promise<SiteModel[]> {
    return request.get('/stat/nav/site/list', { params: { lang } })
}

// 获取最近的最高延迟的 ping 记录
export function getLatestPingList(): Promise<PingModel[]> {
    return request.get('/stat/nav/site/ping/list')
}