import {createSlice} from '@reduxjs/toolkit'

const init={
    countnum:0
}
const Count = createSlice({
    name:'Count',
    initialState:init,
    reducers:{
        updtcount(state, action){
            state.countnum=action.payload
        }
    }
})


export const  fetchcnt =  (prop)=>{
    return(dispatch)=>{
        async function ftc(){
            const resp =await fetch(`https://react-2fea7-default-rtdb.asia-southeast1.firebasedatabase.app/mailapp/${prop}.json`) 

        const data = await resp.json()
        // console.log(data)
        if(data!=null){

        
        let ar1 = Object.keys(data)
        let ar2 = Object.values(data)  
        let interarr = 0
        
        for (let i = 0; i < ar1.length; i++) {
            if(ar2[i].seen==false){
                interarr=interarr+1
            }
            
            

          
            
        }
        dispatch(CountAction.updtcount(interarr))
        console.log(interarr)

       
    }
        }
        ftc()
    }
}
export const CountAction = Count.actions
export default Count.reducer