import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

//we need to create contexgt
export const Context=createContext({isauthenticated:false})

const Appwrapper=()=>{
  const [isauthenticated, setisauthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [user, setuser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : {};
  });

  return(
    <Context.Provider value={{isauthenticated,setisauthenticated,user,setuser}}>
 <BrowserRouter>
    <App />
    </BrowserRouter>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrapper />
  </StrictMode>,
)
