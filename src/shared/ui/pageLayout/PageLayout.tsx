import { FC, ReactNode } from "react"
import { NavBar } from "../nav/NavBar"
import classes from "./PageLayout.module.scss"

interface PageLayoutProps {
    children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className={classes.pageLayout}>
            <NavBar />
            <main className={classes.pageLayout__content}>
                {children}
            </main>
        </div>
    )
}