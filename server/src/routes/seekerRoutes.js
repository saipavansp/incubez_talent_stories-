import express from 'express'
import multer from 'multer'
import { 
  submitApplication, 
  uploadVideo, 
  getApplicationById,
  getAllApplications 
} from '../controllers/seekerController.js'

const router = express.Router()

// Configure multer for video uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'))
    }
  }
})

// Routes
router.post('/application', upload.single('video'), submitApplication)
router.post('/upload-video', upload.single('video'), uploadVideo)
router.get('/application/:id', getApplicationById)
router.get('/applications', getAllApplications)

export default router
