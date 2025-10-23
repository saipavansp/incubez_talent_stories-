import React, { useEffect } from 'react'
import FounderPitchForm from '../components/forms/FounderPitchForm'

const FounderPitchPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen pt-20">
      <FounderPitchForm />
    </div>
  )
}

export default FounderPitchPage

