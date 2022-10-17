import { useEffect, useState } from 'react';
import { Authauctions } from '../Redux/Auth'; 
import { useSelector ,useDispatch} from 'react-redux';
import { NavLink ,useNavigate} from 'react-router-dom';
import Msgview from './Msgview';
import './Wel.css'
function Wel() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [showmsg, setShowmsg] = useState(false)
    const [selitm, setitm] = useState([])
    const username = useSelector(state => state.auth.mailId)
    const [showinb,setinb] = useState(true)
    const [farry, sarry] = useState([])
    const [delar, sedelar] = useState([])
   
    async function fetchitms() {
        
        const resp =showinb? await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${username}.json`) :
        await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailappfrom/${username}.json`)
        const data = await resp.json()
        console.log(data)
        if(data!=null){

        
        let ar1 = Object.keys(data)
        let ar2 = Object.values(data)  
        let interarr = []
        
        for (let i = 0; i < ar1.length; i++) {
           
            let newobj = {
                id: ar1[i],
                name: ar2[i].name,
                from: ar2[i].from,
                subject: ar2[i].subject,
                content: ar2[i].content,
                seen: ar2[i].seen
            }

            interarr.push(newobj)
            
        }
        interarr.reverse()

        sarry(interarr)
    }
    }
    useEffect(() => {
        fetchitms()

    }, [showinb])

    function btnclk(e) {
        
        sedelar([...delar, e.target.name])
    }
    async function deletemail() {
        for (let i = 0; i < delar.length; i++) {
            const resp =showinb? await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${username}/${delar[i]}.json`, {
                method: 'DELETE'
            }):
            await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailappfrom/${username}/${delar[i]}.json`, {
                method: 'DELETE'
            })
            if (resp.ok) {
                document.getElementById(delar[i]).remove()
            }

        }

    }
    async function msgSelcted(e) {
        let idz = e.target.parentElement.id
    
        let arrx = []
        for (let i = 0; i < farry.length; i++) {

            if (farry[i].id == idz) {
                let iobj = {
                    from: farry[i].from,
                    content: farry[i].content,
                    subject: farry[i].subject,
                    id: farry[i].id,
                    name: farry[i].name,
                    seen: true
                }
                setitm(iobj)
                arrx.push(iobj)
            }
            else arrx.push(farry[i])
        }
        sarry(arrx)

        const crcl = document.querySelector(`#${idz} :nth-child(2)`)
        console.log(crcl)
        crcl.style.backgroundColor = 'white'
        await chngsen(idz)
        setShowmsg(true)
  
    }
    async function chngsen(vi) {
        const resp =showinb? await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${username}/${vi}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                seen: true
            })
        }):
        await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailappfrom/${username}/${vi}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                seen: true
            })
        })
    }
 function oninseclk(e){
   
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('wel_lft_itm')[i].style.color='black'
        document.getElementsByClassName('wel_lft_itm')[i].style.fontWeight='400'
        document.getElementsByClassName('wel_lft_itm')[i].style.backgroundColor='aliceblue'
    }
    e.target.style.color='white'
    e.target.style.fontWeight='700'
    e.target.style.backgroundColor='green'
    sarry([])
    if(e.target.id=='itmfrst'){
        setinb(true)
    }
    else{
        setinb(false)
    }
  }
  function logoutfun(){
    // isLoggedIn:localStorage.getItem('isLoggedIn')
    localStorage.setItem('isLoggedIn',false)
    dispatch(Authauctions.loggedState(false))
    // id_token:localStorage.getItem('idToken')
    localStorage.setItem('idToken',null)
    dispatch(Authauctions.setoken(null))
    localStorage.setItem('getMali',null)
    dispatch(Authauctions.mailId(null))
    nav('/',{replace:true})
  }
    return (
        <div className="wel_whole">
            <div className="wel_nav">
                <div className="wel_nav_title">
                    Yahoo<span className="wel_nav_txt">!</span>mail
                </div>
                <span className="logout" onClick={logoutfun}>Logout</span>
            </div>
            <div className='wel_cnt_del'><span onClick={deletemail}>Delete</span></div>
            <div className='wel_cnt_wle'>

                <div className="wel_left">
                    <NavLink to='/sendMail'><span className="wel_compose">Compose</span></NavLink>
                    <div className="wel_left_cnt">
                        <span className="wel_lft_itm" id='itmfrst'onClick={oninseclk}>Inbox &nbsp;&nbsp;</span>
                        <span className="wel_lft_itm" id='itmscnd'>Deleted Itms</span>
                        <span className="wel_lft_itm" id='itmtrd' onClick={oninseclk}>Sent</span>
                    </div>
                </div>
                <div className="wel_rght inbox_itms">

                    {!showmsg && <div className='wel_itms_view'>
                        {farry.length != 0 ?
                            farry.map((itms) => (

                                <div className="wel_rt_itm" id={itms.id} >
                                    <input type='checkbox' name={itms.id} onClick={btnclk}></input>
                                    {itms.seen ? <span className='wel_crcle' style={{ backgroundColor: 'aliceblue' }} ></span> : <span className='wel_crcle' style={{ backgroundColor: 'grey' }} ></span>}

                                    <span className="wel_itm_title" onClick={msgSelcted}>{itms.from}</span>
                                    <span className="wel_itm_subject wel_itm_title" onClick={msgSelcted}>{itms.subject}</span>
                                </div>
                            )) : <div >No mails</div>
                        }
                    </div>}

                    {
                        showmsg && <Msgview arr={selitm} setShowmsg={setShowmsg} />
                    }
                </div>


            </div>
        </div>
    );
}

export default Wel;