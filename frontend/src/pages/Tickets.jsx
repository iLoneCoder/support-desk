import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import TicketItem from "./TicketItem";
import BackButton from "../components/BackButton";


function Tickets() {
    const dispatch = useDispatch();
    const { tickets, isSuccess, isError, isLoading, message } = useSelector(state => state.ticket)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }


        dispatch(getTickets())

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isError, message, isSuccess])


    if (isLoading) {
        return <Spinner />
    }
    // console.log(tickets)
    return <>
        <BackButton url="/" />
        <section className="heading">
            <h1>Tickets</h1>
        </section>

        <section>
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </section>
    </>
}

export default Tickets