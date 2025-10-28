const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log to console for dev
  console.error('❌ Error:', err.message || err)

  // Multer file size error
  if (err.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Video file is too large. Maximum size is 100MB.',
      details: 'Please compress your video before uploading. Recommended: 2-5 minutes at 720p or 1080p.',
      tip: 'Use HandBrake (free app) or CloudConvert (online) to compress your video.'
    })
  }

  // Multer unexpected file
  if (err.name === 'MulterError' && err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected file field. Please ensure you are uploading only one video file.'
    })
  }

  // Invalid file type
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only video files (MP4, MOV, AVI, WebM) are allowed.'
    })
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = { message, statusCode: 404 }
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = { message, statusCode: 400 }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ')
    error = { message, statusCode: 400 }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  })
}

export default errorHandler
