import { v4 as uuidv4 } from 'uuid'

// Mock database (replace with actual MongoDB models)
const pitches = []

export const submitPitch = async (req, res) => {
  try {
    const pitchData = req.body
    const videoFile = req.file

    // Generate unique application ID
    const applicationId = `INC-FND-${new Date().getFullYear()}-${String(pitches.length + 1).padStart(4, '0')}`

    // Create pitch object
    const pitch = {
      id: uuidv4(),
      applicationId,
      ...pitchData,
      videoUrl: videoFile ? `/uploads/${videoFile.filename}` : null,
      status: 'pending_payment',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save to database (mock)
    pitches.push(pitch)

    // Return response for payment
    res.json({
      success: true,
      applicationId,
      orderId: `order_${uuidv4()}`,
      amount: 999,
      message: 'Pitch submitted successfully. Please complete payment.'
    })
  } catch (error) {
    console.error('Error submitting pitch:', error)
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
