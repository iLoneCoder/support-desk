import { Navigate, Outlet } from "react-router-dom"
import AuthStatus from "../hooks/AuthStatus"
import Spinner from "../components/Spinner"
function ProtectedRoute() {
    const { loggedin, loading } = AuthStatus();
    // console.log(loggedin,loading)
    if (loading) {
        return <Spinner />
    }

    return loggedin ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoute