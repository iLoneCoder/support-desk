import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(logout());
        navigate("/")
    }

    return <header className="header">
        <div className="logo">
            <Link to="/">service-desk</Link>
        </div>

        {user ? <>
            <ul>
                <li>
                    <button className="btn" onClick={handleLogOut}><FaSignOutAlt /> logout</button>
                </li>
            </ul>
        </> : <>
            <ul>
                <li>
                    <Link to="/login">
                        <FaSignInAlt />
                        Log in
                    </Link>
                </li>

                <li>
                    <Link to="/register">
                        <FaUserAlt />
                        Register
                    </Link>
                </li>
            </ul>
        </>}

    </header>
}

export default Header;