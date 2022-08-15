import { useState } from "react"
import { FaTrashAlt, FaArrowAltCircleUp } from "react-icons/fa"
import { useDispatch } from "react-redux"
import Modal from "react-modal"
import { deleteNote, updateNote } from "../features/notes/noteSlice"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "600px",
        position: "relative"
    },
};

Modal.setAppElement("#root")

function NoteItem({ note }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalText, setModalText] = useState(note.text)
    const dispatch = useDispatch()

    const handleDeleteNote = () => {
        const noteData = {
            ticketId: note.ticketId,
            noteId: note._id
        }
        dispatch(deleteNote(noteData))
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const handleModalTextChange = (e) => {
        setModalText(e.target.value)
    }

    const handleUpdateNote = (e) => {
        e.preventDefault()
        const noteData = {
            noteId: note._id,
            ticketId: note.ticketId,
            text: modalText
        }
        dispatch(updateNote(noteData))
        closeModal()
    }

    return <div className="note">
        <strong>Note from {note.user.name}</strong>
        <strong className="note-date">{new Date(note.createdAt).toLocaleString("ro-RO")}</strong>
        <p>{note.text}</p>
        <FaTrashAlt className="delete-note" onClick={handleDeleteNote} />
        <FaArrowAltCircleUp className="update-note" onClick={openModal} />
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={"Update note"}
        >
            <h2>Update note</h2>
            <button type="button" className="btn-close" onClick={closeModal}>X</button>
            <form onSubmit={handleUpdateNote}>
                <div className="form-group">
                    <textarea name="text" id="text" value={modalText} onChange={handleModalTextChange}></textarea>
                </div>
                <button type="submit" className="btn">Update</button>
            </form>

        </Modal>
    </div>
}

export default NoteItem