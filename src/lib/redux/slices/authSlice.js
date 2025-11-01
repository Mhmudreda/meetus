import { toast } from "react-hot-toast"


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, setCookie, removeCookie } from "@/utils/cookies/cookie";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.message || "Login failed");
            }
            
            return {
                user: data.user,
                success: data.success
            };
        } catch (error) {
            return rejectWithValue("An error occurred during login");
        }
    }
);

const localUser = getCookie("user")
const token = getCookie("token")
const isEmployee = getCookie("isEmployee")

const initialState = {
    user: localUser || null,
    token: token || null,
    isEmployee: isEmployee === true || isEmployee === "true",
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isEmployee = false

            removeCookie("user")
            removeCookie("token")
            removeCookie("isEmployee")

            toast.success("Logged out successfully")
        },
        setUser: (state, action) => {
            state.user = action.payload
            setCookie("user", action.payload, { path: "/" })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isEmployee = true
                state.isLoading = false
                state.error = null
                
                setCookie("user", action.payload.user, { path: "/" })
                setCookie("isEmployee", true, { path: "/" })
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.isEmployee = false
                state.isLoading = false
                state.error = action.payload
            })
    },
})
export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
