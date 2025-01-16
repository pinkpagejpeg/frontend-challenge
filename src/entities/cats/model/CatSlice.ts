import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICatsState } from "./types"
import { getCats } from "../api"

const initialState: ICatsState = {
    cats: [],
    catsLoading: false,
    catsError: null,
}

const handlePending = (state: ICatsState) => {
    state.catsLoading = true
    state.catsError = null
}

const handleRejected = (state: ICatsState, action: PayloadAction<string | undefined>) => {
    state.catsLoading = false
    state.catsError = action.payload || "Неизвестная ошибка"
}

const CatsSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCats.pending, handlePending)
            .addCase(getCats.fulfilled, (state: ICatsState) => {
                state.catsLoading = false
            })
            .addCase(getCats.rejected, handleRejected)
    }
})

export default CatsSlice.reducer