import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
// initialize default product
const DEFAULT_PRODUCT = "iPhone"

function NewTicket() {
    const [product, setProduct] = useState(DEFAULT_PRODUCT);
    const [description, setDescription] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)



    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/tickets")
        }
        dispatch(reset())

    }, [isError, message, isSuccess, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        const ticketData = {
            product,
            description
        }

        dispatch(createTicket(ticketData));
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <BackButton url={"/"} />

        <section className="heading">
            <h1>Create a new ticket</h1>
            <p>Please fill the form below</p>
        </section>

        <section className="form">

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={user.name} disabled />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} disabled />
            </div>

            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select name="product" id="product" onClick={(e) => setProduct(e.target.value)} >
                        <option value="iPhone">{DEFAULT_PRODUCT}</option>
                        <option value="iPad">iPad</option>
                        <option value="iMac">iMac</option>
                        <option value="MacBook">MacBook</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="Enter description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-Control">
                    <button className="btn btn-block" type="submit">Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default NewTicket