import './Log.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {Authauctions} from '../Redux/Auth'
function Login() {
    const dispatch = useDispatch()        
    const nav=useNavigate()
    const [sdetails,getSdetails] = useState({
        mail:'',
        pass:'',
   
    })

    function sOnchange(e){
        switch (e.target.name) {
            case 'mail':
                getSdetails({...sdetails,mail:e.target.value})
                break;
            case 'pass':
                getSdetails({...sdetails,pass:e.target.value})
                break;
       
            default:
                break;
        }
    }

    async  function signsbt(){
        
        try{
            const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
            method:'POST',
            body:JSON.stringify({
                email:sdetails.mail,
                password:sdetails.pass,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
            
        })
        const data =await resp.json()
        if(!resp.ok){
            alert(data.error.message)
        }
        else{
            let ak = sdetails.mail.split('').filter((it)=>{return it!='@'})
            ak = ak.filter((it)=>{return it!='.'})
           let name = ak.join('')
           
            dispatch(Authauctions.setoken(data.idToken))
            dispatch(Authauctions.mailId(name))
            localStorage.setItem('getMali',name)
            dispatch(Authauctions.loggedState(true))
            localStorage.setItem('isLoggedIn',true)
            localStorage.setItem('idToken',data.idToken)
            nav('/wel')
        }
        }
        catch(err){
            console.log(err)
        }
    }

    return ( 
        <div className='sign_cvr'>
        <div className='sign_cnt'>
            <span className='sign_hdg'>Login</span>
            <div className='signclt signemail'>
                <span className='sign_fld_txt'>Email</span>
                <input type='text'name='mail'value={sdetails.mail} className='sign_inp'onChange={sOnchange}></input>
            </div>
            <div className='signclt signpass'>
                <span className='sign_fld_txt'>Password</span>
                <input type='text'name='pass'value={sdetails.pass} className='sign_inp'onChange={sOnchange}></input>
            </div>
           
            <button className='sbt_btn'onClick={signsbt}>Login</button>
            <NavLink className='redirect_txt' to='/'><span className='redirect_txt'>Don't have an Account? Sign Up</span></NavLink>
        </div>

    </div>
     );
}

export default Login;