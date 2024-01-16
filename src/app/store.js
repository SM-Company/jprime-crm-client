import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../pages/Auth/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
})