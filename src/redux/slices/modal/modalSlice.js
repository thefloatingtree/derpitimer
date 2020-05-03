import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    startCreateTagGroup: false
}

export default createSlice({
    name: 'modal',
    initialState,
    reducers: {
        activateStartCreateTagGroup: (state, action) => {
            state.startCreateTagGroup = action.payload
        },
    }
})