import { useSelector } from "react-redux";
import {Navigate,Outlet} from 'react-router-dom'
function ProtectedRoute() {
    const isloggedIn=useSelector(state=>state.auth.isLoggedIn)
    console.log(typeof(localStorage.getItem('isLoggedIn'))+'this target')
    return ( 
        localStorage.getItem('isLoggedIn')=='true' ? <Outlet/> : <Navigate to="/login"/>
     );
}

export default ProtectedRoute;