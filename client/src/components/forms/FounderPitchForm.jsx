import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import StepIndicator from '../common/StepIndicator'
import VideoUploader from './VideoUploader'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const FounderPitchForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [formData, setFormData] = useState({})
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [finalAmount, setFinalAmount] = useState(999)
  
  const { register, handleSubmit, control, watch, formState: { errors }, trigger } = useForm({
    mode: 'onChange'
  })

  const steps = [
    { id: 1, title: 'Startup Information' },
    { id: 2, title: 'Founder Details' },
    { id: 3, title: 'Position Details' },
    { id: 4, title: 'Video Pitch' },
    { id: 5, title: 'Review & Submit' }
  ]

  const industries = [
    'HealthTech', 'FinTech', 'EdTech', 'E-commerce', 'SaaS',
    'AI/ML', 'IoT', 'CleanTech', 'AgriTech', 'FoodTech',
    'Logistics', 'Gaming', 'Social Media', 'Other'
  ]

  const startupStages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP/Prototype' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'scale', label: 'Scaling' }
  ]

  const roleTypes = [
    { value: 'cofounder', label: 'Co-founder' },
    { value: 'eir', label: 'Entrepreneur in Residence (EIR)' },
    { value: 'foundersoffice', label: "Founder's Office" }
  ]

  const compensationTypes = [
    { value: 'equity', label: 'Equity Only' },
    { value: 'equity_salary', label: 'Equity + Salary' },
    { value: 'internship', label: 'Internship' }
  ]

  // Save form data to localStorage on change
  useEffect(() => {
    const savedData = localStorage.getItem('founderPitchFormData')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFormData(parsed)
    }
  }, [])

  const saveFormData = (data) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData)
    localStorage.setItem('founderPitchFormData', JSON.stringify(updatedData))
  }

  const validateStep = async () => {
    let fieldsToValidate = []
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['startupName', 'domain', 'stage', 'description']
        break
      case 2:
        fieldsToValidate = ['founderName', 'email', 'phone', 'linkedinUrl']
        break
      case 3:
        fieldsToValidate = ['jobTitle', 'roleType', 'roleDescription', 'keyResponsibilities', 'requiredSkills', 'experienceLevel', 'locationPreference', 'compensationType']
        break
      case 4:
        if (!videoFile) {
          toast.error('Please upload a video pitch')
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
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
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
      setFinalAmount(999)
      toast.error('Invalid coupon code')
    }
  }

  const onSubmit = async (data) => {
    try {
      // Check if coupon is applied
      if (!couponApplied) {
        toast.error('Please apply a valid coupon code to continue')
        return
      }

      setIsSubmitting(true)
      
      // TODO: When Google Drive & Sheets integration is ready:
      // 1. Upload video to Google Drive
      // 2. Save form data + video link to Google Sheets
      // 3. Send confirmation email
      
      // For now, simulate submission
      const applicationId = `INC-FND-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`
      
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear saved form data
      localStorage.removeItem('founderPitchFormData')
      
      // Show success message
      toast.success('Pitch submitted successfully!')
      
      // Redirect to success page
      navigate('/payment/success', { 
        state: { 
          applicationId: applicationId,
          amount: finalAmount,
          transactionId: `TXN${Date.now()}`,
          type: 'founder',
          couponApplied: couponApplied
        }
      })

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
      const response = await axios.post(`${API_URL}/api/founders/pitch`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        localStorage.removeItem('founderPitchFormData')
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
      toast.error(error.response?.data?.message || 'Failed to submit pitch. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Tell us about your startup</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Startup Name *</label>
              <input
                {...register('startupName', { required: 'Startup name is required' })}
                className="input-field"
                placeholder="Enter your startup name"
                defaultValue={formData.startupName}
              />
              {errors.startupName && <p className="text-red-500 text-sm mt-1">{errors.startupName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Logo Upload (Optional)</label>
              <input
                type="file"
                accept="image/*"
                {...register('logo')}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Domain/Industry *</label>
              <select
                {...register('domain', { required: 'Please select a domain' })}
                className="input-field"
                defaultValue={formData.domain}
              >
                <option value="">Select Domain</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Startup Stage *</label>
              <select
                {...register('stage', { required: 'Please select startup stage' })}
                className="input-field"
                defaultValue={formData.stage}
              >
                <option value="">Select Stage</option>
                {startupStages.map(stage => (
                  <option key={stage.value} value={stage.value}>{stage.label}</option>
                ))}
              </select>
              {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Website (Optional)</label>
              <input
                {...register('website', { 
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: 'Please enter a valid URL'
                  }
                })}
                className="input-field"
                placeholder="https://www.example.com"
                defaultValue={formData.website}
              />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Brief Description *</label>
              <textarea
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 50, message: 'Description must be at least 50 characters' }
                })}
                className="input-field h-32"
                placeholder="Briefly describe your startup and its mission..."
                defaultValue={formData.description}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Founder Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Founder Name *</label>
              <input
                {...register('founderName', { required: 'Founder name is required' })}
                className="input-field"
                placeholder="Your full name"
                defaultValue={formData.founderName}
              />
              {errors.founderName && <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>}
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
              <label className="block text-sm font-medium mb-2">Co-founder Details (Optional)</label>
              <textarea
                {...register('cofounderDetails')}
                className="input-field h-24"
                placeholder="If you have co-founders, please provide their names and roles"
                defaultValue={formData.cofounderDetails}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Position Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                {...register('jobTitle', { required: 'Job title is required' })}
                className="input-field"
                placeholder="e.g., Co-founder & CTO"
                defaultValue={formData.jobTitle}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role Type *</label>
              <select
                {...register('roleType', { required: 'Please select role type' })}
                className="input-field"
                defaultValue={formData.roleType}
              >
                <option value="">Select Role Type</option>
                {roleTypes.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
              {errors.roleType && <p className="text-red-500 text-sm mt-1">{errors.roleType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Department/Function</label>
              <input
                {...register('department')}
                className="input-field"
                placeholder="e.g., Technology, Product, Marketing"
                defaultValue={formData.department}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role Description *</label>
              <textarea
                {...register('roleDescription', { 
                  required: 'Role description is required',
                  minLength: { value: 100, message: 'Description must be at least 100 characters' }
                })}
                className="input-field h-32"
                placeholder="Describe the role and what you're looking for..."
                defaultValue={formData.roleDescription}
              />
              {errors.roleDescription && <p className="text-red-500 text-sm mt-1">{errors.roleDescription.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Key Responsibilities *</label>
              <textarea
                {...register('keyResponsibilities', { required: 'Key responsibilities are required' })}
                className="input-field h-24"
                placeholder="List the main responsibilities (one per line)"
                defaultValue={formData.keyResponsibilities}
              />
              {errors.keyResponsibilities && <p className="text-red-500 text-sm mt-1">{errors.keyResponsibilities.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Required Skills *</label>
              <input
                {...register('requiredSkills', { required: 'Required skills are required' })}
                className="input-field"
                placeholder="e.g., React, Node.js, Leadership (comma separated)"
                defaultValue={formData.requiredSkills}
              />
              {errors.requiredSkills && <p className="text-red-500 text-sm mt-1">{errors.requiredSkills.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Experience Level *</label>
              <select
                {...register('experienceLevel', { required: 'Please select experience level' })}
                className="input-field"
                defaultValue={formData.experienceLevel}
              >
                <option value="">Select Experience Level</option>
                <option value="0-2">0-2 years</option>
                <option value="2-5">2-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>}
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
              </select>
              {errors.locationPreference && <p className="text-red-500 text-sm mt-1">{errors.locationPreference.message}</p>}
            </div>

            {watch('locationPreference') !== 'remote' && (
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  {...register('city')}
                  className="input-field"
                  placeholder="e.g., Bangalore, Mumbai"
                  defaultValue={formData.city}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Compensation Type *</label>
              <select
                {...register('compensationType', { required: 'Please select compensation type' })}
                className="input-field"
                defaultValue={formData.compensationType}
              >
                <option value="">Select Compensation Type</option>
                {compensationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.compensationType && <p className="text-red-500 text-sm mt-1">{errors.compensationType.message}</p>}
            </div>

            {watch('compensationType') === 'equity_salary' && (
              <div>
                <label className="block text-sm font-medium mb-2">Salary Range</label>
                <input
                  {...register('salaryRange')}
                  className="input-field"
                  placeholder="e.g., 10-15 LPA"
                  defaultValue={formData.salaryRange}
                />
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Upload Your Video Pitch</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-3">Video Requirements:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Duration: 1-4 minutes
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
              <h4 className="font-semibold mb-3">What to cover in your pitch:</h4>
              <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                <li>Brief introduction about yourself and your startup</li>
                <li>Problem you're solving and your solution</li>
                <li>Current traction and future vision</li>
                <li>Why this role is crucial for your startup</li>
                <li>What kind of person would thrive in this role</li>
                <li>Why someone should join your journey</li>
              </ol>
            </div>

            <VideoUploader
              onVideoSelect={(file) => setVideoFile(file)}
              existingVideo={videoFile}
              maxSize={500 * 1024 * 1024} // 500MB
              acceptedFormats={['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']}
            />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Review Your Submission</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">Startup Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{watch('startupName')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Domain:</span>
                    <p className="font-medium">{watch('domain')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Stage:</span>
                    <p className="font-medium">{watch('stage')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Website:</span>
                    <p className="font-medium">{watch('website') || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Founder Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{watch('founderName')}</p>
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
                    <span className="text-gray-600">LinkedIn:</span>
                    <p className="font-medium truncate">{watch('linkedinUrl')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Position Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Job Title:</span>
                    <p className="font-medium">{watch('jobTitle')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Role Type:</span>
                    <p className="font-medium">{watch('roleType')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience Level:</span>
                    <p className="font-medium">{watch('experienceLevel')} years</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium">{watch('locationPreference')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Compensation:</span>
                    <p className="font-medium">{watch('compensationType')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Video Pitch</h4>
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
                <span className="text-2xl font-bold text-gray-900">₹999</span>
              </div>

              {couponApplied && (
                <div className="flex items-center justify-between mb-4 text-green-600">
                  <span>Discount (Coupon Applied):</span>
                  <span className="text-xl font-bold">-₹999</span>
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your video and details will be saved to our system after submission.
              </p>
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
            Post Your <span className="text-incubez-red">Job Pitch</span>
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
    </div>
  )
}

export default FounderPitchForm
