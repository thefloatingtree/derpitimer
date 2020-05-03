import { combineReducers } from 'redux'
import startSlice from './slices/start/startSlice'
import modalSlice from './slices/modal/modalSlice'

export default combineReducers({ 
    start: startSlice.reducer,
    modal: modalSlice.reducer
})