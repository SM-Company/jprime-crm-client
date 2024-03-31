import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../pages/Auth/auth.slice'
import navbarReducer from '../layouts/components/Navbar/navbar.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer
  },
})