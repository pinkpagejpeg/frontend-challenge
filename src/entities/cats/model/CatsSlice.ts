import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICatsState, IFavorite } from "./types"
import { getCats } from "../api"

const initialState: ICatsState = {
    favorite: JSON.parse(localStorage.getItem('favoriteCats') || '[]'),
    catsLoading: false,
    catsError: null,
}

const handlePending = (state: ICatsState) => {
    state.catsLoading = true
    state.catsError = null
}

const handleRejected = (state: ICatsState,
    action: PayloadAction<string | undefined>) => {
    state.catsLoading = false
    state.catsError = action.payload || "Неизвестная ошибка"
}

const CatsSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {
        setLoading(state) {
            state.catsLoading = true
            state.catsError = null
        },
        setError(state, action: PayloadAction<string>) {
            state.catsLoading = false
            state.catsError = action.payload
        },
        addFavorite: (state, action: PayloadAction<IFavorite>) => {
            const { id, img } = action.payload
            const favoriteFromStorage = JSON.parse(localStorage.getItem('favoriteCats') || '[]')

            if (!favoriteFromStorage.some((fav: IFavorite) => fav.id === id)) {
                const updatedFavorites = [...favoriteFromStorage, { id, img }]
                localStorage.setItem('favoriteCats', JSON.stringify(updatedFavorites))

                state.favorite = updatedFavorites
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            const favoriteFromStorage = JSON.parse(localStorage.getItem('favoriteCats') || '[]')
            const updatedFavorites = favoriteFromStorage.filter((fav: IFavorite) => fav.id !== action.payload)

            localStorage.setItem('favoriteCats', JSON.stringify(updatedFavorites))
            state.favorite = updatedFavorites
        },
        setFavoriteFromStorage: (state) => {
            state.favorite = JSON.parse(localStorage.getItem('favoriteCats') || '[]')
            state.catsLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            // getCats
            .addCase(getCats.pending, handlePending)
            .addCase(getCats.fulfilled, (state: ICatsState) => {
                state.catsLoading = false
            })
            .addCase(getCats.rejected, handleRejected)
    }
})

export const { addFavorite, removeFavorite, setFavoriteFromStorage, setLoading, setError } = CatsSlice.actions

export default CatsSlice.reducer