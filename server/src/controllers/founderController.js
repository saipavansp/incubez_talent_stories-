import { v4 as uuidv4 } from 'uuid'
import { uploadVideoToR2, generateVideoFileName } from '../services/cloudflareR2Service.js'
import { saveFounderSubmission } from '../services/googleSheetsService.js'
import { sendConfirmationEmail } from '../services/emailService.js'

// Mock database for tracking (optional if using Sheets)
const pitches = []

export const submitPitch = async (req, res) => {
  try {
    const pitchData = req.body
    const videoFile = req.file

    console.log('📝 Founder pitch submission received...')

    // Generate unique application ID
    const applicationId = `INC-FND-${new Date().getFullYear()}-${String(pitches.length + 1).padStart(4, '0')}`
    
    let videoDriveLink = null
    let videoDriveId = null

    // Upload video to Cloudflare R2
    if (videoFile) {
      console.log('🎥 Uploading video to Cloudflare R2...')
      
      const fileName = generateVideoFileName(pitchData.founderName, applicationId)
      
      const r2Result = await uploadVideoToR2(
        videoFile.path, // File path on disk (LOW MEMORY)
        fileName,
        videoFile.mimetype,
        'founder'
      )
      
      videoDriveLink = r2Result.fileUrl
      videoDriveId = r2Result.fileName
      
      console.log('✅ Video uploaded to R2:', fileName)
    }

    // Prepare data for Sheets
    const submissionData = {
      applicationId,
      founderName: pitchData.founderName,
      email: pitchData.email,
      phone: pitchData.phone,
      linkedinUrl: pitchData.linkedinUrl,
      startupName: pitchData.startupName,
      domain: pitchData.domain,
      stage: pitchData.stage,
      jobTitle: pitchData.jobTitle,
      roleType: pitchData.roleType,
      experienceLevel: pitchData.experienceLevel,
      locationPreference: pitchData.locationPreference,
      compensationType: pitchData.compensationType,
      videoDriveLink,
      videoDriveId,
      couponCode: pitchData.couponCode || '',
      amountPaid: pitchData.amountPaid || 0,
    }

    // Save to Google Sheets if enabled
    if (process.env.USE_GOOGLE_SHEETS === 'true') {
      console.log('📊 Saving to Google Sheets...')
      await saveFounderSubmission(submissionData)
      console.log('✅ Data saved to Google Sheets')
    }

    // Save to mock database
    pitches.push({
      id: uuidv4(),
      ...submissionData,
      createdAt: new Date(),
    })

    // Send confirmation email ASYNC (don't wait - fire and forget)
    if (process.env.USE_EMAIL_NOTIFICATIONS === 'true') {
      console.log('📧 Sending confirmation email (async)...')
      // Don't await - send in background to avoid blocking response
      sendConfirmationEmail(submissionData, 'founder')
        .then(() => console.log('✅ Confirmation email sent'))
        .catch((error) => console.error('⚠️ Email failed (non-blocking):', error.message))
    }

    // Return success response IMMEDIATELY (don't wait for email)
    res.json({
      success: true,
      applicationId,
      videoDriveLink,
      message: 'Pitch submitted successfully!'
    })
  } catch (error) {
    console.error('❌ Error submitting pitch:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit pitch',
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

export const getPitchById = async (req, res) => {
  try {
    const { id } = req.params
    const pitch = pitches.find(p => p.id === id || p.applicationId === id)
    
    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: 'Pitch not found'
      })
    }

    res.json({
      success: true,
      data: pitch
    })
  } catch (error) {
    console.error('Error fetching pitch:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pitch',
      error: error.message
    })
  }
}

export const getAllPitches = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    
    let filteredPitches = pitches
    
    if (status) {
      filteredPitches = pitches.filter(p => p.status === status)
    }
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPitches = filteredPitches.slice(startIndex, endIndex)
    
    res.json({
      success: true,
      data: paginatedPitches,
      total: filteredPitches.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredPitches.length / limit)
    })
  } catch (error) {
    console.error('Error fetching pitches:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pitches',
      error: error.message
    })
  }
}
