import React, { useContext, useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'
import { toast} from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Context } from '../main';

const AddNewAdmin = () => {
    const { isAuthenticated, setisauthenticated } = useContext(Context);

    const [showpass, setshowpass] = useState(false);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const [formdata, setformdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aadhar: "",
        dob: "",
        gender: "",
        password: "",
        confirmpassword: ""
    });
    const inputFields = [
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
        { label: "Aadhar", name: "aadhar", type: "text" },
        { label: "Date of Birth", name: "dob", type: "date" },
        { label: "Gender", name: "gender", type: "text" }
    ];

    // Move redirect logic to the top of the component
    if (!isAuthenticated) {
        // return <Navigate to="/login" />;
    }

    const handlechange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setformdata({
            ...formdata,
            [name]: value
        });
    }

    const handlesignup = async (e) => {
        e.preventDefault();
        seterror("");
        setloading(true);

        if (formdata.password !== formdata.confirmpassword) {
            seterror("passwords do not match");
            setloading(false);
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5002/api/addadmin",
                formdata, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                })
            toast.success(`New Admin ${data.user.firstName} Added Successfully `)
            setisauthenticated(true)
            navigate('/')
        }
        catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg)
        }
        finally {
            setloading(false)
        }
    }
    return (
        <>
            <form onSubmit={handlesignup}>
                <div className='max-w-screen-2xl  w-full h-full m  flex items-center justify-center px-4 py-8 bg-gradient-to-br from-black via-gray-900 to-black'>
                    <div className='  bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-600'>
                        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] bg-clip-text text-transparent'>
                            Create New Admin
                        </h1>

                        {inputFields.map(({ label, name, type }) => (
                            <div className='mb-4' key={name}>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    {label}
                                </label>
                                <input
                                    name={name}
                                    value={formdata[name]}
                                    onChange={handlechange}
                                    type={type}
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        {/* Password */}
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    value={formdata.password}
                                    onChange={handlechange}
                                    type={showpass ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full h-12 px-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setshowpass(!showpass)}
                                >
                                    {showpass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    name="confirmpassword"
                                    value={formdata.confirmpassword}
                                    onChange={handlechange}
                                    type={showpass ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full h-12 px-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setshowpass(!showpass)}
                                >
                                    {showpass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {error && <span className='text-red-400 text-sm mt-2 block'>{error}</span>}
                        </div>

                        {/* Signup Button */}
                        <div className='mb-6'>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7a6ff0] to-[#5e8bff] text-white font-semibold shadow-lg hover:scale-105 disabled:opacity-60"
                            >
                                {loading ? "Creating Admin..." : "Create Admin"}
                            </button>
                        </div>

                        {/* Already have account */}
                        <div className='text-center text-sm text-gray-400'>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className='text-[#7a6ff0] hover:underline font-medium'
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddNewAdmin