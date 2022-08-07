import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function AuthStatus() {

    const [loading, setLoading] = useState(true)
    const [loggedin, setLoggedin] = useState(false);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setLoggedin(true);
        } else {
            setLoggedin(false);
        }
        
        setLoading(false);
    }, [user])

    return { loggedin, loading }
}

export default AuthStatus