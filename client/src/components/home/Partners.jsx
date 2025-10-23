import React from 'react'
import { motion } from 'framer-motion'

const Partners = () => {
  const partners = [
    { id: 1, name: 'The August Fest', logo: '/images/partners/the-august-fest.png', fallback: 'The August Fest' },
    { id: 2, name: 'TiE Hyderabad', logo: '/images/partners/tie-hyderabad.png', fallback: 'TiE Hyderabad' },
    { id: 3, name: 'TiE50', logo: '/images/partners/tie50.png', fallback: 'TiE50' },
    { id: 4, name: 'Enrission India Capital', logo: '/images/partners/enrission-india-capital.png', fallback: 'Enrission India Capital' },
    { id: 5, name: 'T-Hub', logo: '/images/partners/t-hub.png', fallback: 'T-Hub' },
    { id: 6, name: 'WE Hub', logo: '/images/partners/we-hub.png', fallback: 'WE Hub' },
    { id: 7, name: 'AIC BIMTECH', logo: '/images/partners/aic-bimtech.png', fallback: 'AIC BIMTECH' },
    { id: 8, name: 'Draper Startup House', logo: '/images/partners/draper-startup-house.png', fallback: 'Draper Startup House' },
    { id: 9, name: 'AIRA', logo: '/images/partners/aira.png', fallback: 'AIRA' },
    { id: 10, name: 'CoKarma', logo: '/images/partners/cokarma.png', fallback: 'CoKarma' },
    { id: 11, name: 'Early Seed Ventures', logo: '/images/partners/early-seed-ventures.png', fallback: 'Early Seed Ventures' },
    { id: 12, name: 'Venture Wolf', logo: '/images/partners/venture-wolf.png', fallback: 'Venture Wolf' },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 max-w-6xl mx-auto items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `<span class="text-gray-600 text-sm font-semibold text-center">${partner.fallback}</span>`
                }}
              />
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
              <h3 className="text-3xl md:text-4xl font-bold mb-2">12+</h3>
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
