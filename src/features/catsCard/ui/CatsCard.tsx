import { FC } from "react"
import classes from "./CatsCard.module.scss"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { addFavorite, removeFavorite } from "../../../entities/cats"

interface CatsCardProps {
    id: string
    img: string
}

export const CatsCard: FC<CatsCardProps> = ({ id, img }) => {
    const dispatch = useAppDispatch()
    const favorite = useTypedSelector((state) => state.cats.favorite)

    const favoriteButtonHandler = () => {
        const isFavorite = favorite.some(fav => fav.id === id)

        if (isFavorite) {
            dispatch(removeFavorite(id))
        } else {
            dispatch(addFavorite({ id, img }))
        }
    }

    return (
        <div className={classes.cats__card}>
            <img className={classes.cats__img} src={img} />
            <button className={classes.cats__button} onClick={favoriteButtonHandler}></button>
        </div>
    )
}