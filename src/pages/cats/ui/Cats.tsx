import { FC, useCallback, useEffect, useRef } from "react"
import { CatsCard } from "../../../features/catsCard"
import { useCats } from "../model/useCats"
import { ICat } from "../../../shared/model"
import { LoadSpinner, NothingHere, PageLayout, Error } from "../../../shared/ui"
import classes from "./Cats.module.scss"

// Компонент главной страницы со списком котиков
export const Cats: FC = () => {
    const { cats, loading, loadingMore, error, hasMore, loadMore, fetchCats } = useCats()

    const loaderRef = useRef<HTMLDivElement>(null)

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
            loadMore()
        }
    }, [hasMore, loadingMore, loadMore])

    useEffect(() => {
        if (!loaderRef.current || loading) return

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: '200px'
        })

        observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [loading, handleObserver])

    if (error) {
        return (
            <PageLayout>
                <Error message={error} onRetry={fetchCats} />
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            {loading && cats.length === 0 ? (
                <LoadSpinner />
            ) : cats.length === 0 ? (
                <NothingHere
                    title="Котики не найдены"
                    message="Попробуйте зайти позже"
                />
            ) : (
                <div className={classes.cats__wrapper}>
                    <div className={classes.cats__cards}>
                        {cats.map((item: ICat) => (
                            <CatsCard
                                key={item.id}
                                id={item.id}
                                img={item.url}
                            />
                        ))}
                    </div>
                    {hasMore && (
                        <div className={classes.cats__loaderMore} ref={loaderRef}>
                            {loadingMore && (
                                <p className={classes.cats__text}>... Загружаем еще котиков ...</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </PageLayout>
    )
}