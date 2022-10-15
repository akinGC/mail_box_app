import {configureStore} from '@reduxjs/toolkit'
import Auth from './Auth'

const store = configureStore({
    reducer:{auth:Auth}
})

export default store