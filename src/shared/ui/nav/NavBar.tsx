import { FC } from "react"
import classes from "./NavBar.module.scss"
import { NavLink } from "react-router-dom"
import { CATS_ROUTE, FAVORITE_ROUTE } from "../../config"

export const NavBar: FC = () => {
    return (
        <div className={classes.menu__wrapper}>
            <ul className={classes.menu__ul}>
                <li className={classes.menu__li}><NavLink to={CATS_ROUTE}>Все котики</NavLink></li>
                <li className={classes.menu__li}><NavLink to={FAVORITE_ROUTE}>Любимые котики</NavLink></li>
            </ul>
        </div>
    )
}