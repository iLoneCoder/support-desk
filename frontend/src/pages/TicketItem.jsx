import { Link } from "react-router-dom"

function TicketItem({ ticket }) {
    // console.log(ticket.createdAt)
    const date = new Date(ticket.createdAt)
    return <div className="ticket">
        <div>{date.toLocaleString("ro-RO")}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
        <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
}

export default TicketItem