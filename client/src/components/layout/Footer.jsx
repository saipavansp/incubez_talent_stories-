import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Pitches', path: '/pitches' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Refund Policy', path: '/refund' },
    ],
    resources: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact Us', path: '/contact' },
    ],
  }

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/incubez' },
    { name: 'Twitter', url: 'https://twitter.com/incubez' },
    { name: 'Instagram', url: 'https://instagram.com/incubez' },
    { name: 'YouTube', url: 'https://youtube.com/incubez' },
  ]

  return (
    <footer className="bg-incubez-black text-white">
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/incubez-logo.png" 
                  alt="INCUBEZ Logo" 
                  className="h-12 w-12 object-contain"
                  onError={(e) => { e.target.style.display = 'none' }} // Hide if logo not found
                />
                <h2 className="text-2xl font-bold">
                  <span className="text-white">INCUBEZ</span>
                  <span className="text-incubez-red"> Talent</span>
                </h2>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting startup founders with exceptional talent through video-based pitches. 
                Find your next co-founder, EIR, or key team member.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <EnvelopeIcon className="h-5 w-5" />
                  <a href="mailto:talent@incubez.com" className="hover:text-incubez-red transition-colors">
                    talent@incubez.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <PhoneIcon className="h-5 w-5" />
                  <a href="tel:+918522832623" className="hover:text-incubez-red transition-colors">
                    +91 85228 32623
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPinIcon className="h-5 w-5" />
                  <span>Hyderabad, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-incubez-red transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-incubez-red transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-incubez-red transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Webkraft Technologies. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-incubez-red transition-colors"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

