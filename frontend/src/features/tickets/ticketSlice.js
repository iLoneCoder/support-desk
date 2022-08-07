import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from "./ticketServise"

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const createTicket = createAsyncThunk("ticket/createTicket", async (ticket, thunkAPI) => {
    try {
        return await ticketService.createTicket(ticket);
    } catch (error) {
        const message = error.response.data.message;

        return thunkAPI.rejectWithValue(message)
    }
})

export const getTickets = createAsyncThunk("ticket/getTickets", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const getTicket = createAsyncThunk("ticket/getTicket", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await ticketService.getTicket(ticketId, token)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const closeTicket = createAsyncThunk("ticket/closeTicket", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        reset: (state) => {
            state.tickets = []
            state.ticket = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            //Creating ticket
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            //Getting tickets
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            // Getting ticket
            .addCase(getTicket.pending, state => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.ticket = action.payload
                state.isSuccess = true
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            // Change ticket status
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.tickets.map(ticket => {
                //     if(ticket._id.to)
                // })
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer