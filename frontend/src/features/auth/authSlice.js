import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    user: "GIORGI",
    isError: false,
    isSuccess: false,
    isLoading: false
}

export const register = createAsyncThunk("auth/register", async (auth, thunkAPI) => {
    console.log(auth)
}) 

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer