// Mock data (import from other controllers in production)
const getAllSubmissionsData = () => {
  // In production, fetch from database
  return {
    founders: [],
    seekers: []
  }
}

export const getAllSubmissions = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query
    const submissions = getAllSubmissionsData()
    
    let data = []
    
    if (type === 'founder') {
      data = submissions.founders
    } else if (type === 'seeker') {
      data = submissions.seekers
    } else {
      data = [...submissions.founders, ...submissions.seekers]
    }
    
    // Filter by status if provided
    if (status) {
      data = data.filter(item => item.status === status)
    }
    
    // Sort by date
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedData = data.slice(startIndex, endIndex)
    
    res.json({
      success: true,
      data: paginatedData,
      total: data.length,
      page: parseInt(page),
      totalPages: Math.ceil(data.length / limit)
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    })
  }
}

export const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params
    const { type } = req.body // 'founder' or 'seeker'
    
    // In production, update in database
    // For now, return success
    res.json({
      success: true,
      message: 'Submission approved successfully',
      id,
      status: 'approved'
    })
  } catch (error) {
    console.error('Error approving submission:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to approve submission',
      error: error.message
    })
  }
}

export const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params
    const { type, reason } = req.body
    
    // In production, update in database
    // For now, return success
    res.json({
      success: true,
      message: 'Submission rejected',
      id,
      status: 'rejected',
      reason
    })
  } catch (error) {
    console.error('Error rejecting submission:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to reject submission',
      error: error.message
    })
  }
}

export const getStats = async (req, res) => {
  try {
    // In production, calculate from database
    const stats = {
      totalFounders: 150,
      totalSeekers: 450,
      totalMatches: 75,
      successRate: 95,
      revenue: {
        total: 599500,
        founders: 149850,
        seekers: 449650
      },
      monthlyGrowth: {
        founders: 12.5,
        seekers: 18.3,
        revenue: 22.7
      },
      topIndustries: [
        { name: 'FinTech', count: 120 },
        { name: 'HealthTech', count: 98 },
        { name: 'EdTech', count: 87 },
        { name: 'SaaS', count: 76 },
        { name: 'E-commerce', count: 69 }
      ]
    }
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    })
  }
}
