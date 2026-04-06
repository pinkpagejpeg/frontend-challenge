import { RouteObject } from 'react-router-dom'
import { Cats } from '../../pages/cats'
import { Favorite } from '../../pages/favorite'
import { CATS_ROUTE, FAVORITE_ROUTE } from '../../shared/config'

// Массив маршрутов приложения
export const publicRoutes: RouteObject[] = [
    // Страница со списком всех котиков
    {
        path: CATS_ROUTE,
        Component: Cats
    },

    // Страница со списком избранных котиков
    {
        path: FAVORITE_ROUTE,
        Component: Favorite
    },
]