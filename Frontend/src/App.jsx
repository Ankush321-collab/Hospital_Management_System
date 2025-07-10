import { useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Home } from './pages/Home';
import Appointment from './components/Appointment';
import About from './pages/About';
import Navbar from './pages/Navbar';
import { Context } from './main';

function App() {
  const { isauthenticated } = useContext(Context);

  return (
    <>
    <div className='bg-[#ffffff97]'>
      <Navbar/>
     <Routes>
      <Route path='/' element={isauthenticated ? <Home/> : <Navigate to="/login" replace />} />
      <Route path='/appointment' element={isauthenticated ? <Appointment/> : <Navigate to="/login" replace />} />
      <Route path='/about' element={isauthenticated ? <About/> : <Navigate to="/login" replace />} />
      <Route path='/login' element={!isauthenticated ? <Login/> : <Navigate to="/" replace />} />
      <Route path='/signup' element={!isauthenticated ? <Signup/> : <Navigate to="/" replace />} />
     </Routes>
     <ToastContainer/>
     </div>
    </>
  )
}

export default App
