import { FC } from "react"
import { NavBar } from "../../../shared/ui"
import classes from "./Favorite.module.scss"

export const Favorite: FC = () => {
    return (
        <div>
            <NavBar />
            <div className={classes.favorite__wrapper}>
                <h1>Favorite</h1>
            </div>
        </div>
    )
}