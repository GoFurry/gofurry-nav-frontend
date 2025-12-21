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