import { createSlice } from '@reduxjs/toolkit'
import { fetchTagSuggestionsByQueryAsync } from '../thunks'

const initialState = {
    tags: [],
    tagSuggestions: [],
    tagSuggestionsPending: false,
}

export default createSlice({
    name: 'start',
    initialState,
    reducers: {
        addTag: (state, action) => {
            // Unique push
            if (state.tags.indexOf(action.payload) === -1) {
                state.tags.push(action.payload)
            }
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter(value => value !== action.payload)
        }
    },
    extraReducers: {
        [fetchTagSuggestionsByQueryAsync.pending]: (state, action) => {
            state.tagSuggestionsPending = true
        },
        [fetchTagSuggestionsByQueryAsync.fulfilled]: (state, action) => {
            state.tagSuggestionsPending = false
            state.tagSuggestions = action.payload
        },
        [fetchTagSuggestionsByQueryAsync.rejected]: (state, action) => {
            state.tagSuggestionsPending = false
            state.tagSuggestions = []
        }
    }
})