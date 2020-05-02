import { createSlice } from '@reduxjs/toolkit'
import { setTags } from '../actions'
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
        [setTags]: (state, action) => {
            state.tags = action.payload
        },
        [addTag]: (state, action) => {
            state.tags.push(action.payload)
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