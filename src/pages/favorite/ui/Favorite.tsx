import { FC, useEffect } from "react"
import { LoadSpinner, NavBar } from "../../../shared/ui"
import classes from "./Favorite.module.scss"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { setFavoriteFromStorage } from "../../../entities/cats"
import { CatsCard } from "../../../features/catsCard"

export const Favorite: FC = () => {
    const { catsLoading, favorite } = useTypedSelector((state: any) => state.cats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchFavorite()
    }, [])

    const fetchFavorite = () => {
        try {
            dispatch(setFavoriteFromStorage())
        } catch (error) {
            console.error("При загрузке котиков возникла ошибка:", error)
        }
    }

    return (
        <div>
            <NavBar />
            {catsLoading ? <LoadSpinner /> :
                <div className={classes.favorite__wrapper}>
                    {favorite.length > 0 ? (
                        <div className={classes.favorite__cards}>
                            {favorite.map((item: { id: string, img: string }) => (
                                <CatsCard
                                    key={item.id}
                                    id={item.id}
                                    img={item.img}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className={classes.favorite__text}>Любимые котики не обнаружены</p>
                    )}
                </div>
            }
        </div>
    )
}