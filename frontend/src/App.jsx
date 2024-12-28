import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context.jsx'

import './App.css'

function App() {
  

  return (
    <UserProvider value={{user:null,setUser:null}}>
      <AppRoutes/>
    </UserProvider>
   
  )
}

export default App
