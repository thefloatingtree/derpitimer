import { createAsyncThunk } from '@reduxjs/toolkit'
import dinky from 'dinky.js'

export const fetchTagSuggestionsByQueryAsync = createAsyncThunk(
    'start/fetchTagSuggestionsByQueryAsync',
    async (query) => {
        const response = await dinky().tags().search(query)
        return response.tags;
    }
)