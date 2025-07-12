import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'

const Message = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [markingId, setMarkingId] = useState(null)
  const { isAuthenticated } = useContext(Context)
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get("http://localhost:5002/api/v1/message/getallmessage", {
          headers: getAuthHeaders(),
          withCredentials: true
        })
        setMessages(data.message || [])
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          toast.error('Authentication failed. Please login again.');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          navigate('/login');
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch messages")
        }
        setMessages([])
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [navigate])

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(messageId);
      await axios.delete(`http://localhost:5002/api/v1/message/message/${messageId}`, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
      
      toast.success('Message deleted successfully!');
      // Remove the message from the list
      setMessages(messages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete message');
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      setMarkingId(messageId);
      await axios.patch(`http://localhost:5002/api/v1/message/message/${messageId}/read`, {}, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
      
      toast.success('Message marked as read!');
      // Update the message in the list
      setMessages(messages.map(message => 
        message._id === messageId ? { ...message, isRead: true } : message
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to mark message as read');
      }
    } finally {
      setMarkingId(null);
    }
  };

  const canDeleteMessage = (message) => {
    if (!message.createdAt) return false;
    const messageAge = Date.now() - new Date(message.createdAt).getTime();
    const hoursSinceCreation = messageAge / (1000 * 60 * 60);
    return hoursSinceCreation <= 24;
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          PATIENT <span className="text-blue-600 dark:text-blue-400">MESSAGES</span>
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          View all patient inquiries and messages from our contact form
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {messages && messages.length > 0 ? (
            messages.map((message, index) => {
              // Different border colors based on index
              const borderColors = [
                'border-blue-500 hover:border-blue-600',
                'border-green-500 hover:border-green-600',
                'border-purple-500 hover:border-purple-600',
                'border-amber-500 hover:border-amber-600',
                'border-rose-500 hover:border-rose-600',
                'border-emerald-500 hover:border-emerald-600'
              ];
              const borderClass = borderColors[index % borderColors.length];
              const isRead = message.isRead;
              const canDelete = canDeleteMessage(message);
              
              return (
                <div 
                  key={message._id || index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-8 ${borderClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRead ? 'opacity-75' : ''}`}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-md">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
                        {message.firstname} {message.lastname}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                          {message.subject || 'General Inquiry'}
                        </span>
                        {!isRead && (
                          <span className="text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{message.email || 'No email provided'}</span>
                      </div>
                      
                      {message.phone && (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{message.phone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                      
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <div className="text-gray-600 dark:text-gray-300">
                          <p className="text-sm leading-relaxed">
                            {message.message || 'No message content available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 flex justify-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                      Reply
                    </button>
                    {!isRead && (
                      <button 
                        onClick={() => handleMarkAsRead(message._id)}
                        disabled={markingId === message._id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {markingId === message._id ? 'Marking...' : 'Mark Read'}
                      </button>
                    )}
                    {canDelete ? (
                      <button 
                        onClick={() => handleDeleteMessage(message._id)}
                        disabled={deletingId === message._id}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === message._id ? 'Deleting...' : 'Delete'}
                      </button>
                    ) : (
                      <button 
                        disabled
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm"
                        title="Messages can only be deleted within 24 hours"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h2 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-200">No Messages</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-300">No messages have been received yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Message