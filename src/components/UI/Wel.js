import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import Msgview from './Msgview';
import './Wel.css'
function Wel() {
    const [showmsg,setShowmsg] = useState(false)
    const [selitm,setitm] = useState([])
    const username = useSelector(state=>state.auth.mailId)

    const [farry,sarry] = useState([])
    const [delar,sedelar] = useState([])
  
    async function fetchitms(){
        const resp = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${username}.json`)
        const data = await resp.json()
        // console.log(username)
        let ar1= Object.keys(data)
        // console.log(ar1)
        let ar2 = Object.values(data)
        // console.log(ar2)
        let interarr = []
        for (let i = 0; i < ar1.length; i++) {
           let newobj={
            id:ar1[i],
            name:ar2[i].name,
            from:ar2[i].from,
            subject:ar2[i].subject,
            content:ar2[i].content
           }
   
           interarr.push(newobj)
          
        }
        interarr.reverse()
        sarry(interarr)
        // console.log(farry)
      
    }
    useEffect(()=>{
        fetchitms()
    },[])

    function btnclk(e){
        // console.log(e.target.name)
        sedelar([...delar,e.target.name])
        // console.log(delar)

    }
  async function deletemail(){
        for (let i = 0; i < delar.length; i++) {
            const resp = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/${delar[i]}.json`,{
                method:'DELETE'      
            })   
        }
        let ar = farry
        for (let i = 0; i < ar.length; i++) {
            if(ar[i].id==delar[i]){
                ar.splice(i,1)
            }
            document.getElementById(delar[i]).remove()
            
        }
        sarry([ar])
        // console.log(farry)
    }
    function msgSelcted(e){
        let idz = e.target.parentElement.id
        // console.log(idz)
        for (let i = 0; i < farry.length; i++) {
            
            if(farry[i].id==idz){
                console.log(farry[i].name)
                setitm({
                    from:farry[i].from,
                    content:farry[i].content,
                    subject:farry[i].subject,
                    id:farry[i].id,
                    name:farry[i].name
                })
            }
            
        }
       
         
           setShowmsg(true)  
        //    console.log(selitm)
    }
    return ( 
        <div className="wel_whole">
            <div className="wel_nav">
                <div className="wel_nav_title">
                Yahoo<span className="wel_nav_txt">!</span>mail
                </div>
                <span className="logout">Logout</span>
            </div>
            <div className='wel_cnt_del'><span onClick={deletemail}>Delete</span></div>
           <div className='wel_cnt_wle'>
           
           <div className="wel_left">
                <NavLink to='/sendMail'><span className="wel_compose">Compose</span></NavLink>
                <div className="wel_left_cnt">
                    <span className="wel_lft_itm" id='itmfrst'>Inbox</span>
                    <span className="wel_lft_itm" id='itmscnd'>Deleted Itms</span>
                    <span className="wel_lft_itm" id='itmtrd'>Sent</span>
                </div>
            </div>
            <div className="wel_rght inbox_itms">

               {!showmsg &&<div className='wel_itms_view'>
               {   farry.length!=0?
                    farry.map((itms)=>(
                  
<div className="wel_rt_itm" id={itms.id}>
                    <input type='checkbox'name={itms.id} onClick={btnclk}></input>
                    <span className="wel_itm_title" onClick={msgSelcted}>{itms.from}</span>
                    <span className="wel_itm_subject wel_itm_title"onClick={msgSelcted}>{itms.subject}</span>
                </div>
                    )):<div >No mails</div>
                    }
               </div>}
             
                    {
                        showmsg && <Msgview arr = {selitm} setShowmsg={setShowmsg}/>
                    }
            </div>

            
           </div>
        </div>
     );
}

export default Wel;