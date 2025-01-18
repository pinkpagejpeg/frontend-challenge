import { FC, useEffect, useState } from "react"
import { LoadSpinner, NavBar } from "../../../shared/ui"
import classes from "./Cats.module.scss"
import { getCats, ICat } from "../../../entities/cats"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { CatsCard } from "../../../features/catsCard"
import InfiniteScroll from "react-infinite-scroll-component"

export const Cats: FC = () => {
    const [cats, setCats] = useState<ICat[]>([])
    const { catsLoading } = useTypedSelector((state: any) => state.cats)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchCats()
    }, [])

    const fetchCats = async () => {
        try {
            const action = await dispatch(getCats(page))

            if (getCats.fulfilled.match(action)) {
                setCats((prevCats) => [...prevCats, ...action.payload])
                setPage((prevPage) => prevPage + 1)

                if (action.payload.length === 0) {
                    setHasMore(false)
                }
            }
        } catch (error) {
            console.error("При загрузке котиков возникла ошибка:", error)
        }
    }

    return (
        <div>
            <NavBar />
            {catsLoading && cats.length === 0 ? (
                <LoadSpinner />
            ) : (
                <div className={classes.cats__wrapper}>
                    <InfiniteScroll
                        dataLength={cats.length}
                        next={fetchCats}
                        hasMore={hasMore}
                        loader={<p className={classes.cats__text}>... Загружаем еще котиков ...</p>}
                        endMessage={<p className={classes.cats__text}>Котики закончились</p>}
                    >
                        <div className={classes.cats__cards}>
                            {cats.length !== 0 &&
                                cats.map((item: ICat, index) => (
                                    <CatsCard
                                        key={`${item.id}-${index}`}
                                        id={item.id}
                                        img={item.url}
                                    />
                                ))}
                        </div>
                    </InfiniteScroll>
                </div>
            )}
        </div>
    )
}