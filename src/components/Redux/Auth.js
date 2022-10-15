import {createSlice} from '@reduxjs/toolkit'


const init = {
    isLoggedIn:localStorage.getItem('isLoggedIn'),
    id_token:localStorage.getItem('idToken')
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
        }
    }
})

export const Authauctions = Auth.actions
export default Auth.reducer