// 用于把后端传回的字符串字段（如 DNS、HTTP JSON 字符串）解析成对象
export function safeJsonParse<T>(data: any): T | null {
    try {
        if (!data) return null
        return typeof data === 'string' ? JSON.parse(data) : data
    } catch (e) {
        console.error('JSON 解析错误:', e)
        return null
    }
}