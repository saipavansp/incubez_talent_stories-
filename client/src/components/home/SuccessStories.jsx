import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import VideoModal from '../common/VideoModal'

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const stories = [
    {
      id: 1,
      title: "Looking for Founder's Office Role",
      company: 'Chahath',
      videoUrl: "/videos/chahath - founder's office Role.mp4",
      thumbnail: "/images/thumbnails/chahath-thumbnail.jpg"
    },
    {
      id: 2,
      title: 'Looking for Co-Founder',
      company: 'Pinkwellness',
      videoUrl: '/videos/pinkwellness seeking co founder.mp4',
      thumbnail: "" // Add pinkwellness-thumbnail.jpg when available
    },
    {
      id: 3,
      title: "Looking for Founder's Office Role",
      company: 'Startup',
      videoUrl: "/videos/Founder's office Role.mp4",
      thumbnail: "" // Add startup-thumbnail.jpg when available
    }
  ]

  // Manual navigation only (no auto-play)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="success-stories" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            Video <span className="text-incubez-red">Pitches</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Watch video pitches from founders and seekers looking for their perfect match.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  {/* Video Preview */}
                  <div className="relative h-56 xs:h-64 sm:h-80 md:h-96 lg:h-[500px] bg-black rounded-xl overflow-hidden">
                    {/* Video Thumbnail (First Frame) */}
                    <video
                      src={stories[currentIndex].videoUrl}
                      {...(stories[currentIndex].thumbnail && { poster: stories[currentIndex].thumbnail })}
                      className="w-full h-full object-contain"
                      preload="metadata"
                      muted
                      playsInline
                      aria-label={`Video pitch from ${stories[currentIndex].company} - ${stories[currentIndex].title}`}
                      title={`${stories[currentIndex].company} video pitch`}
                    />
                    
                    {/* Dark Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    {/* Play Button Overlay */}
                    <button 
                      className="absolute inset-0 flex items-center justify-center group z-10 cursor-pointer active:scale-95"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Play button clicked')
                        setIsVideoModalOpen(true)
                      }}
                      type="button"
                      aria-label={`Play video pitch from ${stories[currentIndex].company}`}
                    >
                      <div className="bg-incubez-red rounded-full p-4 sm:p-5 md:p-6 group-hover:scale-110 group-active:scale-95 transition-all duration-300 shadow-2xl">
                        <PlayIcon className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" aria-hidden="true" />
                      </div>
                    </button>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 sm:pt-24 md:pt-32">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                        {stories[currentIndex].company}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-md">
                        {stories[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-incubez-red hover:bg-red-700 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous story"
            type="button"
          >
            <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-incubez-red hover:bg-red-700 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next story"
            type="button"
          >
            <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                type="button"
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-12 bg-incubez-red' 
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            to="/pitches"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-incubez-red hover:text-red-700 font-medium group"
          >
            View All Pitches
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={stories[currentIndex]?.videoUrl}
          title={`${stories[currentIndex]?.company} - ${stories[currentIndex]?.title}`}
        />
      </div>
    </section>
  )
}

export default SuccessStories
