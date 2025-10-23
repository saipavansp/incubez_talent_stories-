import React from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const isInactive = stepNumber > currentStep

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive ? 'bg-incubez-red text-white shadow-lg' : ''}
                    ${isInactive ? 'bg-gray-300 text-gray-600' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <span className="text-sm md:text-base">{stepNumber}</span>
                  )}
                </motion.div>
                <span className={`
                  mt-2 text-xs md:text-sm font-medium text-center max-w-[80px] md:max-w-[100px]
                  ${isActive ? 'text-incubez-red' : 'text-gray-600'}
                `}>
                  {step.title}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: isCompleted ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator
