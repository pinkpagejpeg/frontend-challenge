import { thunk } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { catsReducer } from "../../entities/cats"

export const store = configureStore({
    reducer: {
        cats: catsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch