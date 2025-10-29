import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, Database, Mail, Video } from 'lucide-react'

const UploadProgressModal = ({ isOpen, currentStep, progress }) => {
  const steps = [
    { 
      id: 'uploading', 
      label: 'Uploading Video', 
      icon: Video,
      description: 'Uploading your video to cloud storage...'
    },
    { 
      id: 'saving', 
      label: 'Saving Data', 
      icon: Database,
      description: 'Saving your information securely...'
    },
    { 
      id: 'email', 
      label: 'Sending Confirmation', 
      icon: Mail,
      description: 'Preparing your confirmation email...'
    },
    { 
      id: 'complete', 
      label: 'Complete', 
      icon: CheckCircle,
      description: 'All done! Redirecting...'
    }
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-black to-red-600 p-6 text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                >
                  <Upload className="w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-bold text-center">Processing Your Submission</h3>
                <p className="text-white/80 text-center mt-2">Please wait while we process your application...</p>
              </div>

              {/* Progress Bar */}
              <div className="px-6 pt-6">
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                  />
                  {/* Animated shimmer effect */}
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2 font-medium">{Math.round(progress)}% Complete</p>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = currentStepIndex === index
                  const isCompleted = currentStepIndex > index
                  const isPending = currentStepIndex < index

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-red-50 border-2 border-red-500' 
                          : isCompleted 
                          ? 'bg-green-50 border-2 border-green-500' 
                          : 'bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive 
                          ? 'bg-red-500 text-white' 
                          : isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <StepIcon className="w-5 h-5" />
                          </motion.div>
                        )}
                        {isCompleted && <StepIcon className="w-5 h-5" />}
                        {isPending && <StepIcon className="w-5 h-5" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          isActive ? 'text-red-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex-shrink-0">
                        {isActive && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-3 border-red-500 border-t-transparent rounded-full"
                          />
                        )}
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                  <span>Processing securely...</span>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Please don't close this window
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UploadProgressModal

