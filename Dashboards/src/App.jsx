import React, { useContext, useEffect, useState } from 'react'

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Sidebar from './Components/Sidebar'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login'
import AddNewDoctor from './Components/AddNewDoctor'
import Doctor from './Components/Doctor'
import Message from './Components/Message'
import AddNewAdmin from './Components/AddNewAdmin'
import { Context, ThemeContext } from './main'
import axios from 'axios'

function App() {
  const {isAuthenticated,setIsAuthenticated,admin,setadmin,theme}=useContext(Context)
  const { theme: appTheme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // Check if admin data exists in localStorage
        const adminData = localStorage.getItem('admin');
        const adminToken = localStorage.getItem('adminToken');
        if (adminData && adminToken) {
          setadmin(JSON.parse(adminData));
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
        // If no localStorage data, set as not authenticated and redirect
        setIsAuthenticated(false);
        setadmin({});
        navigate('/login');
      } catch (error) {
        setIsAuthenticated(false);
        setadmin({});
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, [setIsAuthenticated, setadmin]);

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarOpen(event.detail.isOpen);
    };
    window.addEventListener('sidebarStateChange', handleSidebarStateChange);
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange);
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, redirect
  if (!isAuthenticated && window.location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className={`min-h-screen p-5 pt-20 transition-all duration-300 bg-slate-50 dark:bg-gray-900 ${
        sidebarOpen ? 'md:ml-[35vw]' : ''
      }`}>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/addnewdoctor' element={<AddNewDoctor/>}/>
          <Route path='/doctors' element={<Doctor/>}/>
          <Route path='/message' element={<Message/>}/>
          <Route path='/addadmin' element={<AddNewAdmin/>}/>
        </Routes>
      </main>
      <ToastContainer position="top-center" />   
    </div>
  )
}

export default App
