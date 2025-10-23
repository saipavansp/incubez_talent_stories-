import express from 'express'
import { 
  createOrder, 
  verifyPayment, 
  getPaymentStatus 
} from '../controllers/paymentController.js'

const router = express.Router()

// Payment routes
router.post('/create-order', createOrder)
router.post('/verify', verifyPayment)
router.get('/status/:orderId', getPaymentStatus)

export default router
