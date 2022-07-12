import { useState } from "react"
import { FaUser, FaEye } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../features/auth/authSlice"
import {toast} from "react-toastify"

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password1: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { name, email, password, password1 } = formData;

    // const { user, isError, isSuccess, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        );
    }

    const handleClick = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === password1 && password !== "") {
            const userData = {name, email, password}
            dispatch(register(userData))
        } else {
            toast.error("Something wrong!")
        }

    }

    return <>
        <section className="heading">
            <h1>
                <FaUser />  Register
            </h1>
            <p>Please create an account</p>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Enter name" value={name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter password" value={password} onChange={handleChange} />
                    <FaEye className="show-password" onClick={handleClick} />
                </div>

                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} id="password1" name="password1" placeholder="Confirm password" value={password1} onChange={handleChange} />
                    <FaEye className="show-password" onClick={handleClick} />
                </div>

                <button className="btn btn-block" type="submit">Register</button>
            </form>


        </section>
    </>
}

export default Register