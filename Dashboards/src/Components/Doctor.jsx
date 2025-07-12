import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Doctor = () => {
  const[doctors,setdoctors]=useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const {isAuthenticated}=useContext(Context);
  const navigate=useNavigate();
  
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };
  
  useEffect(()=>{
    const fetchdoctors=async ()=>{
      try{
        setLoading(true);
        const {data}=await axios.get("http://localhost:5002/api/alldoctors",
          {
            headers: getAuthHeaders(),
            withCredentials: true
          }
        )
        setdoctors(data.doctors || data);
      }
      catch(error){
        console.error('Error fetching doctors:', error);
        if (error.response?.status === 401) {
          toast.error('Authentication failed. Please login again.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          navigate('/login');
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch doctors");
        }
        setdoctors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchdoctors();
  },[navigate])

  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(doctorId);
      await axios.delete(`http://localhost:5002/api/doctor/${doctorId}`, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
      
      toast.success('Doctor deleted successfully!');
      // Remove the doctor from the list
      setdoctors(doctors.filter(doctor => doctor._id !== doctorId));
    } catch (error) {
      console.error('Error deleting doctor:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete doctor');
      }
    } finally {
      setDeletingId(null);
    }
  };

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          OUR <span className="text-blue-600 dark:text-blue-400">DOCTORS</span>
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Meet our team of specialized healthcare professionals dedicated to your well-being
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors && doctors.length > 0 ? (
            doctors.map((element, index) => {
              // Different border colors based on department or index
              const borderColors = [
                'border-blue-500 hover:border-blue-600',
                'border-green-500 hover:border-green-600',
                'border-purple-500 hover:border-purple-600',
                'border-amber-500 hover:border-amber-600',
                'border-rose-500 hover:border-rose-600',
                'border-emerald-500 hover:border-emerald-600'
              ];
              const borderClass = borderColors[index % borderColors.length];
              
              return (
                <div 
                  key={element._id || index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-8 ${borderClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={element.docAvatar?.url || element.docAvatar || 'https://via.placeholder.com/150'}
                        alt="doctor avatar"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                      <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
                        {`Dr. ${element.firstName || ''} ${element.lastName || ''}`}
                      </h3>
                      <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mt-2">
                        {element.doctorDepartment || 'General'}
                      </span>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{element.email || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{element.phone || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{element.dob ? element.dob.substring(0, 10) : 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{element.aadhar || element.nic || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300 capitalize">{element.gender || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 flex justify-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                      Book Appointment
                    </button>
                    <button 
                      onClick={() => handleDeleteDoctor(element._id)}
                      disabled={deletingId === element._id}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === element._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-200">No Doctors Found</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-300">Currently there are no registered doctors available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Doctor;