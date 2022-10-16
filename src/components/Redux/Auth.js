import {createSlice} from '@reduxjs/toolkit'


const init = {
    isLoggedIn:localStorage.getItem('isLoggedIn'),
    id_token:localStorage.getItem('idToken'),
    mailId:localStorage.getItem('getMali')
}
const Auth = createSlice({
    name:'Auth_Slice',
    initialState:init,
    reducers:{
        loggedState(state, action){
            state.isLoggedIn=action.payload
        },
        setoken(state, action){
                state.id_token=action.payload
        },
        mailId(state, action){
            state.mailId=action.payload
        }
    }
})

export const Authauctions = Auth.actions
export default Auth.reducer