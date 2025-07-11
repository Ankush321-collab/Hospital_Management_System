import { useContext, useEffect, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Sidebar from './Components/Sidebar'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login'
import AddNewDoctor from './Components/AddNewDoctor'
import { Doctor } from './Components/Doctor'
import Message from './Components/Message'
import AddNewAdmin from './Components/AddNewAdmin'
import { Context } from './main'
import axios from 'axios'

function App() {
  const {isAuthenticated,setIsAuthenticated,admin,setadmin}=useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setadmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setadmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    <Sidebar/>
<Routes>
  
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addnewdoctor' element={<AddNewDoctor/>}/>

      <Route path='/doctors' element={<Doctor/>}/>

      <Route path='/message' element={<Message/>}/>

      <Route path='/addadmin' element={<AddNewAdmin/>}/>

      

     </Routes>
     <ToastContainer position="top-center" />   

     </>
  )
}

export default App
