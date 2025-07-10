import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" }, // Fixed day from "Monday" to "Friday"
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="h-12 w-auto object-contain"
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Providing quality healthcare services with compassion and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/appointment" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  Appointment
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Operating Hours
            </h4>
            <ul className="space-y-3">
              {hours.map((element) => (
                <li key={element.id} className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{element.day}</span>
                  <span className="text-gray-600 dark:text-gray-400">{element.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href="tel:999-999-9999" 
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    999-999-9999
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MdEmail className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:zeelab@gmail.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    zeelab@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FaLocationArrow className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600 dark:text-gray-400">Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Your Clinic Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;