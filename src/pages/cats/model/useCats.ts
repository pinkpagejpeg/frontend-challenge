import { useState, useCallback, useEffect } from "react"
import { CatsService } from "../../../shared/api"
import { useFetching } from "../../../shared/lib"
import type { ICat } from "../../../shared/model"

const limit = 50

export function useCats() {
    const [cats, setCats] = useState<ICat[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    // Запрос котиков
    const fetchCatsRequest = useCallback(async (page: number) => {
        const { data } = await CatsService.getAll(limit, page)
        return data
    }, [])

    // Первая загрузка котиков
    const [fetchCats, loading, error] = useFetching(async () => {
        const data = await fetchCatsRequest(0)
        
        setCats(data)
        setPage(1)
        setHasMore(data.length === limit)
    })

    // Подгрузка котиков
    const [loadMore, loadingMore] = useFetching(async () => {
        if (!hasMore) return

        const data = await fetchCatsRequest(page)
        
        if (data.length === 0) {
            setHasMore(false)
            return
        }
        
        setCats(prev => [...prev, ...data])
        setPage(prev => prev + 1)
        setHasMore(data.length === limit)
    })

    // Загрузка при монтировании
    useEffect(() => {
        fetchCats()
    }, [])

    return {
        cats,
        loading,
        loadingMore,
        error,
        hasMore,
        loadMore,
        fetchCats
    }
}