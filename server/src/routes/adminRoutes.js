import express from 'express'
import { 
  getAllSubmissions, 
  approveSubmission, 
  rejectSubmission,
  getStats 
} from '../controllers/adminController.js'

const router = express.Router()

// Admin routes
router.get('/submissions', getAllSubmissions)
router.put('/approve/:id', approveSubmission)
router.put('/reject/:id', rejectSubmission)
router.get('/stats', getStats)

export default router
