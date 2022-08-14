import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaPlus } from "react-icons/fa"
import Modal from 'react-modal'
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"
import { toast } from "react-toastify"
import BackButton from "../components/BackButton"
import { getNotes, createNote } from "../features/notes/noteSlice"

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

function Ticket() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [text, setText] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticket, isError, isLoading, message, isSuccess } = useSelector(state => state.ticket)
    const noteState = useSelector(state => state.note)

    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

        return () => {
            if (isError) {
                dispatch(reset())
            }

        }
    }, [ticketId, isError, message, dispatch, isSuccess])

    useEffect(() => {
        if (noteState.isError) {
            toast.error(noteState.message)
        }

    })

    const handleClick = () => {

        dispatch(closeTicket(ticket._id))
        navigate("/tickets")
    }

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const noteData = {
            ticketId,
            text
        }
        dispatch(createNote(noteData))
        closeModal()
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setText("")
    }


    if (isLoading) {
        return <Spinner />
    }


    // console.log(noteState)
    return <div className="ticket-page">
        <BackButton url="/tickets" />
        <header >
            <h2>TicketId: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span></h2>
            <h3>Created: {new Date(ticket.createdAt).toLocaleString("ro-RO")}</h3>
            <h3>Product: {ticket.product}</h3>

            <hr />

            <div className="ticket-desc">
                <h2>Description of issue</h2>
                <span>{ticket.description}</span>
            </div>

            {ticket.status !== "closed" ? <button className={`btn btn-block status status-closed`} onClick={handleClick}>Close</button> : ""}

        </header>
        <h1>Notes</h1>
        <button className="btn" onClick={openModal} > <FaPlus /> New Note </button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={"Add note"}
        >
            <h2>Add note</h2>
            <button className="btn-close" onClick={closeModal}>X</button>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <textarea name="text" id="text" value={text} onChange={handleTextChange}></textarea>
                </div>

                <button className="btn" type="submit">Submit</button>
            </form>
        </Modal>
        {noteState.notes.map(noteRecord => (
            <NoteItem key={noteRecord._id} note={noteRecord} />
        ))}
    </div>
}

export default Ticket