import { v4 as uuidv4 } from 'uuid'
import { uploadVideoToDrive, generateVideoFileName } from '../services/googleDriveService.js'
import { saveSeekerApplication } from '../services/googleSheetsService.js'
import { sendConfirmationEmail, sendAdminNotification } from '../services/emailService.js'

// Mock database for tracking (optional if using Sheets)
const applications = []

export const submitApplication = async (req, res) => {
  try {
    const applicationData = req.body
    const videoFile = req.file

    console.log('📝 Seeker application submission received...')

    // Generate unique application ID
    const applicationId = `INC-SKR-${new Date().getFullYear()}-${String(applications.length + 1).padStart(4, '0')}`
    
    let videoDriveLink = null
    let videoDriveId = null

    // Upload video to Google Drive if enabled
    if (videoFile && process.env.USE_GOOGLE_DRIVE === 'true') {
      console.log('🎥 Uploading video to Google Drive...')
      
      const fileName = generateVideoFileName(applicationData.fullName, applicationId)
      
      const driveResult = await uploadVideoToDrive(
        videoFile.path, // Use file path instead of buffer (LOW MEMORY)
        fileName,
        videoFile.mimetype,
        'seeker'
      )
      
      videoDriveLink = driveResult.webViewLink
      videoDriveId = driveResult.fileId
      
      console.log('✅ Video uploaded to Drive:', fileName)
    }

    // Prepare data for Sheets
    const submissionData = {
      applicationId,
      fullName: applicationData.fullName,
      email: applicationData.email,
      phone: applicationData.phone,
      linkedinUrl: applicationData.linkedinUrl,
      currentLocation: applicationData.currentLocation,
      currentRole: applicationData.currentRole,
      yearsOfExperience: applicationData.yearsOfExperience,
      keySkills: applicationData.keySkills,
      domainExpertise: JSON.parse(applicationData.domainExpertise || '[]'),
      preferredRoleType: JSON.parse(applicationData.preferredRoleType || '[]'),
      preferredStartupStage: JSON.parse(applicationData.preferredStartupStage || '[]'),
      industryPreferences: JSON.parse(applicationData.industryPreferences || '[]'),
      locationPreference: applicationData.locationPreference,
      availability: applicationData.availability,
      videoDriveLink,
      videoDriveId,
      couponCode: applicationData.couponCode || '',
      amountPaid: applicationData.amountPaid || 0,
    }

    // Save to Google Sheets if enabled
    if (process.env.USE_GOOGLE_SHEETS === 'true') {
      console.log('📊 Saving to Google Sheets...')
      await saveSeekerApplication(submissionData)
      console.log('✅ Data saved to Google Sheets')
    }

    // Send confirmation email if enabled
    if (process.env.USE_EMAIL_NOTIFICATIONS === 'true') {
      console.log('📧 Sending confirmation email...')
      await sendConfirmationEmail(submissionData, 'seeker')
      console.log('✅ Confirmation email sent')
    }

    // Save to mock database
    applications.push({
      id: uuidv4(),
      ...submissionData,
      createdAt: new Date(),
    })

    // Return success response
    res.json({
      success: true,
      applicationId,
      videoDriveLink,
      message: 'Application submitted successfully!'
    })
  } catch (error) {
    console.error('❌ Error submitting application:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    })
  }
}

export const uploadVideo = async (req, res) => {
  try {
    const videoFile = req.file
    
    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      })
    }

    // In production, upload to Google Drive
    // For now, return mock response
    res.json({
      success: true,
      videoUrl: `/uploads/${videoFile.filename}`,
      message: 'Video uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading video:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload video',
      error: error.message
    })
  }
}

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params
    const application = applications.find(a => a.id === id || a.applicationId === id)
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }

    res.json({
      success: true,
      data: application
    })
  } catch (error) {
    console.error('Error fetching application:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message
    })
  }
}

export const getAllApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    
    let filteredApplications = applications
    
    if (status) {
      filteredApplications = applications.filter(a => a.status === status)
    }
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex)
    
    res.json({
      success: true,
      data: paginatedApplications,
      total: filteredApplications.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredApplications.length / limit)
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    })
  }
}
