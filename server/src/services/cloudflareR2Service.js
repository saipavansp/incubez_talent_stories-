import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'

// Initialize R2 client
const initializeR2 = () => {
  return new S3Client({
    region: 'auto', // R2 uses 'auto' for region
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  })
}

/**
 * Upload video to Cloudflare R2
 * @param {string} filePath - Path to video file on disk
 * @param {string} fileName - File name with format: firstname-lastname_INC-XXX-2025-0001.mp4
 * @param {string} mimeType - File MIME type (e.g., 'video/mp4')
 * @param {string} folderType - 'founder' or 'seeker'
 * @returns {Object} { fileUrl, fileName }
 */
export const uploadVideoToR2 = async (filePath, fileName, mimeType, folderType) => {
  try {
    const r2Client = initializeR2()
    
    // Add folder prefix for organization
    const folderPrefix = folderType === 'founder' ? 'founders/' : 'seekers/'
    const fullKey = folderPrefix + fileName
    
    // Read file from disk
    const fileContent = fs.readFileSync(filePath)
    
    console.log(`📤 Uploading ${fileName} to Cloudflare R2...`)
    
    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fullKey,
      Body: fileContent,
      ContentType: mimeType,
    })
    
    await r2Client.send(command)
    
    console.log(`✅ Video uploaded successfully to R2!`)
    
    // Construct public URL
    // Option 1: Use R2 public domain (if enabled)
    const accountId = process.env.R2_ACCOUNT_ID
    const publicUrl = `https://pub-${accountId}.r2.dev/${fullKey}`
    
    // Option 2: Use custom domain (if configured)
    // const publicUrl = `https://videos.incubez.com/${fullKey}`
    
    // Delete temporary file after successful upload
    try {
      fs.unlinkSync(filePath)
      console.log(`🗑️ Temporary file deleted: ${filePath}`)
    } catch (unlinkError) {
      console.warn(`⚠️ Could not delete temp file: ${filePath}`, unlinkError.message)
    }
    
    return {
      fileUrl: publicUrl,
      fileName: fullKey,
    }
  } catch (error) {
    console.error('❌ Error uploading to Cloudflare R2:', error)
    
    // Try to delete temp file even on error
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log(`🗑️ Temporary file deleted after error: ${filePath}`)
      }
    } catch (unlinkError) {
      console.warn(`⚠️ Could not delete temp file after error: ${filePath}`)
    }
    
    throw new Error('Failed to upload video to Cloudflare R2: ' + error.message)
  }
}

/**
 * Delete video from R2 (optional - for cleanup)
 * @param {string} fileName - File key in R2 (e.g., 'founders/video.mp4')
 */
export const deleteVideoFromR2 = async (fileName) => {
  try {
    const r2Client = initializeR2()
    
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
    })
    
    await r2Client.send(command)
    console.log(`🗑️ Video deleted from R2: ${fileName}`)
    
    return { success: true }
  } catch (error) {
    console.error('❌ Error deleting from R2:', error)
    throw error
  }
}

/**
 * Generate video file name (keeping for compatibility)
 */
export const generateVideoFileName = (name, applicationId) => {
  // Clean name: remove special characters, replace spaces with hyphens
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
  
  // Format: firstname-lastname_INC-XXX-2025-0001.mp4
  return `${cleanName}_${applicationId}.mp4`
}

