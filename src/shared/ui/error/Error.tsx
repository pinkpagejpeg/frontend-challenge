import { FC } from "react"
import classes from "./Error.module.scss"

interface ErrorProps {
    message?: string
    onRetry?: () => void
}

export const Error: FC<ErrorProps> = ({ 
    message = "При загрузке котиков произошла ошибка",
    onRetry 
}) => {
    return (
        <div className={classes.error}>
            <div className={classes.error__content}>
                <h2 className={classes.error__title}>Ошибка</h2>
                <p className={classes.error__message}>{message}</p>
                {onRetry && (
                    <button className={classes.error__button} onClick={onRetry}>
                        Перезагрузить
                    </button>
                )}
            </div>
        </div>
    )
}