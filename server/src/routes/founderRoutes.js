import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { 
  submitPitch, 
  uploadVideo, 
  getPitchById,
  getAllPitches 
} from '../controllers/founderController.js'

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
    fileSize: 200 * 1024 * 1024 // 200MB limit (increased for R2 storage)
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
router.post('/pitch', upload.single('video'), submitPitch)
router.post('/upload-video', upload.single('video'), uploadVideo)
router.get('/pitch/:id', getPitchById)
router.get('/pitches', getAllPitches)

export default router
