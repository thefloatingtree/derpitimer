import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'test',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1
    }
})