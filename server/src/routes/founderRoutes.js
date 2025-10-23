import express from 'express'
import multer from 'multer'
import { 
  submitPitch, 
  uploadVideo, 
  getPitchById,
  getAllPitches 
} from '../controllers/founderController.js'

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
router.post('/pitch', upload.single('video'), submitPitch)
router.post('/upload-video', upload.single('video'), uploadVideo)
router.get('/pitch/:id', getPitchById)
router.get('/pitches', getAllPitches)

export default router
