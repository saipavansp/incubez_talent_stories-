import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CloudArrowUpIcon, 
  VideoCameraIcon, 
  XMarkIcon,
  PlayIcon,
  PauseIcon 
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const VideoUploader = ({ 
  onVideoSelect, 
  existingVideo, 
  maxSize = 500 * 1024 * 1024, // 500MB default
  acceptedFormats = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoPreview, setVideoPreview] = useState(existingVideo)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const validateFile = (file) => {
    if (!acceptedFormats.includes(file.type)) {
      toast.error('Invalid file format. Please upload a video file.')
      return false
    }
    
    if (file.size > maxSize) {
      toast.error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`)
      return false
    }
    
    return true
  }

  const handleFile = (file) => {
    if (!validateFile(file)) return

    // Create preview URL
    const videoUrl = URL.createObjectURL(file)
    setVideoPreview({
      file,
      url: videoUrl,
      name: file.name,
      size: file.size
    })
    
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      
      if (progress >= 100) {
        clearInterval(interval)
        onVideoSelect(file)
        toast.success('Video uploaded successfully!')
      }
    }, 200)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const removeVideo = () => {
    if (videoPreview?.url) {
      URL.revokeObjectURL(videoPreview.url)
    }
    setVideoPreview(null)
    setUploadProgress(0)
    onVideoSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      })
      
      mediaRecorderRef.current = mediaRecorder
      
      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'video/webm' })
        handleFile(file)
        
        // Stop all tracks
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      
      setRecordedChunks([])
      mediaRecorder.start()
      setIsRecording(true)
      
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('Failed to access camera. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!videoPreview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Upload Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                ${isDragging ? 'border-incubez-red bg-red-50' : 'border-gray-300 hover:border-gray-400'}
              `}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              
              <p className="text-lg font-medium mb-2">
                Drag and drop your video here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  Choose File
                </button>
                
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`btn-outline flex items-center justify-center gap-2 ${
                    isRecording ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' : ''
                  }`}
                >
                  <VideoCameraIcon className="w-5 h-5" />
                  {isRecording ? 'Stop Recording' : 'Record Video'}
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <p className="text-xs text-gray-500 mt-4">
                Accepted formats: MP4, MOV, AVI, WebM • Max size: {maxSize / (1024 * 1024)}MB
              </p>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center justify-center gap-2"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-500 font-medium">Recording in progress...</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Video Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={videoPreview.url}
                className="w-full max-h-96 object-contain"
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="bg-white/90 rounded-full p-4 hover:bg-white transition-all duration-300 group"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-8 h-8 text-incubez-black" />
                  ) : (
                    <PlayIcon className="w-8 h-8 text-incubez-black" />
                  )}
                </button>
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Video Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{videoPreview.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {formatFileSize(videoPreview.size)}
                  </p>
                </div>
                
                {uploadProgress < 100 && (
                  <div className="text-incubez-red font-medium">
                    {uploadProgress}%
                  </div>
                )}
                
                {uploadProgress === 100 && (
                  <div className="text-green-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {uploadProgress < 100 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-incubez-red"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Replace Video Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full btn-outline"
            >
              Replace Video
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoUploader
