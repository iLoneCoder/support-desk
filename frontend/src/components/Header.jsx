import { FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
    return <header className="header">
        <div className="logo">
            <Link to="/">service-desk</Link>
        </div>


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
    </header>
}

export default Header;