import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context, ThemeContext } from '../main';
import { FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);

  // Set active link based on current location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path === '/doctors') setActiveLink('doctors');
    else if (path === '/message') setActiveLink('messages');
    else if (path === '/addnewdoctor') setActiveLink('addDoctor');
    else if (path === '/addadmin') setActiveLink('addAdmin');
  }, [location]);

  // Emit custom event when sidebar state changes
  useEffect(() => {
    const event = new CustomEvent('sidebarStateChange', { detail: { isOpen: show } });
    window.dispatchEvent(event);
  }, [show]);

  const handleNavigation = (path, linkName) => {
    navigate(path);
    setActiveLink(linkName);
    setShow(false);
  };

  const toggleSidebar = () => {
    setShow(!show);
  };

  const closeSidebar = () => {
    setShow(false);
  };

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:5002/api/admin/logout", {}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <>
      {/* Hamburger menu button - always visible */}
      <div 
        className="fixed top-5 left-5 z-[1001] bg-gradient-to-br from-slate-700 to-slate-800 text-white p-3 rounded-lg cursor-pointer shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu className="text-2xl transition-transform duration-300 hover:rotate-90" />
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[999] transition-opacity duration-300 ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={closeSidebar} 
      />
      
      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-screen w-[35vw] md:w-[35vw] lg:w-[35vw] sm:w-[85vw] xs:w-[90vw] ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white' 
          : 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-900'
      } shadow-2xl transform transition-transform duration-300 ease-in-out z-[1000] flex flex-col overflow-hidden ${
        show ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`p-5 flex justify-between items-center ${
          theme === 'dark' 
            ? 'bg-black bg-opacity-10 border-b border-white border-opacity-10' 
            : 'bg-white bg-opacity-20 border-b border-slate-400 border-opacity-20'
        }`}>
          <h3 className="text-xl md:text-xl sm:text-lg font-semibold m-0">Admin Panel</h3>
          <IoClose 
            className={`text-2xl cursor-pointer transition-all duration-300 p-1 rounded ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:scale-110`} 
            onClick={closeSidebar}
          />
        </div>
        
        <div className="flex-1 py-5 overflow-y-auto">
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 ${
              activeLink === 'home' ? 'bg-blue-500 bg-opacity-20' : ''
            }`}
            onClick={() => handleNavigation('/', 'home')}
          >
            <FaHome className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Dashboard</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
          
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 ${
              activeLink === 'doctors' ? 'bg-blue-500 bg-opacity-20' : ''
            }`}
            onClick={() => handleNavigation('/doctors', 'doctors')}
          >
            <FaUserDoctor className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Doctors</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
          
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 ${
              activeLink === 'messages' ? 'bg-blue-500 bg-opacity-20' : ''
            }`}
            onClick={() => handleNavigation('/message', 'messages')}
          >
            <AiFillMessage className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Messages</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
          
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 ${
              activeLink === 'addDoctor' ? 'bg-blue-500 bg-opacity-20' : ''
            }`}
            onClick={() => handleNavigation('/addnewdoctor', 'addDoctor')}
          >
            <IoPersonAdd className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Add Doctor</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
          
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 ${
              activeLink === 'addAdmin' ? 'bg-blue-500 bg-opacity-20' : ''
            }`}
            onClick={() => handleNavigation('/addadmin', 'addAdmin')}
          >
            <MdAddModerator className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Add Admin</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
        </div>
        
        {/* Show logout only if authenticated */}
        {isAuthenticated && (
          <div 
            className={`relative p-4 mx-2.5 my-1.5 rounded-lg flex items-center cursor-pointer transition-all duration-300 overflow-hidden ${
              theme === 'dark' 
                ? 'hover:bg-white hover:bg-opacity-10' 
                : 'hover:bg-slate-600 hover:bg-opacity-10'
            } hover:translate-x-1 bg-red-500 bg-opacity-10 hover:bg-red-500 hover:bg-opacity-20 mt-auto mb-5`}
            onClick={logout}
          >
            <IoLogOut className="text-xl mr-4 transition-transform duration-300 hover:scale-120" />
            <span className="text-sm font-medium transition-all duration-300">Logout</span>
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent ${
              theme === 'dark' ? 'via-white via-opacity-10' : 'via-slate-600 via-opacity-10'
            } to-transparent transition-left duration-600 hover:left-full`}></div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;