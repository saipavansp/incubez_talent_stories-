import { google } from 'googleapis'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

// Initialize Google Drive API
const initializeDrive = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    return google.drive({ version: 'v3', auth })
  } catch (error) {
    console.error('Error initializing Google Drive:', error)
    throw error
  }
}

/**
 * Upload video to Google Drive
 * @param {Buffer} fileBuffer - Video file buffer
 * @param {string} fileName - File name with format: firstname-lastname_INC-XXX-2025-0001.mp4
 * @param {string} mimeType - File MIME type (e.g., 'video/mp4')
 * @param {string} folderType - 'founder' or 'seeker'
 * @returns {Object} { fileId, webViewLink, webContentLink }
 */
export const uploadVideoToDrive = async (fileBuffer, fileName, mimeType, folderType) => {
  try {
    const drive = initializeDrive()
    
    // Determine subfolder based on type
    const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    
    // Get or create subfolder
    const subfolderName = folderType === 'founder' ? 'Founders_Pitches' : 'Seekers_Applications'
    const subfolderId = await getOrCreateSubfolder(drive, parentFolderId, subfolderName)

    // Create readable stream from buffer
    const bufferStream = new stream.PassThrough()
    bufferStream.end(fileBuffer)

    // File metadata
    const fileMetadata = {
      name: fileName,
      parents: [subfolderId],
    }

    const media = {
      mimeType: mimeType,
      body: bufferStream,
    }

    console.log(`Uploading ${fileName} to Google Drive...`)

    // Upload file
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    })

    // Make file accessible (anyone with link can view)
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    console.log(`✅ Video uploaded successfully! File ID: ${response.data.id}`)

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink,
    }
  } catch (error) {
    console.error('Error uploading to Google Drive:', error)
    throw new Error('Failed to upload video to Google Drive: ' + error.message)
  }
}

/**
 * Get or create subfolder in Drive
 */
const getOrCreateSubfolder = async (drive, parentFolderId, folderName) => {
  try {
    // Check if subfolder exists
    const response = await drive.files.list({
      q: `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    })

    if (response.data.files && response.data.files.length > 0) {
      // Subfolder exists
      return response.data.files[0].id
    }

    // Create subfolder
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    }

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    })

    console.log(`Created subfolder: ${folderName}`)
    return folder.data.id
  } catch (error) {
    console.error('Error getting/creating subfolder:', error)
    throw error
  }
}

/**
 * Generate video filename from user data
 * @param {string} name - User's full name
 * @param {string} applicationId - Generated application ID
 * @returns {string} Formatted filename
 */
export const generateVideoFileName = (name, applicationId) => {
  // Convert name to lowercase, replace spaces with hyphens
  const formattedName = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
  
  return `${formattedName}_${applicationId}.mp4`
}

/**
 * Delete video from Google Drive
 * @param {string} fileId - Google Drive file ID
 */
export const deleteVideoFromDrive = async (fileId) => {
  try {
    const drive = initializeDrive()
    await drive.files.delete({ fileId })
    console.log(`✅ Video deleted from Drive: ${fileId}`)
  } catch (error) {
    console.error('Error deleting from Google Drive:', error)
    throw error
  }
}

export default {
  uploadVideoToDrive,
  generateVideoFileName,
  deleteVideoFromDrive,
}
