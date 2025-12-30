// /types/game.ts

export interface GameGroupRecord {
    latest: BaseGameInfoRecord[]
    recent: BaseGameInfoRecord[]
    hot: BaseGameInfoRecord[]
    free: BaseGameInfoRecord[]
}

export interface BaseGameInfoRecord {
    game_id: string
    avg_score: number
    comment_count: number
    name: string
    name_en: string
    info: string
    info_en: string
    header: string
}

export interface GamePanelRecord {
    count_vo: TopPlayerCountRecord[]
    price_vo: TopPriceRecord[]
}

export interface TopPlayerCountRecord {
    id: string
    name: string
    count_peak: number
    count_recent: number
    collect_time: number
    header: string
}

export interface TopPriceRecord {
    id: string
    name: string
    global_price: number
    china_price: number
    discount: number
    header: string
}

export interface TopPriceRecord {
    "news_zh": NewsBaseModel[]
    "news_en": NewsBaseModel[]
}

export interface NewsBaseModel {
    id: string
    name: string
    post_time: string
    headline: string
    header: string
    author: string
    content: string
    url: string
}

export interface SearchItemModel {
    id: string
    name: string
    info: string
    cover: string
}

export interface AnonymousReviewModel {
    region: string
    score: number
    content: string
    ip: string
    time: string
    game_name: string
    game_cover: string
}

export interface GameTagRecord {
    id: string
    name: string
    prefix: string
    game_count: number
}

// 查询请求结构
export interface SearchPageQueryRequest {
    pageNum: number
    pageSize: number
    content?: string
    pub_start_time?: string // 格式: "2025-12-29 22:56:00"
    pub_end_time?: string
    update_start_time?: string
    update_end_time?: string
    score?: boolean
    remark_order?: boolean
    time_order?: boolean
    tag_list?: number[]
}

// 分页响应类型
export interface SearchPageResponseItem {
    id: string
    name: string
    info: string
    cover: string
    update_time: string
    release_date: string
    remark_count: number
    avg_score: number
    appid: number
}

export interface SearchPageResponse {
    total: number
    list: SearchPageResponseItem[]
}