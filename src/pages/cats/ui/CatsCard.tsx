import { FC, useState } from "react"
import classes from "./Cats.module.scss"

interface CatsCardProps {
    id: string
    img: string
}

export const CatsCard: FC<CatsCardProps> = ({ id, img }) => {
    // const [active, setActive] = useState(false)

    return (
        <div className={classes.cats__card}>
            <img className={classes.cats__img} src={img} />
            <button className={classes.cats__button}></button>
        </div>
    )
}