import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [applicationDetails, setApplicationDetails] = useState(null)

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Get application details from location state
    if (location.state) {
      setApplicationDetails(location.state)
    } else {
      // If no state, redirect to home
      navigate('/')
    }
  }, [location, navigate])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Application ID copied to clipboard!')
  }

  if (!applicationDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-incubez-red"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your submission has been received successfully.
          </p>
        </motion.div>

        {/* Application Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-lg p-6 mb-6"
        >
          <h2 className="font-semibold text-lg mb-4">Application Details</h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Application ID</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-mono font-semibold text-incubez-red">
                  {applicationDetails.applicationId || 'INC-2024-0001'}
                </p>
                <button
                  onClick={() => copyToClipboard(applicationDetails.applicationId || 'INC-2024-0001')}
                  className="text-gray-500 hover:text-incubez-red transition-colors"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="font-semibold">₹{applicationDetails.amount || '999'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Transaction ID</p>
              <p className="font-mono text-sm">{applicationDetails.transactionId || 'TXN123456789'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="text-sm">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-50 rounded-lg p-4 mb-6"
        >
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your submission within 24-48 hours</li>
            <li>• You'll receive an email confirmation shortly</li>
            <li>• Your video will be made available to relevant matches</li>
            <li>• Interested parties will contact you directly</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <Link
            to="/dashboard"
            className="block w-full btn-primary text-center"
          >
            View Your Submission
          </Link>
          
          <Link
            to="/"
            className="block w-full btn-outline text-center"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@incubez.com" className="text-incubez-red hover:underline">
              support@incubez.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PaymentSuccess
