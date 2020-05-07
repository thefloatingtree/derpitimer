import { createAsyncThunk } from '@reduxjs/toolkit'
import dinky from 'dinky.js'

import TagListConverter from '../../converters/TagListConverter'

export const fetchTagSuggestionsByQueryAsync = createAsyncThunk(
    'start/fetchTagSuggestionsByQueryAsync',
    async (query) => {
    const response = await dinky().tags().search(query)
        return response.tags;
    }
)

export const fetchImagesByTagsAsync = createAsyncThunk(
    'start/fetchImagesByTagsAsync',
    async (tags) => {
        const response = await dinky().search(TagListConverter(tags)).images().limit(25).sortBy("score")
        return response.images;
    }
)