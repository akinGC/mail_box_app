import {configureStore} from '@reduxjs/toolkit'
import Auth from './Auth'
import Count from './Count'
const store = configureStore({
    reducer:{auth:Auth,count:Count}
})

export default store