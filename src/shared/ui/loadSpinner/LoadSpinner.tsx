import { FC } from 'react'
import classes from "./LoadSpinner.module.scss"

export const LoadSpinner: FC = () => {
  return (
    <div className={classes.load__wrapper}>
      <div className={classes.load__spinner}></div>
      <p className={classes.load__text}>Загрузка...</p>
    </div>
  )
}
