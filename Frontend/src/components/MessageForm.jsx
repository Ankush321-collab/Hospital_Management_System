import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

const MessageForm = () => {

    const [formdata, setformdata] = useState({
       firstname:"",
       lastname:"",
       email:"",
       phone:"",
       message:"",

      })

      const [loading,setloading]=useState(false);
      const[error,seterror]=useState("");

      const handlechange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setformdata({
            ...formdata,
            [name]:value,
        })
      }

      const handleform=async(e)=>{
        e.preventDefault();
        setloading(false);
        seterror("")

        try{
            await axios.post("http://localhost:5002/api/v1/message/send",{
                firstname:formdata.firstname,lastname:formdata.lastname,email:formdata.email,phone:formdata.phone,message:formdata.message},
                {
                    withCredentials:true,
                    headers:{"Content-Type":"application/json"},
                }


            )
            toast.success("message send succesfully ")

        }
           

    
        
      
        catch(error){
            const msg=error?.response?.data?.message
            toast.error(msg);

        }
        finally{
            setloading(false)

        }
      }
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg relative overflow-hidden">
    {/* Decorative vector image */}
    <img 
      src="/Vector.png" 
      alt="vector" 
      className="absolute -right-10 -bottom-10 opacity-20 w-64 h-64"
    />
    
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center relative z-10">
      Send Us A Message
      <div className="mt-2 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
    </h2>
  
    <form onSubmit={handleform} className="space-y-6 relative z-10">
      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            placeholder="John"
            value={formdata.firstname}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            placeholder="Doe"
            value={formdata.lastname}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            required
          />
        </div>
      </div>
  
      {/* Contact fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={formdata.email}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="123-456-7890"
            value={formdata.phone}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            required
          />
        </div>
      </div>
  
      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="How can we help you?"
          value={formdata.message}
          onChange={handlechange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          required
        ></textarea>
      </div>
  
      {/* Submit button */}
      <div className="flex justify-center">
        <button
        
          type="submit"
          className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
         {loading?"sending":"send"}
        </button>
      </div>
    </form>
  </div>
  )
}

export default MessageForm