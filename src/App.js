import { Fragment } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './components/log_sign/Login';
import Signup from './components/log_sign/Signup';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Wel from './components/UI/Wel';

function App() {
  return (
   
    <Fragment>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/wel' element={<Wel/>}/>
        </Route>
      </Routes>
    </Fragment>
    
  );
}

export default App;
