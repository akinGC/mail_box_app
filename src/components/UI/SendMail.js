import { useState } from 'react';
import './Ui.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {CountAction} from '../Redux/Count'
function SendMail() {
    const dispatch = useDispatch()
    const numbr = useSelector(state=>state.count.countnum)
    const from = useSelector(state=>state.auth.mailId)
    console.log(from + 'from')
    const nav=useNavigate()
    const [value, setValue] = useState('');

    const [mailcnt,setmailcnt] = useState({
        name:'',
        subject:''


    })
    function onChangehndl(e){
        switch (e.target.name) {
            case 'name':
                setmailcnt({...mailcnt,name:e.target.value})
                break;
            case 'sub':
                setmailcnt({...mailcnt,subject:e.target.value})
                break;
         
            default:
                break;
        }
    }
    async function submitmail (e){
           let vals ={
            name:mailcnt.name,
            from:from,
            subject:mailcnt.subject,
            content:value,
            seen:false
           }
           let ak = vals.name.split('').filter((it)=>{return it!='@'})
 ak = ak.filter((it)=>{return it!='.'})
let name = ak.join('')
if(from==name){
    dispatch(CountAction.updtcount(numbr+1))
}
           try{
            const resp = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${name}.json`,{
                method:'POST',
                body:JSON.stringify(vals)
            })
            const respfrom = await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailappfrom/${from}.json`,{
                method:'POST',
                body:JSON.stringify(vals)
            })
            const data = await resp.json()
            if(!resp.ok){
                alert(data.error.message)
            }
            else{
                setmailcnt({
                    name:'',
                    subject:''
                })
                setValue('')
                nav('/wel')
            }
           }
           catch(err){
            console.log(err)
           }
      
    }

    return ( 
        <div className='smail_whole'>
            <NavLink to='/wel' style={{textDecoration:'none'}}><span className='smail_cross'><span className='cancel_txt'>Cancel</span></span></NavLink>
            <div className='smail_to smailinpfld'>
                <span className='smail_to_txt'>To:</span>
                <input type='email' name='name'value={mailcnt.name}onChange={onChangehndl} ></input>
            </div>
            <input placeholder='Subject...' type='text'name='sub'value={mailcnt.subject}onChange={onChangehndl} className='smail_sub smailinpfld'/>
            <div className='smail_cnt smailinpfld'>
            <ReactQuill className='smail_cnt' style={{height:'60vh'}} theme="snow"name='cnt' value={value} onChange={setValue} >

            </ReactQuill>
            </div>
            <div className='smail_btm smailinpfld' onClick={submitmail}>
           Send
            </div>
        </div>
     );
}

export default SendMail;