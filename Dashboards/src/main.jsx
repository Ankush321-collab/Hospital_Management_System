import { createContext, StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

export const Context=createContext({isAuthenticated:false})
export const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

const Appwrapper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const[admin,setadmin]=useState({})
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Initialize authentication state from localStorage
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    if (adminToken && adminData) {
      try {
        const adminUser = JSON.parse(adminData);
        setIsAuthenticated(true);
        setadmin(adminUser);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
      }
    }
  }, []);

  // Apply theme to <html> tag and persist
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Context.Provider value={{isAuthenticated,setIsAuthenticated,admin,setadmin}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    </ThemeContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrapper/>
  </StrictMode>,
)
