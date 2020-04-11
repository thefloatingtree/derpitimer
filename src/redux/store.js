import { configureStore } from '@reduxjs/toolkit'
import reducer from './root'

export default configureStore({ reducer })