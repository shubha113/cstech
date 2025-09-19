import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import agentReducer from './agentSlice.js'
import listReducer from './listSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    agent: agentReducer,
    list: listReducer,
  },
})

export default store