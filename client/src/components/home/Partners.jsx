import React from 'react'
import { motion } from 'framer-motion'

const Partners = () => {
  // Partner logos - in a real app, these would be actual company logos
  const partners = [
    { id: 1, name: 'TechCorp', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=TechCorp' },
    { id: 2, name: 'InnovateLab', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=InnovateLab' },
    { id: 3, name: 'StartupHub', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=StartupHub' },
    { id: 4, name: 'VentureX', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=VentureX' },
    { id: 5, name: 'ScaleUp', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=ScaleUp' },
    { id: 6, name: 'FoundersClub', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=FoundersClub' },
    { id: 7, name: 'NextGen', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=NextGen' },
    { id: 8, name: 'Accelerate', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=Accelerate' },
    { id: 9, name: 'GrowthLabs', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=GrowthLabs' },
    { id: 10, name: 'FutureTech', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=FutureTech' },
    { id: 11, name: 'Pioneer', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=Pioneer' },
    { id: 12, name: 'Momentum', logo: 'https://via.placeholder.com/200x80/f3f4f6/6b7280?text=Momentum' },
  ]

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Leading <span className="text-incubez-red">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the growing ecosystem of innovative companies and investors who trust INCUBEZ
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-lg p-6 h-24 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-incubez-black to-incubez-red rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">50+</h3>
              <p className="text-white/80">Partner Companies</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">₹100Cr+</h3>
              <p className="text-white/80">Total Funding Raised</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">15+</h3>
              <p className="text-white/80">Industries Covered</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">95%</h3>
              <p className="text-white/80">Success Rate</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Want to become a partner and access top talent?
          </p>
          <button className="btn-primary">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Partners
