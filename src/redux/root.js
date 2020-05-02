import { combineReducers } from 'redux'
import startSlice from './slices/startSlice'

export default combineReducers({ 
    start: startSlice.reducer 
})