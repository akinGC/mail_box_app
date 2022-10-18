import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './components/log_sign/Login';
import Signup from './components/log_sign/Signup';
import ProtectedRoute from './components/Route/ProtectedRoute';
import SendMail from './components/UI/SendMail';
import Wel from './components/UI/Wel';
import {fetchcnt} from './components/Redux/Count'
function App() {
  const dispatch = useDispatch()
  const isloggedIn=useSelector(state=>state.auth.isLoggedIn)
  const username = useSelector(state=>state.auth.mailId)
  useEffect(()=>{
    dispatch(fetchcnt(username))
  },[])
 
  return (
   
    <Fragment>
      <Routes>
        <Route path='/' exact element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/wel' element={<Wel/>}/>
          <Route path='/sendMail' element={<SendMail/>}/>
        </Route>
      </Routes>
    </Fragment>
    
  );
}

export default App;
