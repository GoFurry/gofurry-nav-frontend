// /utils/api/nav.ts
import request from '@/utils/request.ts'
import type {Site, Group, SiteInfo, HttpRecord, DnsRecord, PingRecord} from '@/types/nav.ts'

// Nav API
const apiUrl = import.meta.env.VITE_API_BASE_URL
request.defaults.baseURL = apiUrl

// 获取站点列表
export function getSites(lang: string): Promise<Site[]> {
    return request.get(`/nav/page/site/list`, { params: { lang } })
}

// 获取分组
export function getGroups(lang: string): Promise<Group[]> {
    return request.get(`/nav/page/group/list`, { params: { lang } })
}

// 获取延迟信息
export function getPing(): Promise<Record<string, string>> {
    return request.get(`/nav/page/ping/list`)
}

// 增加浏览量
export function addCount() {
    request.get(`/stat/add/count`)
}

// 百度搜索建议框
export function getBaiduSuggestion(keyword: string): Promise<string[]> {
    return request.get('/nav/page/search/baidu', { params: { q: keyword } })
}

// 必应搜索建议框
export function getBingSuggestion(keyword: string): Promise<string[]> {
    return request.get('/nav/page/search/bing', { params: { q: keyword } })
}

// 谷歌搜索建议框
export function getGoogleSuggestion(keyword: string): Promise<string[]> {
    return request.get('/nav/page/search/google', { params: { q: keyword } })
}

// b站搜索建议框
export function getBiliBiliSuggestion(keyword: string): Promise<string[]> {
    return request.get('/nav/page/search/bilibili', { params: { q: keyword } })
}

// 随机金句
export function getSaying() {
    return request.get('/nav/page/header/getSaying')
}

// 获取详情页基础信息
export function getSiteDetail(id: string, lang: string): Promise<SiteInfo> {
    return request.get('/nav/site/getSiteDetail', { params: { id:id, lang:lang } })
}

// 获取延迟记录
export function getSitePingRecord(domain: string): Promise<PingRecord> {
    return request.get('/nav/site/getSitePingRecord', { params: { domain: domain } })
}

// 获取 HTTP 解析
export function getSiteHttpRecord(domain: string): Promise<HttpRecord> {
    return request.get('/nav/site/getSiteHttpRecord', { params: { domain: domain } })
}

// 获取 DNS 解析
export function getSiteDnsRecord(domain: string): Promise<DnsRecord> {
    return request.get('/nav/site/getSiteDnsRecord', { params: { domain: domain } })
}
