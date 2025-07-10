import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { motion, AnimatePresence } from "framer-motion";
import img from '../../public/logo.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { isauthenticated, setisauthenticated, setuser } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isauthenticated) {
      navigate('/login');
    }
  }, [isauthenticated, navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:5002/api/patient/logout", {}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setisauthenticated(false);
      setuser({});
      localStorage.removeItem('user');
      localStorage.removeItem("token");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/appointment", label: "Appointment" },
    { path: "/about", label: "About Us" },
  ];

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const linkVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: { 
      opacity: 0,
      y: -10,
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with 3D hover effect */}
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.img 
            src="/logo.png" 
            alt="logo" 
            className="h-10 w-auto"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
          />
          <span className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AnkushCare
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center relative">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              className="relative"
              onHoverStart={() => setHoveredLink(i)}
              onHoverEnd={() => setHoveredLink(null)}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={link.path}
                className={`relative z-10 px-2 py-1 text-gray-700 font-medium transition-colors duration-300 ${
                  location.pathname === link.path 
                    ? "text-blue-600 font-semibold" 
                    : "hover:text-blue-500"
                }`}
              >
                {link.label}
              </Link>
              {hoveredLink === i && (
                <motion.div
                  layoutId="navHighlight"
                  className="absolute inset-0 bg-blue-100 rounded-md z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.div>
          ))}
          
          {isauthenticated ? (
            <motion.button
              onClick={handleLogout}
              className="relative px-4 py-2 rounded-md overflow-hidden group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-white font-medium">
                LOGOUT
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 z-0"
                initial={{ opacity: 1 }}
                whileHover={{
                  background: [
                    'linear-gradient(to right, #ef4444, #dc2626)',
                    'linear-gradient(to right, #dc2626, #b91c1c)',
                    'linear-gradient(to right, #ef4444, #dc2626)'
                  ],
                  transition: { duration: 1, repeat: Infinity }
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate("/login")}
              className="relative px-4 py-2 rounded-md overflow-hidden group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-white font-medium">
                LOGIN
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 z-0"
                initial={{ opacity: 1 }}
                whileHover={{
                  background: [
                    'linear-gradient(to right, #3b82f6, #2563eb)',
                    'linear-gradient(to right, #2563eb, #1d4ed8)',
                    'linear-gradient(to right, #3b82f6, #2563eb)'
                  ],
                  transition: { duration: 1, repeat: Infinity }
                }}
              />
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger with animation */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className="w-6 h-0.5 bg-gray-800 block"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-gray-800 block"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-gray-800 block"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 pb-4 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                variants={linkVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`block py-3 px-2 rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-2 space-y-2">
              {isauthenticated ? (
                <motion.button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2.5 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={linkVariants}
                >
                  LOGOUT
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full text-center py-2.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={linkVariants}
                >
                  LOGIN
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;