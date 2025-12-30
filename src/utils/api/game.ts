import { createRequest } from '@/utils/request.ts'
import type {
    AnonymousReviewModel,
    GameGroupRecord,
    GamePanelRecord, GameTagRecord,
    SearchItemModel, SearchPageQueryRequest, SearchPageResponse,
    TopPriceRecord
} from '@/types/game.ts'

const gameRequest = createRequest(import.meta.env.VITE_GAME_API_BASE_URL)

export function getGameList() {
    return gameRequest.get("/game/list")
}

export function getGameMainInfo(): Promise<GameGroupRecord> {
    return gameRequest.get(`/game/info/main`)
}

export function getGameMainPanel(): Promise<GamePanelRecord> {
    return gameRequest.get("/game/panel/main")
}

export function getLatestGameNews(): Promise<TopPriceRecord> {
    return gameRequest.get("/game/update/latest")
}

export function getRandomGame(): Promise<string> {
    return gameRequest.get("/recommend/game/random")
}

export function getSearchSimple(lang: string, txt: string): Promise<SearchItemModel[]> {
    return gameRequest.post("/search/game/simple", { txt, lang });
}

export function getLatestReview(): Promise<AnonymousReviewModel[]> {
    return gameRequest.get("/review/latest")
}

export function getTagList(lang: string): Promise<GameTagRecord[]> {
    return gameRequest.get("/game/tag/list", { params: { lang: lang } })
}

export function searchGameAdvanced(query: SearchPageQueryRequest, lang: string): Promise<SearchPageResponse> {
    return gameRequest.post("/search/game/page", {...query,lang})
}