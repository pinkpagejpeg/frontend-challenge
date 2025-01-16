import { RouteObject } from 'react-router-dom'
import { Cats } from '../../pages/cats'
import { Favorite } from '../../pages/favorite'
import { CATS_ROUTE, FAVORITE_ROUTE } from '../../shared/config'

export const publicRoutes: RouteObject[] = [
    {
        path: CATS_ROUTE,
        Component: Cats
    },
    {
        path: FAVORITE_ROUTE,
        Component: Favorite
    },
]