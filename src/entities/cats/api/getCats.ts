import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCats } from "../../../shared/api"
import { ICat } from "../model"

export const getCats = createAsyncThunk<ICat[], void, { rejectValue: string }>(
    "cats/getCats",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCats()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка')
        }
    }
)