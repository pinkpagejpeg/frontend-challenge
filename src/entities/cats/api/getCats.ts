import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCats } from "../../../shared/api"
import { ICat } from "../model"

export const getCats = createAsyncThunk<ICat[], number, { rejectValue: string }>(
    "cats/getCats",
    async (page, { rejectWithValue }) => {
        try {
            const data = await fetchCats(page)
            return data
        } catch (error: any) {
            return rejectWithValue(error.message || 'Ошибка')
        }
    }
)