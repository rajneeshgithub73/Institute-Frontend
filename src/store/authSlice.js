import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    isStudent: false,
    isTeacher: false,
    isAdmin: false,
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.status = true;
            state.isStudent = action.payload.isStudent;
            state.isTeacher = action.payload.isTeacher;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.userData
            state.token = action.payload.token
        },
        authLogout: (state) => {
            state.status = false
            state.isStudent = false
            state.isTeacher = false
            state.isAdmin = false
            state.user = null
            state.token = null
        }
    }
})

export const { authLogin, authLogout } = authSlice.actions

export default authSlice.reducer