import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import BackButton from "../components/BackButton"
function Ticket() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticket, isError, isLoading, message, isSuccess } = useSelector(state => state.ticket)

    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))

        return () => {
            if (isError) {
                dispatch(reset())
            }

        }
    }, [ticketId, isError, message, dispatch, isSuccess])


    const handleClick = () => {

        dispatch(closeTicket(ticket._id))
        navigate("/tickets")
    }

    if (isLoading) {
        return <Spinner />
    }



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
    </div>
}

export default Ticket