import { createSlice } from "@reduxjs/toolkit"
import { logout } from "../../utils/logout"

const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess:(state, action)=>{
            state.token = action.payload.token
            state.user = action.payload.user
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))

        },
        logoutRedux:(state)=>{
            state.token = null
            state.user = null
            logout()
        }
    }
})
export const {loginSuccess, logoutRedux} = authSlice.actions;
export default authSlice.reducer;