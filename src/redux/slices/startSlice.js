import { createSlice } from '@reduxjs/toolkit'
import { fetchTagSuggestionsByQueryAsync } from '../thunks'

import TagGroupFactory from '../factories/TagGroupFactory'
import TagFactory from '../factories/TagFactory'

const initialState = {
    tags: [],
    tagSuggestions: [],
    tagSuggestionsPending: false,
    tagGroups: [
        TagGroupFactory("Just Twilight", [TagFactory("ts"), TagFactory("solo", true)])
    ],
}

export default createSlice({
    name: 'start',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload
        },
        addTag: (state, action) => {
            // Unique push
            if (state.tags.indexOf(action.payload) === -1) {
                state.tags.push(action.payload)
            }
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter(value => value.name !== action.payload)
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