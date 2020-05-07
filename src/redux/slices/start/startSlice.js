import { createSlice } from '@reduxjs/toolkit'
import { fetchTagSuggestionsByQueryAsync, fetchImagesByTagsAsync } from './startThunks'

import TagGroupFactory from '../../factories/TagGroupFactory'

const initialState = {
    tags: [],
    tagSuggestions: [],
    tagSuggestionsPending: false,
    imagePreviews: [],
    imagePreviewsPending: false,
    tagGroups: [],
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
            state.tagGroups.push(TagGroupFactory(action.payload.name, action.payload.tags, state.tagGroups.length, "Custom"))
        },
        removeTagGroup: (state, action) => {
            state.tagGroups = state.tagGroups.filter(value => value.id !== action.payload.id)
        }
    },
    extraReducers: {
        // Tag Suggestions
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
        },
        // Image Previews
        [fetchImagesByTagsAsync.pending]: (state, action) => {
            state.imagePreviewsPending = true
        },
        [fetchImagesByTagsAsync.fulfilled]: (state, action) => {
            state.imagePreviewsPending = false
            state.imagePreviews = action.payload
        },
        [fetchImagesByTagsAsync.rejected]: (state, action) => {
            state.imagePreviewsPending = false
            state.imagePreviews = []
        }
    }
})