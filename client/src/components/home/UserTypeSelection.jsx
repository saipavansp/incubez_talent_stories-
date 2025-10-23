import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BriefcaseIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const UserTypeSelection = () => {
  const userTypes = [
    {
      id: 'founder',
      title: "I'm a Founder",
      subtitle: 'Post a Job Pitch',
      description: 'Looking for a co-founder, EIR, or key team member? Create a video pitch to attract top talent.',
      icon: BriefcaseIcon,
      features: [
        'Reach qualified candidates',
        'Video-based screening',
        'Structured pitch format',
        'Quick turnaround time'
      ],
      link: '/founder/pitch',
      buttonText: 'Post Your Pitch',
      color: 'incubez-red',
      gradient: 'from-red-500 to-incubez-red'
    },
    {
      id: 'seeker',
      title: "I'm a Seeker",
      subtitle: 'Submit Application',
      description: 'Ready to join an exciting startup? Showcase your skills and passion through video.',
      icon: RocketLaunchIcon,
      features: [
        'Connect with founders',
        'Showcase your expertise',
        'Find your perfect match',
        'Join innovative startups'
      ],
      link: '/seeker/apply',
      buttonText: 'Apply Now',
      color: 'incubez-black',
      gradient: 'from-gray-700 to-incubez-black'
    }
  ]

  return (
    <section id="get-started" className="py-12 sm:py-16 md:py-20 bg-gray-50">
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
            Get Started Today
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Choose your path and begin your journey to finding the perfect match
          </p>
        </motion.div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${type.gradient} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <type.icon className="h-12 w-12" />
                    <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {type.subtitle}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{type.title}</h3>
                  <p className="text-white text-opacity-90">{type.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={type.link}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      type.id === 'founder' 
                        ? 'bg-incubez-red text-white hover:bg-red-700' 
                        : 'bg-incubez-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {type.buttonText}
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full opacity-20"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Not sure which option is right for you?
          </p>
          <a 
            href="#how-it-works" 
            className="text-incubez-red hover:text-red-700 font-medium inline-flex items-center gap-2 group"
          >
            Learn how it works
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default UserTypeSelection
