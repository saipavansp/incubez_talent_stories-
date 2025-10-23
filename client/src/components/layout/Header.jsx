import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('userToken') // Check if user is logged in
  
  // Check if we're on homepage
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine if header should use dark theme (white background, dark text)
  const isDarkTheme = !isHomePage || isScrolled

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Pitches', path: '/pitches' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isDarkTheme ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer flex items-center gap-3"
            onClick={handleLogoClick}
          >
            <img 
              src="/images/incubez-logo.svg" 
              alt="INCUBEZ Logo" 
              className="h-10 w-10 object-contain"
              onError={(e) => { e.target.style.display = 'none' }} // Hide if logo not found
            />
            <h1 className="text-2xl font-bold">
              <span className={isDarkTheme ? "text-incubez-black" : "text-white"}>INCUBEZ</span>
              <span className="text-incubez-red"> Talent</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-incubez-red ${
                  location.pathname === link.path ? 'text-incubez-red' : 
                  isDarkTheme ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center">
              <Link 
                to="/founder/pitch" 
                className="bg-white text-incubez-black px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Post Your Pitch
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isDarkTheme ? 'text-gray-700' : 'text-white'}`}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-incubez-red hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link 
                to="/founder/pitch" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-white text-incubez-black px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gray-100"
              >
                Post Your Pitch
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  )
}

export default Header

