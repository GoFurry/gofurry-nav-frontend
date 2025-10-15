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
