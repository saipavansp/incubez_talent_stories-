import React, { useEffect } from 'react'
import SeekerApplicationForm from '../components/forms/SeekerApplicationForm'

const SeekerApplicationPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen pt-20">
      <SeekerApplicationForm />
    </div>
  )
}

export default SeekerApplicationPage

