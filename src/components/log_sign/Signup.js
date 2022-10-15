import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Log.css'

function Signup() {
    const nav=useNavigate()
    const [sdetails,getSdetails] = useState({
        mail:'',
        pass:'',
        cpass:''
    })

    function sOnchange(e){
        switch (e.target.name) {
            case 'mail':
                getSdetails({...sdetails,mail:e.target.value})
                break;
            case 'pass':
                getSdetails({...sdetails,pass:e.target.value})
                break;
            case 'cpass':
                getSdetails({...sdetails,cpass:e.target.value})
                break;
            default:
                break;
        }
    }

  async  function signsbt(){
        if(sdetails.mail==''&& sdetails.pass==''&& sdetails.cpass==''){
            alert('All fields are Mandatory')
        }
        else{   
            if(sdetails.pass!=sdetails.cpass){
                alert('Password and confirm Password should match')
            }
            else{
                try{
                    const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlpCleMXXgnN35xDSjEfIsKsfLOS6wNVM',{
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
                const data= await resp.json()
                if(!resp.ok){
                    alert(data.error.message)
                }
                else{
                        nav('/login')
                }
                }
                catch(err){
                    console.log(err)
                }
                
            }
                
        }

    }

    return ( 
        <div className='sign_cvr'>
            <div className='sign_cnt'>
                <span className='sign_hdg'>Sign Up</span>
                <div className='signclt signemail'>
                    <span className='sign_fld_txt'>Email</span>
                    <input type='text'name='mail'value={sdetails.mail} className='sign_inp'onChange={sOnchange}></input>
                </div>
                <div className='signclt signpass'>
                    <span className='sign_fld_txt'>Password</span>
                    <input type='text'name='pass'value={sdetails.pass} className='sign_inp'onChange={sOnchange}></input>
                </div>
                <div className='signclt signname_confpass'>
                    <span className='sign_fld_txt'>Confirm Password</span>
                    <input type='text'name='cpass'value={sdetails.cpass} className='sign_inp'onChange={sOnchange}></input>
                </div>
                <button className='sbt_btn'onClick={signsbt}>Sign Up</button>
                <NavLink className='redirect_txt' to='/login'><span className='redirect_txt'>Already have an Account? Login</span></NavLink>
            </div>

        </div>
     );
}

export default Signup;