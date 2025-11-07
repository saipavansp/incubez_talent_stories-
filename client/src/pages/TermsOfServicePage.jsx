import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

const TermsOfServicePage = () => {
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
            <DocumentTextIcon className="h-16 w-16 text-incubez-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="text-incubez-red">Service</span>
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
              <h2 className="text-2xl font-bold text-incubez-black mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to INCUBEZ Talent! These Terms of Service ("Terms") govern your access to and use of our website, platform, and services (collectively, the "Services") operated by Webkraft Technologies ("we," "us," or "our").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using the Services under applicable laws</li>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                By using our Services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            {/* Services Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">3. Description of Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                INCUBEZ Talent is a platform that connects startup founders with potential co-founders, Entrepreneurs in Residence (EIRs), and talented professionals. Our Services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Founder Pitches:</strong> Founders can submit video pitches to attract co-founders and talent</li>
                <li><strong>Talent Applications:</strong> Professionals can apply to join startups by submitting video applications</li>
                <li><strong>Matching Service:</strong> We facilitate connections between founders and talent based on their profiles and preferences</li>
                <li><strong>Profile Management:</strong> Users can create and manage their professional profiles</li>
                <li><strong>Communication Tools:</strong> We provide tools to facilitate communication between matched parties</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Please Note:</strong> INCUBEZ Talent is a platform that facilitates connections. We do not guarantee employment, partnerships, or any specific outcomes from using our Services.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">4. User Accounts and Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">4.1 Account Registration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">4.2 User Conduct</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Provide false, misleading, or inaccurate information</li>
                <li>Impersonate any person or entity</li>
                <li>Upload content that is offensive, defamatory, or violates any laws</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Scrape, copy, or download content without permission</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Upload viruses, malware, or any harmful code</li>
                <li>Use automated systems (bots, scripts) without authorization</li>
              </ul>
            </section>

            {/* Content and Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">5. Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">5.1 Your Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of all content you submit to our platform, including video pitches, applications, and profile information ("Your Content"). However, by submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Store, host, and display Your Content on our platform</li>
                <li>Share Your Content with potential matches and partner organizations</li>
                <li>Use Your Content for promotional purposes (with your consent)</li>
                <li>Modify or adapt Your Content for technical reasons (e.g., formatting, compression)</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">5.2 Our Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, features, and functionality of our Services, including but not limited to text, graphics, logos, designs, and software, are owned by Webkraft Technologies and protected by intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">5.3 Content Standards</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content you submit must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Be accurate and truthful</li>
                <li>Not infringe on any third-party rights</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Be professional and appropriate for a business platform</li>
                <li>Not contain confidential or proprietary information without authorization</li>
              </ul>
            </section>

            {/* Video Submissions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">6. Video Pitch and Application Guidelines</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When submitting video pitches or applications:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>File Size:</strong> Maximum video size is 250MB</li>
                <li><strong>Content Quality:</strong> Ensure good audio and video quality</li>
                <li><strong>Professionalism:</strong> Maintain a professional demeanor and appearance</li>
                <li><strong>Language:</strong> Use clear and appropriate language</li>
                <li><strong>Duration:</strong> Keep videos concise and relevant (recommended 2-5 minutes)</li>
                <li><strong>Ownership:</strong> You must own all rights to the video content</li>
                <li><strong>Privacy:</strong> Do not include sensitive personal information of others without consent</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to review, remove, or reject any video that violates these guidelines or our Terms.
              </p>
            </section>

            {/* Payment Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">7. Payment and Fees</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">7.1 Free Services</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Currently, INCUBEZ Talent offers certain services free of charge. However, we reserve the right to introduce fees or subscription plans in the future with reasonable notice.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">7.2 Promotional Codes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If we offer promotional codes or discounts:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>They are valid only for the specified period and conditions</li>
                <li>They cannot be combined with other offers unless stated</li>
                <li>They are non-transferable and have no cash value</li>
                <li>We reserve the right to modify or cancel promotions at any time</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">7.3 Future Premium Services</h3>
              <p className="text-gray-700 leading-relaxed">
                If we introduce paid services, you will be notified in advance. Payment terms, refund policies, and subscription details will be clearly communicated at that time.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of your personal information is governed by our <a href="/privacy" className="text-incubez-red hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our Services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">9. Third-Party Services and Links</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services may contain links to third-party websites or services (such as LinkedIn, Cloudflare, Google Sheets) that are not owned or controlled by us.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the content, privacy policies, or practices of third-party websites or services. You access them at your own risk and should review their terms and policies.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">10. Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">10.1 No Guarantee of Results</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                INCUBEZ Talent is a platform that facilitates connections. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Employment or partnership opportunities</li>
                <li>Successful matches or connections</li>
                <li>The quality, accuracy, or reliability of user-submitted content</li>
                <li>The conduct or intentions of other users</li>
                <li>Any specific outcomes from using our Services</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">10.2 "As Is" Basis</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Uninterrupted or error-free operation</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">10.3 User Verification</h3>
              <p className="text-gray-700 leading-relaxed">
                While we encourage users to provide accurate information, we do not verify the identity, credentials, or claims of users. You are responsible for conducting your own due diligence before engaging with other users.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by law, Webkraft Technologies and its affiliates, officers, directors, employees, and agents shall not be liable for any:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from user interactions or connections made through our platform</li>
                <li>Unauthorized access to or alteration of your content</li>
                <li>Statements or conduct of any third party on the Services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our total liability for any claims arising from your use of the Services shall not exceed the amount you paid us in the past 12 months, or ₹1,000 (one thousand Indian Rupees), whichever is greater.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">12. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Webkraft Technologies, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another user or third party</li>
                <li>Your Content and its use by us as permitted by these Terms</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">13. Termination</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">13.1 By You</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may terminate your account at any time by contacting us at <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a>. Upon termination, your profile and content may be removed from public view, but we may retain copies for legal and backup purposes.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">13.2 By Us</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account and access to our Services at any time, with or without notice, if:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>You violate these Terms or our policies</li>
                <li>Your conduct is harmful to other users or our business</li>
                <li>We are required to do so by law</li>
                <li>We discontinue the Services or materially modify them</li>
              </ul>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">13.3 Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the Services will immediately cease. Sections of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">14. Dispute Resolution and Governing Law</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">14.1 Governing Law</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">14.2 Jurisdiction</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, India.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">14.3 Informal Resolution</h3>
              <p className="text-gray-700 leading-relaxed">
                Before filing any formal legal proceedings, we encourage you to contact us at <a href="mailto:info@incubez.com" className="text-incubez-red hover:underline">info@incubez.com</a> to attempt to resolve the dispute informally.
              </p>
            </section>

            {/* General Provisions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">15. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-incubez-black mb-3">15.1 Entire Agreement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Webkraft Technologies regarding the Services.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">15.2 Severability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">15.3 Waiver</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">15.4 Assignment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not assign or transfer these Terms or your account to any third party without our prior written consent. We may assign our rights and obligations under these Terms without restriction.
              </p>

              <h3 className="text-xl font-semibold text-incubez-black mb-3">15.5 Force Majeure</h3>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of government, or technical failures.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-incubez-black mb-4">16. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or feedback about these Terms, please contact us:
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
              <h2 className="text-2xl font-bold text-incubez-black mb-4">17. Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using INCUBEZ Talent, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
            Questions about our Terms of Service?
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

export default TermsOfServicePage

