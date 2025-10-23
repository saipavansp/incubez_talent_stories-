import { v4 as uuidv4 } from 'uuid'

// Mock payment data (replace with actual Razorpay integration)
const payments = []

export const createOrder = async (req, res) => {
  try {
    const { amount, applicationId, type } = req.body

    // In production, create order with Razorpay
    // For now, create mock order
    const order = {
      id: `order_${uuidv4()}`,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      status: 'created',
      applicationId,
      type, // 'founder' or 'seeker'
      createdAt: new Date()
    }

    payments.push(order)

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body

    // In production, verify with Razorpay signature
    // For now, mock verification
    const payment = payments.find(p => p.id === orderId)
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Update payment status
    payment.status = 'completed'
    payment.paymentId = paymentId
    payment.transactionId = `TXN${Date.now()}`
    payment.completedAt = new Date()

    res.json({
      success: true,
      message: 'Payment verified successfully',
      applicationId: payment.applicationId,
      transactionId: payment.transactionId
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    })
  }
}

export const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const payment = payments.find(p => p.id === orderId)
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      })
    }

    res.json({
      success: true,
      status: payment.status,
      amount: payment.amount / 100, // Convert back to rupees
      transactionId: payment.transactionId || null,
      completedAt: payment.completedAt || null
    })
  } catch (error) {
    console.error('Error fetching payment status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: error.message
    })
  }
}
