// /utils/api/game.ts
import request from '@/utils/request.ts'

// Game API
const apiUrl = import.meta.env.VITE_GAME_API_BASE_URL
request.defaults.baseURL = apiUrl

export function getGameList() {
    return request.get("/game/list")
}