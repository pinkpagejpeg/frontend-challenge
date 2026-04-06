import { $host } from './http'

// Сервис для работы с API котиков
export class CatsService {
    // Получение списка котиков
    static async getAll(limit: number, page: number) {
        const data = await $host.get(`/images/search?limit=${limit}&page=${page}`)
        return data
    }

    // Получить одного котика по ID
    static async getById(imageId: string) {
        const data = await $host.get(`/images/${imageId}`)
        return data
    }
}