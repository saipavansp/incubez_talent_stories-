import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PitchesPage from './pages/PitchesPage'
import FounderPitchPage from './pages/FounderPitchPage'
import SeekerApplicationPage from './pages/SeekerApplicationPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#e14f46',
            },
          },
          error: {
            style: {
              background: '#dc2626',
            },
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pitches" element={<PitchesPage />} />
          <Route path="/founder/pitch" element={<FounderPitchPage />} />
          <Route path="/seeker/apply" element={<SeekerApplicationPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

