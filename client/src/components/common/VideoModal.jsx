import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoRef = useRef(null)

  // Auto-play and reset when modal opens/closes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isOpen])

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-95 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-incubez-red text-white rounded-full p-3 hover:bg-red-700 transition-all shadow-lg hover:scale-110"
            aria-label="Close video"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Video Title */}
          {title && (
            <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-medium">{title}</span>
            </div>
          )}

          {/* HTML5 Video Player */}
          <div className="relative w-full aspect-video bg-black">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Loading video...</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-xs backdrop-blur-sm">
            Press ESC or click outside to close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VideoModal
