import { createSlice } from "@reduxjs/toolkit";

const initialState = { urlParams: '' };

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setUrlParams: (state, action) => {
            state.urlParams = action.payload
        },
        DeleteUrlParams: (state) => {
            state.urlParams = ''
        },
    }
})

export const { setUrlParams, DeleteUrlParams } = navbarSlice.actions;
export default navbarSlice.reducer;