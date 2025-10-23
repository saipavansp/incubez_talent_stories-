import { v4 as uuidv4 } from 'uuid'

// Mock database (replace with actual MongoDB models)
const applications = []

export const submitApplication = async (req, res) => {
  try {
    const applicationData = req.body
    const videoFile = req.file

    // Generate unique application ID
    const applicationId = `INC-SKR-${new Date().getFullYear()}-${String(applications.length + 1).padStart(4, '0')}`

    // Create application object
    const application = {
      id: uuidv4(),
      applicationId,
      ...applicationData,
      videoUrl: videoFile ? `/uploads/${videoFile.filename}` : null,
      status: 'pending_payment',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save to database (mock)
    applications.push(application)

    // Return response for payment
    res.json({
      success: true,
      applicationId,
      orderId: `order_${uuidv4()}`,
      amount: 499,
      message: 'Application submitted successfully. Please complete payment.'
    })
  } catch (error) {
    console.error('Error submitting application:', error)
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
