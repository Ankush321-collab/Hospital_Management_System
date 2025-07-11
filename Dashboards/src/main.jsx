import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


export const Context=createContext({isAuthenticated:false})

const Appwrapper=()=>{
  const[isAuthenticated,setisauthenticated]=useState(false);
  const[admin,setadmin]=useState({})

  return(
    <Context.Provider
    value={{isAuthenticated,setisauthenticated,admin,setadmin}}
    >
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Appwrapper/>
  </StrictMode>,
)
