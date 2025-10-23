import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="section-padding py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About <span className="text-incubez-red">INCUBEZ</span>
          </h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-600 mb-8 text-center">
              Connecting ambitious founders with exceptional talent through video-based matching
            </p>
            
            <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                INCUBEZ Talent Stories is revolutionizing how startups find their perfect team members. 
                We believe that the best matches happen when people can see the passion, vision, and 
                personality behind the resume.
              </p>
              <p className="text-gray-700">
                Through structured video pitches, we enable founders to showcase their vision and 
                allow talented individuals to demonstrate their skills and enthusiasm in a more 
                authentic way than traditional hiring methods.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">For Founders</h3>
                <p className="text-gray-700">
                  Post video pitches to attract co-founders, EIRs, and key team members who 
                  share your vision and passion for building something extraordinary.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">For Talent</h3>
                <p className="text-gray-700">
                  Showcase your skills through video applications and connect with startups 
                  that align with your career goals and values.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
