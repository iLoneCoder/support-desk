import { FaTrashAlt } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { deleteNote } from "../features/notes/noteSlice"

function NoteItem({ note }) {
    const dispatch = useDispatch()

    const handleDeleteNote = () => {
        const noteData = {
            ticketId: note.ticketId,
            noteId: note._id
        }
        dispatch(deleteNote(noteData))
    }

    return <div className="note">
        <strong>Note from {note.user.name}</strong>
        <strong className="note-date">{new Date(note.createdAt).toLocaleString("ro-RO")}</strong>
        <p>{note.text}</p>
        <FaTrashAlt className="delete-note" onClick={handleDeleteNote} />
    </div>
}

export default NoteItem