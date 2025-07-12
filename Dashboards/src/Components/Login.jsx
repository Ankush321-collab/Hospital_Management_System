import React, { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../main'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, seterror] = useState("")
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  })

  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, admin, setadmin } = useContext(Context)

  const handlechange = (e) => {
    const { name, value } = e.target
    console.log(value);
    setformdata(prev => ({ ...prev, [name]: value }))
  }

  const handlelogin = async () => {
    setloading(true)
    seterror("")
    try {
      const { data } = await axios.post(
        "http://localhost:5002/api/login", // <-- FIXED ENDPOINT
        {
          email: formdata.email,
          password: formdata.password,
          confirmPassword: formdata.confirmPassword,
          role: formdata.role || "Admin"
        },
        {
          withCredentials: true,
        }
      )
      toast.success(`Welcome back! ${data.user.firstName}😊`)
      localStorage.setItem("admin", JSON.stringify(data.user))
      localStorage.setItem("adminToken", data.token)
      setIsAuthenticated(true)
      setadmin(data.user)
      navigate('/')
    } catch (e) {
      const msg = e?.response?.data?.errors || "Login Failed"
      seterror(msg)
    } finally {
      setloading(false)
    }
  }

  const inputFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "your@email.com",
      value: formdata.email,
      showToggle: false
    },
    {
      label: "Password",
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      value: formdata.password,
      showToggle: true
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: showPassword ? "text" : "password",
      placeholder: "Re-enter your password",
      value: formdata.confirmPassword,
      showToggle: true
    },
    {
      label: "Role",
      name: "role",
      type: "select",
      placeholder: "Select your role",
      value: formdata.role,
      showToggle: false,
      options: ["Admin"]
    }
  ]

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }
  
  return (
    <div className='bg-slate-50 dark:bg-gray-900 min-h-screen w-full flex items-center justify-center px-4'>
      <div className='bg-white dark:bg-gradient-to-b dark:from-[#1e1e1e] dark:to-[#121212] text-slate-900 dark:text-white w-full max-w-md rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-gray-800'>
        <h1 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#7a6ff0] dark:to-[#5e8bff] bg-clip-text text-transparent'>
          Admin Login
        </h1>

        {inputFields.map((field, index) => (
          <div className={`mb-${field.name === "password" ? "6" : "4"} relative`} key={index}>
            <label className='block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1'>{field.label}</label>
            {field.type === "select" ? (
              <select
                className='w-full bg-slate-50 dark:bg-[#2a2a2a] border border-slate-300 dark:border-gray-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200'
                name={field.name}
                value={field.value}
                onChange={handlechange}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                className='w-full bg-slate-50 dark:bg-[#2a2a2a] border border-slate-300 dark:border-gray-700 rounded-lg px-4 py-3 placeholder-slate-500 dark:placeholder-gray-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#7a6ff0] focus:border-transparent transition-all duration-200'
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handlechange}
                placeholder={field.placeholder}
              />
            )}
            {field.showToggle && field.type !== "select" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-slate-400 dark:text-gray-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
            {field.name === "password" && error && (
              <p className='text-md ml-1 text-red-500 mt-2'>{error}</p>
            )}
          </div>
        ))}

        <div className='mb-6 text-sm text-slate-600 dark:text-gray-400'>
          <p>By signing up or logging in, you consent to DeepSeek's <a className='text-blue-600 dark:text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html">Terms of Use</a> and <a className='text-blue-600 dark:text-[#7a6ff0] hover:underline' href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">Privacy Policy</a>.</p>
        </div>

        <button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#7a6ff0] dark:to-[#5e8bff] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-[0_5px_15px_rgba(122,111,240,0.4)]'
          onClick={handlelogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className='mt-6 text-center text-sm text-slate-600 dark:text-gray-400'>
          Don't have an account?{' '}
          <Link
            to={'/signup'}
            className='text-blue-600 dark:text-[#7a6ff0] font-medium hover:underline'
          >
            Signup
          </Link>
        </div>

        <div className='flex items-center my-6'>
          <div className='flex-grow border-t border-slate-300 dark:border-gray-700'></div>
          <div className='flex-grow border-t border-slate-300 dark:border-gray-700'></div>
        </div>
      </div>
    </div>
  )
}

export default Login