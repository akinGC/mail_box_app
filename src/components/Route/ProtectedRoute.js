import { useSelector } from "react-redux";
import {Navigate, Outlet} from 'react-router-dom'
function ProtectedRoute() {
    const isloggedIn=useSelector(state=>state.auth.isLoggedIn)
    return ( 
        isloggedIn ? <Outlet/> : <Navigate to='/login'/> 
     );
}

export default ProtectedRoute;