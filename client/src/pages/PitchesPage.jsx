import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import VideoModal from '../components/common/VideoModal'

const PitchesPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const pitches = [
    {
      id: 1,
      title: 'Looking for Co-Founder',
      company: 'Pinkwellness',
      videoUrl: '/videos/pinkwellness seeking co founder.mp4'
    },
    {
      id: 2,
      title: "Looking for Founder's Office Role",
      company: 'Startup',
      videoUrl: "/videos/Founder's office Role.mp4"
    },
    {
      id: 3,
      title: "Looking for Founder's Office Role",
      company: 'Chahath',
      videoUrl: "/videos/chahath - founder's office Role.mp4"
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="section-padding py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Video <span className="text-incubez-red">Pitches</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Watch video pitches from founders and seekers looking for their perfect match.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pitches.map((pitch, index) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
              >
                {/* Video Preview */}
                <div className="relative h-72 bg-black">
                  <video
                    src={pitch.videoUrl}
                    className="w-full h-full object-contain"
                    preload="metadata"
                    muted
                    playsInline
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
                  
                  {/* Play Button */}
                  <button 
                    onClick={() => {
                      setSelectedVideo(pitch)
                      setIsVideoModalOpen(true)
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-incubez-red rounded-full p-5 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <PlayIcon className="h-10 w-10 text-white" />
                    </div>
                  </button>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20">
                    <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{pitch.company}</h3>
                    <p className="text-sm text-gray-200 drop-shadow-md">{pitch.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => {
            setIsVideoModalOpen(false)
            setSelectedVideo(null)
          }}
          videoUrl={selectedVideo?.videoUrl}
          title={selectedVideo ? `${selectedVideo.company} - ${selectedVideo.title}` : ''}
        />
      </div>
    </div>
  )
}

export default PitchesPage
