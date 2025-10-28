import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PlayIcon } from '@heroicons/react/24/solid'

const HeroSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Animated background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-incubez-red rounded-full opacity-20"
            style={{
              width: particle.size + 'px',
              height: particle.size + 'px',
              left: particle.initialX + '%',
              top: particle.initialY + '%',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding py-20 sm:py-28 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight px-2">
            Connect with Your{' '}
            <span className="text-incubez-red">Perfect Match</span>
            <br />
            Through Video
          </h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto px-4"
          >
            Whether you're a founder seeking co-founders and key talent, or a professional 
            ready to join an exciting startup journey - find your perfect match today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-12 px-4"
          >
            <Link 
              to="/founder/pitch" 
              className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 flex items-center justify-center gap-2 group w-full sm:w-auto max-w-sm"
            >
              Post Your Pitch
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          {/* Video Demo Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-3 text-white hover:text-incubez-red transition-colors group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                <div className="relative bg-white rounded-full p-3 group-hover:bg-incubez-red transition-colors">
                  <PlayIcon className="h-6 w-6 text-incubez-black" />
                </div>
              </div>
              <span className="text-lg font-medium">Watch How It Works</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto px-4"
          >
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-incubez-red mb-2">500+</h3>
              <p className="text-sm sm:text-base text-gray-300">Successful Matches</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-incubez-red mb-2">1000+</h3>
              <p className="text-sm sm:text-base text-gray-300">Active Founders</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-incubez-red mb-2">12+</h3>
              <p className="text-sm sm:text-base text-gray-300">Partner Companies</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          y: { duration: 2, repeat: Infinity }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <div className="w-1 h-3 bg-white rounded-full mx-auto animate-bounce"></div>
        </div>
      </motion.div>

      {/* How It Works Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-incubez-red text-white rounded-full p-3 hover:bg-red-700 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://www.youtube.com/embed/P-tbbIyrTS8"
              title="How INCUBEZ Works"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default HeroSection

