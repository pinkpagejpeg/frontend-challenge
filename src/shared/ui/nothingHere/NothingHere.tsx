import { FC } from "react"
import classes from "./NothingHere.module.scss"

interface NothingHereProps {
    title?: string
    message?: string
}

export const NothingHere: FC<NothingHereProps> = ({ 
    title = "Котики не найдены",
    message = "Попробуйте зайти позже"
}) => {
    return (
        <div className={classes.nothingHere}>
            <div className={classes.nothingHere__content}>
                <h2 className={classes.nothingHere__title}>{title}</h2>
                <p className={classes.nothingHere__message}>{message}</p>
            </div>
        </div>
    )
}