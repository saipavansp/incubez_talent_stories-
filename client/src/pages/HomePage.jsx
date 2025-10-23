import React from 'react'
import HeroSection from '../components/home/HeroSection'
import UserTypeSelection from '../components/home/UserTypeSelection'
import SuccessStories from '../components/home/SuccessStories'
import Partners from '../components/home/Partners'
import HowItWorks from '../components/home/HowItWorks'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Partners />
      <HowItWorks />
      <UserTypeSelection />
      <SuccessStories />
    </div>
  )
}

export default HomePage

