import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {},
    token: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logOut: (state) => {
            state.isAuthenticated = false
            state.token = {}
            state.user = ""
        },
    },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer