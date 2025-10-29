import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import StepIndicator from '../common/StepIndicator'
import VideoUploader from './VideoUploader'
import UploadProgressModal from '../common/UploadProgressModal'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SeekerApplicationForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  
  // Upload progress states
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [uploadStep, setUploadStep] = useState('uploading')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({})
  const [couponCode, setCouponCode] = useState('FNDRMET') // Auto-filled coupon
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [finalAmount, setFinalAmount] = useState(499)
  
  const { register, handleSubmit, control, watch, formState: { errors }, trigger, setValue } = useForm({
    mode: 'onChange'
  })

  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Professional Background' },
    { id: 3, title: 'Preferences' },
    { id: 4, title: 'Video Application' },
    { id: 5, title: 'Review & Submit' }
  ]

  const domains = [
    'HealthTech', 'FinTech', 'EdTech', 'E-commerce', 'SaaS',
    'AI/ML', 'IoT', 'CleanTech', 'AgriTech', 'FoodTech',
    'Logistics', 'Gaming', 'Social Media', 'Other'
  ]

  const startupStages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP/Prototype' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'any', label: 'Any Stage' }
  ]

  const roleTypes = [
    { value: 'cofounder', label: 'Co-founder' },
    { value: 'eir', label: 'Entrepreneur in Residence (EIR)' },
    { value: 'foundersoffice', label: "Founder's Office" }
  ]

  const availabilityOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: '1month', label: 'Within 1 month' },
    { value: '2months', label: 'Within 2 months' },
    { value: '3months', label: 'Within 3 months' },
    { value: 'flexible', label: 'Flexible' }
  ]

  // Save form data to localStorage on change
  useEffect(() => {
    const savedData = localStorage.getItem('seekerApplicationFormData')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFormData(parsed)
    }
  }, [])

  const saveFormData = (data) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData)
    localStorage.setItem('seekerApplicationFormData', JSON.stringify(updatedData))
  }

  const validateStep = async () => {
    let fieldsToValidate = []
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'email', 'phone', 'linkedinUrl', 'currentLocation', 'willingToRelocate']
        break
      case 2:
        fieldsToValidate = ['currentRole', 'yearsOfExperience', 'education', 'keySkills', 'domainExpertise', 'startupExperience']
        break
      case 3:
        fieldsToValidate = ['preferredRoleType', 'preferredStartupStage', 'industryPreferences', 'locationPreference', 'availability']
        break
      case 4:
        if (!videoFile) {
          toast.error('Please upload your video application')
          return false
        }
        return true
      default:
        return true
    }

    const isValid = await trigger(fieldsToValidate)
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    if (isValid) {
      const stepData = watch()
      saveFormData(stepData)
      setCurrentStep(currentStep + 1)
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FNDRMET') {
      setCouponApplied(true)
      setCouponError('')
      setFinalAmount(0) // Free with coupon
      toast.success('Coupon applied successfully! Amount: ₹0')
    } else {
      setCouponApplied(false)
      setCouponError('Invalid coupon code')
      setFinalAmount(499)
      toast.error('Invalid coupon code')
    }
  }

  const onSubmit = async (data, retryCount = 0) => {
    const maxRetries = 2
    
    try {
      // Check if coupon is applied
      if (!couponApplied) {
        toast.error('Please apply a valid coupon code to continue')
        return
      }

      setIsSubmitting(true)
      setShowProgressModal(true)
      setUploadStep('uploading')
      setUploadProgress(0)
      
      // Prepare form data for submission
      const formDataToSubmit = new FormData()
      
      // Add all form fields
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          formDataToSubmit.append(key, JSON.stringify(data[key]))
        } else if (data[key] !== undefined && data[key] !== null) {
          formDataToSubmit.append(key, data[key])
        }
      })
      
      // Add video file
      if (videoFile) {
        formDataToSubmit.append('video', videoFile)
      }

      // Add payment details
      formDataToSubmit.append('couponCode', couponCode)
      formDataToSubmit.append('amountPaid', finalAmount)

      // Submit to API with progress tracking
      const response = await axios.post(`${API_URL}/api/seekers/application`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 300000, // 5 minutes for large video uploads
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
          
          // Update step based on progress
          if (percentCompleted < 90) {
            setUploadStep('uploading')
          } else if (percentCompleted >= 90) {
            setUploadStep('saving')
          }
        }
      })

      // Progress: Saving data
      setUploadStep('saving')
      setUploadProgress(95)
      
      await new Promise(resolve => setTimeout(resolve, 500)) // Small delay for UX

      if (response.data.success) {
        // Progress: Complete
        setUploadStep('complete')
        setUploadProgress(100)
        
        await new Promise(resolve => setTimeout(resolve, 1000)) // Show completion
        
        // Clear ALL form data and state
        localStorage.removeItem('seekerApplicationFormData')
        setFormData({})
        setVideoFile(null)
        setCouponCode('FNDRMET')
        setCouponApplied(false)
        setFinalAmount(499)
        setCurrentStep(1)
        
        // Show success message
        toast.success('Application submitted successfully!')
        
        // Redirect to success page
        navigate('/payment/success', { 
          state: { 
            applicationId: response.data.applicationId,
            amount: 0, // Reset to 0 for invoice page
            transactionId: `TXN${Date.now()}`,
            type: 'seeker',
            couponApplied: couponApplied,
            videoDriveLink: response.data.videoDriveLink
          }
        })
      }

      /* UNCOMMENT THIS WHEN PAYMENT IS READY
      // Prepare form data for submission
      const formDataToSubmit = new FormData()
      
      // Add all form fields
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          formDataToSubmit.append(key, JSON.stringify(data[key]))
        } else {
          formDataToSubmit.append(key, data[key])
        }
      })
      
      // Add video file
      if (videoFile) {
        formDataToSubmit.append('video', videoFile)
      }

      // Submit to API
      const response = await axios.post(`${API_URL}/api/seekers/application`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        localStorage.removeItem('seekerApplicationFormData')
        navigate('/payment', { 
          state: { 
            orderId: response.data.orderId,
            amount: response.data.amount,
            applicationId: response.data.applicationId
          }
        })
      }
      */
    } catch (error) {
      console.error('Submission error:', error)
      
      // Retry logic for network errors and 502/503/504 errors
      const shouldRetry = (
        (error.code === 'ERR_NETWORK' || 
         error.response?.status === 502 || 
         error.response?.status === 503 || 
         error.response?.status === 504) && 
        retryCount < maxRetries
      )
      
      if (shouldRetry) {
        console.log(`Retrying submission... Attempt ${retryCount + 1}/${maxRetries}`)
        setShowProgressModal(false)
        setIsSubmitting(false)
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 2000))
        
        toast('Retrying submission...', {
          icon: '🔄',
          duration: 2000
        })
        
        // Retry the submission
        return onSubmit(data, retryCount + 1)
      }
      
      // Close progress modal
      setShowProgressModal(false)
      
      // Handle specific error types
      if (error.response?.data?.message) {
        // Show server error message
        toast.error(error.response.data.message, {
          duration: 6000,
          style: {
            maxWidth: '500px',
          }
        })
        
        // Show additional details if available
        if (error.response.data.details) {
          setTimeout(() => {
            toast(error.response.data.details, {
              duration: 5000,
              icon: '💡',
            })
          }, 500)
        }
        
        // Show tip if available
        if (error.response.data.tip) {
          setTimeout(() => {
            toast(error.response.data.tip, {
              duration: 5000,
              icon: '🎬',
            })
          }, 1000)
        }
      } else if (error.code === 'ERR_NETWORK' || error.response?.status === 502) {
        toast.error('Server is busy or network error. Please try again in a moment.', {
          duration: 7000,
        })
        toast('💡 Tip: If the issue persists, try refreshing the page.', {
          duration: 5000,
        })
      } else {
        toast.error('Failed to submit application. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className="input-field"
                placeholder="Enter your full name"
                defaultValue={formData.fullName}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input-field"
                placeholder="your@email.com"
                defaultValue={formData.email}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                className="input-field"
                placeholder="9876543210"
                defaultValue={formData.phone}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL *</label>
              <input
                {...register('linkedinUrl', { 
                  required: 'LinkedIn URL is required',
                  pattern: {
                    value: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                    message: 'Please enter a valid LinkedIn profile URL'
                  }
                })}
                className="input-field"
                placeholder="https://www.linkedin.com/in/yourprofile"
                defaultValue={formData.linkedinUrl}
              />
              {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Portfolio/Website (Optional)</label>
              <input
                {...register('portfolio', { 
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: 'Please enter a valid URL'
                  }
                })}
                className="input-field"
                placeholder="https://www.yourportfolio.com"
                defaultValue={formData.portfolio}
              />
              {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Location *</label>
              <input
                {...register('currentLocation', { required: 'Current location is required' })}
                className="input-field"
                placeholder="e.g., Bangalore, India"
                defaultValue={formData.currentLocation}
              />
              {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Willing to Relocate? *</label>
              <select
                {...register('willingToRelocate', { required: 'Please select an option' })}
                className="input-field"
                defaultValue={formData.willingToRelocate}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="depends">Depends on Opportunity</option>
              </select>
              {errors.willingToRelocate && <p className="text-red-500 text-sm mt-1">{errors.willingToRelocate.message}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Professional Background</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Current Role/Title *</label>
              <input
                {...register('currentRole', { required: 'Current role is required' })}
                className="input-field"
                placeholder="e.g., Senior Software Engineer"
                defaultValue={formData.currentRole}
              />
              {errors.currentRole && <p className="text-red-500 text-sm mt-1">{errors.currentRole.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience *</label>
              <select
                {...register('yearsOfExperience', { required: 'Please select experience level' })}
                className="input-field"
                defaultValue={formData.yearsOfExperience}
              >
                <option value="">Select Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="2-5">2-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15+">15+ years</option>
              </select>
              {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Educational Background *</label>
              <textarea
                {...register('education', { required: 'Education details are required' })}
                className="input-field h-24"
                placeholder="e.g., B.Tech in Computer Science from IIT Delhi, MBA from ISB"
                defaultValue={formData.education}
              />
              {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Key Skills *</label>
              <input
                {...register('keySkills', { required: 'Key skills are required' })}
                className="input-field"
                placeholder="e.g., Product Management, Python, Leadership (comma separated)"
                defaultValue={formData.keySkills}
              />
              {errors.keySkills && <p className="text-red-500 text-sm mt-1">{errors.keySkills.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Domain Expertise * (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {domains.map((domain) => (
                  <label key={domain} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={domain}
                      {...register('domainExpertise', { required: 'Please select at least one domain' })}
                      className="rounded border-gray-300 text-incubez-red focus:ring-incubez-red"
                    />
                    <span className="text-sm">{domain}</span>
                  </label>
                ))}
              </div>
              {errors.domainExpertise && <p className="text-red-500 text-sm mt-1">{errors.domainExpertise.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Previous Startup Experience? *</label>
              <select
                {...register('startupExperience', { required: 'Please select an option' })}
                className="input-field"
                defaultValue={formData.startupExperience}
                onChange={(e) => {
                  setValue('startupExperience', e.target.value)
                }}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.startupExperience && <p className="text-red-500 text-sm mt-1">{errors.startupExperience.message}</p>}
            </div>

            {watch('startupExperience') === 'yes' && (
              <div>
                <label className="block text-sm font-medium mb-2">Startup Experience Details</label>
                <textarea
                  {...register('startupExperienceDetails')}
                  className="input-field h-24"
                  placeholder="Brief details about your startup experience..."
                  defaultValue={formData.startupExperienceDetails}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Notable Achievements</label>
              <textarea
                {...register('achievements')}
                className="input-field h-24"
                placeholder="Your key achievements, awards, or recognitions..."
                defaultValue={formData.achievements}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Your Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Role Type * (Select all that apply)</label>
              <div className="space-y-2">
                {roleTypes.map((role) => (
                  <label key={role.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={role.value}
                      {...register('preferredRoleType', { required: 'Please select at least one role type' })}
                      className="rounded border-gray-300 text-incubez-red focus:ring-incubez-red"
                    />
                    <span className="text-sm">{role.label}</span>
                  </label>
                ))}
              </div>
              {errors.preferredRoleType && <p className="text-red-500 text-sm mt-1">{errors.preferredRoleType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Startup Stage * (Select all that apply)</label>
              <div className="space-y-2">
                {startupStages.map((stage) => (
                  <label key={stage.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={stage.value}
                      {...register('preferredStartupStage', { required: 'Please select at least one stage' })}
                      className="rounded border-gray-300 text-incubez-red focus:ring-incubez-red"
                    />
                    <span className="text-sm">{stage.label}</span>
                  </label>
                ))}
              </div>
              {errors.preferredStartupStage && <p className="text-red-500 text-sm mt-1">{errors.preferredStartupStage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Industry Preferences * (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {domains.map((domain) => (
                  <label key={domain} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={domain}
                      {...register('industryPreferences', { required: 'Please select at least one industry' })}
                      className="rounded border-gray-300 text-incubez-red focus:ring-incubez-red"
                    />
                    <span className="text-sm">{domain}</span>
                  </label>
                ))}
              </div>
              {errors.industryPreferences && <p className="text-red-500 text-sm mt-1">{errors.industryPreferences.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location Preference *</label>
              <select
                {...register('locationPreference', { required: 'Please select location preference' })}
                className="input-field"
                defaultValue={formData.locationPreference}
              >
                <option value="">Select Preference</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.locationPreference && <p className="text-red-500 text-sm mt-1">{errors.locationPreference.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Availability *</label>
              <select
                {...register('availability', { required: 'Please select availability' })}
                className="input-field"
                defaultValue={formData.availability}
              >
                <option value="">Select Availability</option>
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compensation Expectations</label>
              <textarea
                {...register('compensationExpectations')}
                className="input-field h-24"
                placeholder="Your expectations regarding equity, salary, or other compensation..."
                defaultValue={formData.compensationExpectations}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Video Application</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-3">Video Requirements:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Duration: 2-5 minutes
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Maximum file size: 500MB
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Format: MP4, MOV, AVI, or WebM
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Clear audio and good lighting
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-3">Video Prompt Questions:</h4>
              <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                <li>
                  <strong>Who am I?</strong>
                  <p className="ml-6 mt-1 text-gray-600">Introduce yourself - your background, passion, and what drives you</p>
                </li>
                <li>
                  <strong>What am I good at?</strong>
                  <p className="ml-6 mt-1 text-gray-600">Highlight your key skills, expertise, and unique strengths</p>
                </li>
                <li>
                  <strong>What kind of startup am I looking for?</strong>
                  <p className="ml-6 mt-1 text-gray-600">Describe your ideal startup - stage, culture, mission</p>
                </li>
                <li>
                  <strong>Why should a founder choose me?</strong>
                  <p className="ml-6 mt-1 text-gray-600">What value will you bring? Why are you the perfect fit?</p>
                </li>
              </ol>
            </div>

            <VideoUploader
              onVideoSelect={(file) => setVideoFile(file)}
              existingVideo={videoFile}
              maxSize={250 * 1024 * 1024} // 250MB
              acceptedFormats={['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']}
            />
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Maximum video size is 250MB. For best results, keep your video 5-8 minutes at 720p or 1080p quality.
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Review Your Application</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{watch('fullName')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{watch('email')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">{watch('phone')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium">{watch('currentLocation')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">LinkedIn:</span>
                    <p className="font-medium truncate">{watch('linkedinUrl')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Willing to Relocate:</span>
                    <p className="font-medium">{watch('willingToRelocate')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Professional Background</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Role:</span>
                    <p className="font-medium">{watch('currentRole')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <p className="font-medium">{watch('yearsOfExperience')} years</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Key Skills:</span>
                    <p className="font-medium">{watch('keySkills')}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Domain Expertise:</span>
                    <p className="font-medium">{watch('domainExpertise')?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Startup Experience:</span>
                    <p className="font-medium">{watch('startupExperience')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Preferences</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Preferred Roles:</span>
                    <p className="font-medium">{watch('preferredRoleType')?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Startup Stage:</span>
                    <p className="font-medium">{watch('preferredStartupStage')?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location Preference:</span>
                    <p className="font-medium">{watch('locationPreference')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Availability:</span>
                    <p className="font-medium">{watch('availability')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Video Application</h4>
                <p className="text-sm text-gray-600">
                  {videoFile ? `Video uploaded: ${videoFile.name}` : 'No video uploaded'}
                </p>
              </div>
            </div>

            {/* Pricing & Coupon Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-4">Payment Details</h4>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Original Amount:</span>
                <span className="text-2xl font-bold text-gray-900">₹499</span>
              </div>

              {couponApplied && (
                <div className="flex items-center justify-between mb-4 text-green-600">
                  <span>Discount (Coupon Applied):</span>
                  <span className="text-xl font-bold">-₹499</span>
                </div>
              )}

              <div className="border-t-2 border-gray-300 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Final Amount:</span>
                  <span className="text-3xl font-bold text-incubez-red">
                    ₹{finalAmount}
                  </span>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Have a Coupon Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    disabled={couponApplied}
                    className={`input-field flex-1 ${couponApplied ? 'bg-green-50 border-green-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      couponApplied 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : 'bg-incubez-red text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {couponApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
                {couponApplied && (
                  <p className="text-green-600 text-sm font-medium">
                    ✓ Coupon "FNDRMET" applied successfully!
                  </p>
                )}
              </div>
            </div>


            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                {...register('termsAccepted', { required: 'You must accept the terms and conditions' })}
                className="mt-1 mr-2"
              />
              <label className="text-sm text-gray-700">
                I agree to the <a href="/terms" className="text-incubez-red hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-incubez-red hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
            Submit Your <span className="text-incubez-red">Application</span>
          </h1>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-outline"
                >
                  Previous
                </button>
              )}
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !couponApplied}
                  className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : couponApplied ? 'Submit Application' : 'Apply Coupon First'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Upload Progress Modal */}
      <UploadProgressModal 
        isOpen={showProgressModal}
        currentStep={uploadStep}
        progress={uploadProgress}
      />
    </div>
  )
}

export default SeekerApplicationForm
