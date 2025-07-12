import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { toast } from 'react-toastify';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleDateString();
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [activities, setActivities] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      // Fetch doctors
      const doctorRes = await axios.get('http://localhost:5002/api/alldoctors', { headers, withCredentials: true });
      setDoctorCount(doctorRes.data.doctors ? doctorRes.data.doctors.length : 0);
      // Fetch appointments
      const appointmentRes = await axios.get('http://localhost:5002/api/getallappointment', { headers, withCredentials: true });
      setAppointmentCount(appointmentRes.data.appointments ? appointmentRes.data.appointments.length : 0);
      // Fetch messages
      const messageRes = await axios.get('http://localhost:5002/api/v1/message/getallmessage', { headers, withCredentials: true });
      const messages = messageRes.data.message || [];
      const unread = messages.filter(msg => !msg.isRead).length;
      setNewMessageCount(unread);
      // Fetch admins
      const adminRes = await axios.get('http://localhost:5002/api/alladmins', { headers, withCredentials: true });
      setAdminCount(adminRes.data.admins ? adminRes.data.admins.length : 0);
      // Fetch activities
      const activityRes = await axios.get('http://localhost:5002/api/v1/activity/recent', { headers, withCredentials: true });
      setActivities(activityRes.data.activities || []);
    } catch (err) {
      toast.error('Failed to fetch dashboard data');
      setDoctorCount(0);
      setAppointmentCount(0);
      setNewMessageCount(0);
      setAdminCount(0);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCounts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-300">Please login to view the dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 p-8 md:p-8 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-slate-800 dark:text-gray-100 mb-3 text-5xl md:text-4xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-gray-300 text-lg md:text-base sm:text-sm m-0">Welcome to the Hospital Management System</p>
        <button 
          onClick={fetchCounts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Refresh Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 md:p-5 sm:p-4 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-slate-600 dark:text-gray-300 mb-4 text-sm font-semibold uppercase tracking-wider">Total Doctors</h3>
          <p className="text-slate-800 dark:text-gray-100 text-5xl md:text-4xl sm:text-3xl font-bold m-0">{doctorCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 md:p-5 sm:p-4 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-slate-600 dark:text-gray-300 mb-4 text-sm font-semibold uppercase tracking-wider">Total Appointments</h3>
          <p className="text-slate-800 dark:text-gray-100 text-5xl md:text-4xl sm:text-3xl font-bold m-0">{appointmentCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 md:p-5 sm:p-4 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-slate-600 dark:text-gray-300 mb-4 text-sm font-semibold uppercase tracking-wider">New Messages</h3>
          <p className="text-slate-800 dark:text-gray-100 text-5xl md:text-4xl sm:text-3xl font-bold m-0">{newMessageCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 md:p-5 sm:p-4 rounded-xl shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-slate-600 dark:text-gray-300 mb-4 text-sm font-semibold uppercase tracking-wider">Active Admins</h3>
          <p className="text-slate-800 dark:text-gray-100 text-5xl md:text-4xl sm:text-3xl font-bold m-0">{adminCount}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-6 sm:p-4">
          <h2 className="text-slate-800 dark:text-gray-100 mb-5 text-2xl md:text-xl sm:text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center text-slate-500 dark:text-gray-400">No recent activity</div>
            ) : (
              activities.map((activity, idx) => (
                <div key={activity._id || idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-slate-50 dark:bg-gray-900 rounded-lg border-l-4 border-blue-500 gap-2 sm:gap-0">
                  <span className="text-slate-600 dark:text-gray-300 text-sm font-medium">{timeAgo(activity.createdAt)}</span>
                  <span className="text-slate-800 dark:text-gray-100 font-medium">{activity.description}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;