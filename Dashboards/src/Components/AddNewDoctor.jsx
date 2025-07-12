import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../main';

const AddNewDoctor = () => {
  const[showpass,setshowpass]=useState(false)
  const[loading,setloading]=useState(false);
  const [error,seterror]=useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const navigate=useNavigate();
  const { isAuthenticated } = useContext(Context)

  const[formdata,setformdata]=useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhar: "",
    dob: "",
    gender: "",
    password: "",
    confirmpassword: "",
    doctorDepartment:"",
    docAvatar:""
  })

  const departmentsArray = [
    "cardiology",
    "dermatology", 
    "eNT",
    "neurology",
    "oncology",
    "orthopedics",
    "pediatrics",
    "radiology",
    "therapy"
  ];

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setformdata({
      ...formdata,
      [name]:value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setformdata({
        ...formdata,
        docAvatar: file
      });
    }
  };

  const handlesignup=async(e)=>{
    e.preventDefault();
    seterror("");
    setloading(true);
    
    if (formdata.password !== formdata.confirmpassword) {
      seterror("Passwords do not match");
      setloading(false);
      return;
    }

    try{
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formdata).forEach(key => {
        if (key === 'docAvatar' && selectedFile) {
          formDataToSend.append('docAvatar', selectedFile);
        } else if (key !== 'docAvatar') {
          formDataToSend.append(key, formdata[key]);
        }
      });

      const{data}=await axios.post("http://localhost:5002/api/adddoctor",
        formDataToSend,{
           withCredentials: true,
           headers:{
             "Content-Type":"multipart/form-data"
           },
        }
      )
      toast.success(`Doctor ${data.user.firstName} Added Successfully`);
      navigate("/");
    }
    catch(error){
      const msg = error?.response?.data?.message || "Signup failed";
      seterror(msg);
      toast.error(msg);
    } finally {
      setloading(false);
    }
  }

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-900 p-6 text-white">
          <h1 className="text-3xl font-bold">Add New Doctor</h1>
          <p className="opacity-90">Fill in the details to register a new doctor</p>
        </div>
  
        <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handlesignup}>
          {/* First Name */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">First Name</label>
            <input
              name="firstName"
              value={formdata.firstName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Last Name */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Last Name</label>
            <input
              name="lastName"
              value={formdata.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Email */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              name="email"
              value={formdata.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Phone */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone</label>
            <input
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Aadhar */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Aadhar Number</label>
            <input
              name="aadhar"
              value={formdata.aadhar}
              onChange={handleChange}
              type="text"
              placeholder="Enter your aadhar number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Date of Birth */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Date of Birth</label>
            <input
              name="dob"
              value={formdata.dob}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Gender */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Gender</label>
            <select
              name="gender"
              value={formdata.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
  
          {/* Department */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Department</label>
            <select
              name="doctorDepartment"
              value={formdata.doctorDepartment}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            >
              <option value="">Select department</option>
              {departmentsArray.map((dept) => (
                <option key={dept} value={dept.toLowerCase()}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
  
          {/* Password */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              name="password"
              value={formdata.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Confirm Password */}
          <div className="group relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
            <input
              name="confirmpassword"
              value={formdata.confirmpassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              required
            />
          </div>
  
          {/* Avatar Upload */}
          <div className="group relative md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Doctor Avatar</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-all duration-200 dark:hover:bg-gray-900 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                  {fileName && (
                    <p className="text-xs text-green-600 mt-2">Selected: {fileName}</p>
                  )}
                </div>
                <input
                  name="docAvatar"
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              {loading ? "Adding Doctor..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewDoctor;