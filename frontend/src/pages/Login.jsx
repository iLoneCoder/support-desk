import { useState } from "react"
import { FaSignInAlt, FaEye } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify";
import { logIn } from "../features/auth/authSlice";
function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { email, password } = formData;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            const userData = { email, password };
            dispatch(logIn(userData));
        } else {
            toast.error("Enter email and password");
        }
    }
    return <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Log in
            </h1>
            <p>Please log in to get support</p>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" id="email" name="email" placeholder="Enter email" value={email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter password" value={password} onChange={handleChange} />
                    <FaEye className="show-password" onClick={handleClick} />
                </div>

                <button className="btn btn-block" type="submit">Log in</button>
            </form>
        </section>
    </>
}

export default Login;