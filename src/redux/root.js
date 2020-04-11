import { combineReducers } from 'redux'
import testSlice from './slices/testSlice'

export default combineReducers({ 
    test: testSlice.reducer 
})