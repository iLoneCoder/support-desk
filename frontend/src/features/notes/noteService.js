import axios from "axios"

const API_URL = '/api/tickets/'

const getNotes = async (token, ticketId) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${ticketId}/notes`, config)

    return response.data
}

const createNote = async (token, noteData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const { ticketId } = noteData
    delete noteData.ticketId

    const response = await axios.post(`${API_URL}/${ticketId}/notes`, noteData, config);

    return response.data
}

const deleteNote = async (token, noteData) => {

    const { ticketId, noteId } = noteData


    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        },

        data: {
            noteId: noteId
        }

    }

    const response = await axios.delete(`${API_URL}/${ticketId}/notes`, config)

    return response.data
}

const noteService = {
    getNotes,
    createNote,
    deleteNote
}

export default noteService