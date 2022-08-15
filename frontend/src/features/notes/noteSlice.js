import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getNotes = createAsyncThunk("note/getNotes", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await noteService.getNotes(token, ticketId)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const createNote = createAsyncThunk("note/createNote", async (noteData, thunkAPI) => {
    try {
        console.log(1)
        const token = thunkAPI.getState().auth.user.token

        return await noteService.createNote(token, noteData)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteNote = createAsyncThunk("note/deleteNote", async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await noteService.deleteNote(token, noteData);
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }

})

export const updateNote = createAsyncThunk("note/updateNote", async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await noteService.updateNote(token, noteData)
    } catch (error) {
        const message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

const noteSlicer = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state) => {
            state.notes = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            // Getting notes
            .addCase(getNotes.pending, state => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //Creating note
            .addCase(createNote.pending, state => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //Delete note
            .addCase(deleteNote.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = state.notes.filter(note => (note._id.toString() !== action.payload._id.toString()))
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //Update note
            .addCase(updateNote.pending, state => {
                state.isLoading = true
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = state.notes.map(note => {
                    if (note._id.toString() === action.payload._id.toString()) {
                        return action.payload
                    }
                    return note
                })
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlicer.actions
export default noteSlicer.reducer

