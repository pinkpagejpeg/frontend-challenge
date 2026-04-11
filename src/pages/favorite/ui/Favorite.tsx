import { FC, useEffect, useState } from "react"
import { CatsCard } from "../../../features/catsCard"
import { useLocalStorage } from "../../../shared/lib"
import { FAVORITE_KEY } from "../../../shared/config"
import { CatsService } from "../../../shared/api"
import { LoadSpinner, Error, NothingHere, PageLayout } from "../../../shared/ui"
import { ICat } from "../../../shared/model"
import classes from "./Favorite.module.scss"

// Компонент страницы с избранными котиками
export const Favorite: FC = () => {
    const [favorites] = useLocalStorage<number[]>(FAVORITE_KEY, [])
    const [favoriteCats, setFavoriteCats] = useState<ICat[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFavoriteCats = async () => {
        if (favorites.length === 0) {
            setFavoriteCats([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const promises = favorites.map(id => CatsService.getById(String(id)))
            const responses = await Promise.all(promises)
            const films = responses.map(response => response.data)

            setFavoriteCats(films)
        } catch (error) {
            setError('Не удалось загрузить избранных котиков')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFavoriteCats()
    }, [favorites])

    if (error) {
        return (
            <PageLayout>
                <Error message={error} onRetry={fetchFavoriteCats} />
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            {loading ? <LoadSpinner /> :
                <div className={classes.favorite__wrapper}>
                    {favoriteCats.length === 0 ? (
                        <NothingHere
                            title="Любимые котики не обнаружены"
                            message="Добавьте котика в избранное и он появится здесь"
                        />
                    ) : (
                        <div className={classes.favorite__cards}>
                            {favoriteCats.map((item: ICat) => (
                                <CatsCard
                                    key={item.id}
                                    id={item.id}
                                    img={item.url}
                                />
                            ))}
                        </div>
                    )}
                </div>
            }
        </PageLayout>
    )
}

