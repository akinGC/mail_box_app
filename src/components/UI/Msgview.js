import ReactQuill from 'react-quill';
import './Msg.css'

function Msgview(props) {
    console.log(props)
    
    function backbtn(){
        props.setShowmsg(false)
        // window.location.reload()
    }
  
    return ( 
        <div className='msgv_whole'>
                <div className='msgv_backbtn'><span onClick={backbtn} className='msgv_bck_btn'>Back</span></div>
                <span className='msgv_subject'>{props.arr.subject}</span>
                <div className='msgv_cnt'>
                    <div className='msgv_ft'>
                        <span className='msgv_ft_from'>from: <span className='addslant'>{props.arr.from}</span></span>
                        <span className='msgv_ft_from'>to:<span className='addslant addslantscnd'>{props.arr.name}</span></span>
                    </div>
                    <div className='msgv_body'>
                    <ReactQuill
   value={props.arr.content}
   readOnly={true}
   theme={"bubble"}
/>
                    </div>
                </div>
        </div>
     );
}

export default Msgview;