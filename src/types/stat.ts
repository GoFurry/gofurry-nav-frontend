// types/stat.ts

// 分组统计
export interface GroupCount {
    group_id: string
    count: number
}

// 访问统计
export interface ViewsCount {
    total: number
    year_count: number
    month_count: number
    date: string[]
    count: number[]
}

// 地区统计
export interface RegionStat {
    region_map: Record<string, number>
}

export interface CommonStat {
    site_count: number
    domain_count: number,
    dns_count: number,
    http_count: number,
    ping_count: number,
    site_reach_rate: number,
    non_profit_business_ratio: number,
    sfw_nsfw_ratio: number
}

export interface SiteModel {
    name: string,
    country: string,
    create_time: string
}

export interface PingModel {
    name: string,
    status: string,
    createTime: string,
    loss: string,
    delay: string
}