import { createSlice } from '@reduxjs/toolkit'
import { fetchTagSuggestionsByQueryAsync } from '../thunks'

import TagGroupFactory from '../factories/TagGroupFactory'
import TagFactory from '../factories/TagFactory'

const initialState = {
    tags: [],
    tagSuggestions: [],
    tagSuggestionsPending: false,
    tagGroups: [
        TagGroupFactory("Just Twilight 1", [TagFactory("ts"), TagFactory("solo", true)], 0),
        TagGroupFactory("Just Twilight 2", [TagFactory("ts"), TagFactory("solo", true)], 1),
        TagGroupFactory("Just Twilight 3", [TagFactory("ts"), TagFactory("solo", true)], 2),
        TagGroupFactory("Just Twilight 3 asdfa asdfjlk askdfjlakjsdflkj asdkjfaksjdf", [TagFactory("ts"), TagFactory("solo", true)], 3),
    ],
    isTagGroupCreateModalOpen: false,
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
            if (!state.tags.some(tag => tag.name === action.payload.name)) {
                state.tags.push(action.payload)
            }
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter(value => value.name !== action.payload)
        },
        setTagGroups: (state, action) => {
            state.tagGroups = action.payload
        },
        addTagGroup: (state, action) => {
            state.tagGroups.push(TagGroupFactory(action.payload.name, action.payload.tags, state.tagGroups.length))
        },
        removeTagGroup: (state, action) => {
            state.tagGroups = state.tagGroups.filter(value => value.id !== action.payload.id)
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