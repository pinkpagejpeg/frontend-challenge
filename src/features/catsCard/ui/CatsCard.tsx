import { FC, useCallback } from "react"
import { useLocalStorage } from "../../../shared/lib"
import { FAVORITE_KEY } from "../../../shared/config"
import classes from "./CatsCard.module.scss"

interface CatsCardProps {
    id: string
    img: string
}

export const CatsCard: FC<CatsCardProps> = ({ id, img }) => {
    const [favourites, setFavourites] = useLocalStorage<string[]>(FAVORITE_KEY, [])
    const isFavourite = favourites.includes(id)

    const favoriteButtonHandler = useCallback(() => {
        if (isFavourite) {
            setFavourites(prev => prev.filter(favId => favId !== id))
        } else {
            setFavourites(prev => [...prev, id])
        }
    }, [id, isFavourite, setFavourites])

    return (
        <div className={classes.cats__card}>
            <img className={classes.cats__img} src={img} />
            <button
                className={`${classes.cats__button} ${isFavourite ? classes.active : ''}`}
                onClick={favoriteButtonHandler} />
        </div>
    )
}