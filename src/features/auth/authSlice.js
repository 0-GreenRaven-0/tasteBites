import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, user: null},
    reducers: {
        setCredentials: (state, action) => {
            const {accessToken} = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
            state.user = null
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer