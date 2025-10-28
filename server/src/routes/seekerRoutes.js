import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { 
  submitApplication,
  uploadVideo,
  getApplicationById,
  getAllApplications
} from '../controllers/seekerController.js'

const router = express.Router()

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'uploads', 'temp')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure multer for video uploads - Use DISK storage to avoid RAM overflow
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // Reduced to 100MB to prevent memory issues
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
