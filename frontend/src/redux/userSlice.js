import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first_name: null,
    last_name: null,
    email: null,
    role: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { first_name, last_name, email, role } = action.payload
            state.first_name = first_name
            state.last_name = last_name
            state.email = email
            state.role = role
        },
        logout: (state) => {
            state.first_name = null
            state.last_name = null
            state.email = null
            state.role = null
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer