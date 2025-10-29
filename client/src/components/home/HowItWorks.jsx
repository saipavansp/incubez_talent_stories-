import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  UserGroupIcon, 
  VideoCameraIcon, 
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  PaperAirplaneIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

const HowItWorks = () => {
  const founderSteps = [
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Create Your Pitch',
      description: 'Fill out details about your startup and the role you\'re hiring for'
    },
    {
      icon: VideoCameraIcon,
      title: 'Record Video Pitch',
      description: 'Create a 1-4 minute video explaining your vision and requirements'
    },
    {
      icon: PaperAirplaneIcon,
      title: 'Submit Application',
      description: 'Submit your pitch to connect with qualified candidates'
    },
    {
      icon: UserGroupIcon,
      title: 'Review Applications',
      description: 'Watch video applications from qualified candidates'
    },
    {
      icon: SparklesIcon,
      title: 'Connect & Hire',
      description: 'Connect with your chosen candidate and build together'
    }
  ]

  const seekerSteps = [
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Complete Profile',
      description: 'Fill out your professional details and preferences'
    },
    {
      icon: VideoCameraIcon,
      title: 'Record Application',
      description: 'Create a compelling video showcasing your skills and passion'
    },
    {
      icon: PaperAirplaneIcon,
      title: 'Submit Application',
      description: 'Submit your application to matching opportunities'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Get Matched',
      description: 'Founders review your application and reach out if interested'
    },
    {
      icon: SparklesIcon,
      title: 'Join & Build',
      description: 'Join an exciting startup and help build the future'
    }
  ]

  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-white">
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
            How It <span className="text-incubez-red">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Simple, structured process to connect founders with exceptional talent
          </p>
        </motion.div>

        {/* Process Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* For Founders */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center mb-10"
            >
              <div className="bg-incubez-red text-white px-6 py-2 rounded-full font-semibold">
                For Founders
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-incubez-red to-transparent ml-4"></div>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {founderSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="text-center">
                      {/* Step Number */}
                      <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center relative z-10 hover:border-incubez-red transition-colors shadow-md">
                          <step.icon className="h-10 w-10 text-incubez-red" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-incubez-red text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* For Seekers */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center mb-10"
            >
              <div className="bg-incubez-black text-white px-6 py-2 rounded-full font-semibold">
                For Seekers
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-incubez-black to-transparent ml-4"></div>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {seekerSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="text-center">
                      {/* Step Number */}
                      <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center relative z-10 hover:border-incubez-black transition-colors shadow-md">
                          <step.icon className="h-10 w-10 text-incubez-black" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-incubez-black text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Ready to find your perfect match?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/founder/pitch" className="btn-primary">
              Start as Founder
            </Link>
            <Link to="/seeker/apply" className="btn-secondary">
              Apply as Seeker
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
