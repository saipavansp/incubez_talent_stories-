import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="section-padding py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <ShieldCheckIcon className="h-16 w-16 text-incubez-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="text-incubez-red">Policy</span>
          </h1>
          <p className="text-gray-600 text-lg">Last Updated: November 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to INCUBEZ Talent ("we," "our," or "us"). We are operated by Webkraft Technologies and are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.incubez.in" className="text-incubez-red hover:underline">www.incubez.in</a> and use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our platform, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Register as a founder or talent seeker on our platform</li>
                <li>Submit a video pitch or application</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our newsletter or updates</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                <li><strong>Professional Information:</strong> LinkedIn profile URL, company name, startup details, role, experience</li>
                <li><strong>Application Details:</strong> Skills, educational background, portfolio links, resume/CV</li>
                <li><strong>Video Content:</strong> Video pitches and introductions you upload</li>
                <li><strong>Location Information:</strong> City, state, country, and relocation preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website or source</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect or receive to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Facilitate Connections:</strong> Match founders with potential co-founders, EIRs, and talent</li>
                <li><strong>Process Applications:</strong> Review and manage video pitches and talent applications</li>
                <li><strong>Communicate:</strong> Send you confirmations, updates, and notifications about your applications</li>
                <li><strong>Improve Services:</strong> Analyze usage patterns to enhance our platform and user experience</li>
                <li><strong>Marketing:</strong> Send you newsletters, promotions, and relevant opportunities (with your consent)</li>
                <li><strong>Compliance:</strong> Comply with legal obligations and protect our rights</li>
                <li><strong>Storage:</strong> Store your video pitches and application materials securely in cloud storage (Cloudflare R2)</li>
                <li><strong>Data Management:</strong> Organize submissions in spreadsheets (Google Sheets) for review and matching</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>With Potential Matches:</strong> We share your profile and video pitch with relevant founders or talent seekers who may be interested in connecting with you</li>
                <li><strong>With Partner Organizations:</strong> We may share information with our partner companies, incubators, and accelerators to facilitate opportunities</li>
                <li><strong>Service Providers:</strong> We use third-party service providers (Cloudflare R2, Google Sheets, Render) to help operate our platform</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Note:</strong> We will never sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            {/* Data Storage and Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">5. Data Storage and Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Video Storage:</strong> Videos are stored securely in Cloudflare R2 with access controls</li>
                <li><strong>Data Encryption:</strong> We use HTTPS encryption for data transmission</li>
                <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
                <li><strong>Regular Backups:</strong> We maintain regular backups of data to prevent loss</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Provide our services and fulfill the purposes outlined in this Privacy Policy</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Maintain your profile active on our platform until you request deletion</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may request deletion of your account and personal information at any time by contacting us at <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a>.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where consent was the legal basis</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise any of these rights, please contact us at <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a> or call us at <a href="tel:+919177999368" className="text-incubez-red hover:underline">+91 91779 99368</a>.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve our services and user experience</li>
                <li>Analyze website traffic and performance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect your ability to use certain features of our website.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">9. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Cloudflare R2:</strong> Video storage and content delivery</li>
                <li><strong>Google Sheets:</strong> Application data management</li>
                <li><strong>Render:</strong> Website hosting and backend services</li>
                <li><strong>LinkedIn:</strong> Profile verification and professional information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These third-party services have their own privacy policies. We encourage you to review their policies.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately at <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a>, and we will take steps to delete such information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">12. International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are operated from India. If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed in India. By using our services, you consent to this transfer and processing.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 font-semibold mb-2">Webkraft Technologies (INCUBEZ Talent)</p>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a> or <a href="mailto:talent@incubez.com" className="text-incubez-red hover:underline">talent@incubez.com</a>
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> <a href="tel:+919177999368" className="text-incubez-red hover:underline">+91 91779 99368</a> or <a href="tel:+918522832623" className="text-incubez-red hover:underline">+91 85228 32623</a>
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> Hyderabad, India
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong> <a href="https://www.incubez.in" className="text-incubez-red hover:underline">www.incubez.in</a>
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">14. Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>

          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Have questions about our privacy practices?
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage

