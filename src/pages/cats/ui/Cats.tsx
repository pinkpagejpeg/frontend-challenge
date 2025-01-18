import { FC, useEffect, useState } from "react"
import { LoadSpinner, NavBar } from "../../../shared/ui"
import classes from "./Cats.module.scss"
import { getCats, ICat } from "../../../entities/cats"
import { useAppDispatch, useTypedSelector } from "../../../shared/lib"
import { CatsCard } from "../../../features/catsCard"

export const Cats: FC = () => {
    const [cats, setCats] = useState<ICat[]>([])
    const { catsLoading } = useTypedSelector((state: any) => state.cats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchCats()
    }, [])

    const fetchCats = async () => {
        try {
            const action = await dispatch(getCats())

            if (getCats.fulfilled.match(action)) {
                setCats((prevCats) => [...prevCats, ...(action.payload || [])])
            }
        } catch (error) {
            console.error("При загрузке котиков возникла ошибка:", error)
        }
    }

    return (
        <div>
            <NavBar />
            {catsLoading ? <LoadSpinner /> : 
                <div className={classes.cats__wrapper}>
                    <div className={classes.cats__cards}>
                        {cats.length !== 0 &&
                            cats.map((item: ICat) => (
                                <CatsCard
                                    key={item.id}
                                    id={item.id}
                                    img={item.url}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}