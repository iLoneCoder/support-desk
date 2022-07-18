import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const USER = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: USER ? USER : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const register = createAsyncThunk("auth/register", async (auth, thunkAPI) => {
    try {
        return await authService.register(auth)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk("auth/login", async (auth, thunkAPI) => {
    try {
        return await authService.login(auth)
    } catch (error) {
        const message = error.response.data.message;
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    return authService.logout()
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            // state.user = null
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isSuccess = true
                console.log(action.payload)
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer