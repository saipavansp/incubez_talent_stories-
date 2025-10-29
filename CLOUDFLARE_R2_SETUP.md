# 🌐 **Cloudflare R2 Setup Guide - Complete Integration**

## 🎯 **Overview**

This guide will help you switch from Google Drive to Cloudflare R2 for video storage.

**Benefits:**
- ✅ No service account storage quota issues
- ✅ Upload files up to 200MB (or even 5TB!)
- ✅ **FREE bandwidth** (unlimited downloads)
- ✅ Cheaper than Google Drive ($0.015/GB vs $1.99/100GB)
- ✅ Faster uploads and downloads (global CDN)
- ✅ Simple S3-compatible API

---

## **STEP 1: Create Cloudflare Account & R2 Bucket**

### **1.1 - Sign Up**

1. Go to: https://dash.cloudflare.com/sign-up
2. Sign up with: `incubez.ott@gmail.com`
3. Verify your email
4. Complete account setup

### **1.2 - Enable R2**

1. Log in: https://dash.cloudflare.com/
2. Click: **"R2"** in left sidebar
3. Click: **"Purchase R2"**
4. Pricing:
   - First 10 GB/month: **FREE**
   - After that: $0.015/GB/month
   - Bandwidth: **FREE** (no egress fees!)
5. Click: **"Enable R2"**

### **1.3 - Create Bucket**

1. Click: **"Create bucket"**
2. **Bucket name**: `incubez-talent-videos`
3. **Location**: Automatic (Cloudflare chooses best)
4. Click: **"Create bucket"**

✅ **Bucket created successfully!**

---

## **STEP 2: Generate API Credentials**

### **2.1 - Create API Token**

1. In R2 dashboard, click: **"Manage R2 API Tokens"**
2. Click: **"Create API token"**
3. **Token name**: `incubez-backend-upload`
4. **Permissions**:
   - ✅ **Object Read & Write**
   - ✅ **Bucket**: Select `incubez-talent-videos`
5. **TTL**: Forever (or set expiration)
6. Click: **"Create API Token"**

### **2.2 - Save Credentials (IMPORTANT!)**

You'll see these (copy them now):

```
Access Key ID: xxxxxxxxxxxxxxxxxxxxx
Secret Access Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyy
Jurisdiction-specific endpoint: https://[account-id].r2.cloudflarestorage.com
```

**⚠️ Save these immediately! You won't see the secret key again!**

### **2.3 - Get Account ID**

1. Look at the endpoint URL
2. Format: `https://[account-id].r2.cloudflarestorage.com`
3. Extract the account ID from the URL
4. Example: 
   - URL: `https://abc123def456.r2.cloudflarestorage.com`
   - Account ID: `abc123def456`

---

## **STEP 3: Install Required Package**

In your backend (`server/` directory):

```bash
cd server
npm install @aws-sdk/client-s3
```

This installs the AWS S3 SDK (Cloudflare R2 is S3-compatible).

---

## **STEP 4: Create R2 Service File**

Create file: `server/src/services/cloudflareR2Service.js`

```javascript
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
      // Make file publicly accessible (optional)
      // ACL: 'public-read', // Not needed if using R2 public URL
    })
    
    await r2Client.send(command)
    
    console.log(`✅ Video uploaded successfully to R2!`)
    
    // Construct public URL
    const accountId = process.env.R2_ACCOUNT_ID
    const bucketName = process.env.R2_BUCKET_NAME
    const publicUrl = `https://pub-${accountId}.r2.dev/${fullKey}`
    
    // Or use custom domain if configured:
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
```

---

## **STEP 5: Update Controllers**

### **5.1 - Update Founder Controller**

File: `server/src/controllers/founderController.js`

**Replace**:
```javascript
import { uploadVideoToDrive, generateVideoFileName } from '../services/googleDriveService.js'
```

**With**:
```javascript
import { uploadVideoToR2 } from '../services/cloudflareR2Service.js'
import { generateVideoFileName } from '../services/googleDriveService.js' // Keep for filename generation
```

**Replace the upload section**:
```javascript
// OLD (Google Drive):
const driveResult = await uploadVideoToDrive(
  videoFile.path,
  fileName,
  videoFile.mimetype,
  'founder'
)
videoDriveLink = driveResult.webViewLink
videoDriveId = driveResult.fileId
```

**With**:
```javascript
// NEW (Cloudflare R2):
const r2Result = await uploadVideoToR2(
  videoFile.path,
  fileName,
  videoFile.mimetype,
  'founder'
)
videoDriveLink = r2Result.fileUrl
videoDriveId = r2Result.fileName
```

### **5.2 - Update Seeker Controller**

Same changes in `server/src/controllers/seekerController.js`:

```javascript
// Import
import { uploadVideoToR2 } from '../services/cloudflareR2Service.js'

// Upload section
const r2Result = await uploadVideoToR2(
  videoFile.path,
  fileName,
  videoFile.mimetype,
  'seeker'
)
videoDriveLink = r2Result.fileUrl
videoDriveId = r2Result.fileName
```

---

## **STEP 6: Update Environment Variables**

### **6.1 - Server Environment Template**

File: `server/env.template`

**Add these new variables**:

```env
# Cloudflare R2 Storage
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=incubez-talent-videos
R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

# Remove or comment out Google Drive (no longer needed):
# GOOGLE_DRIVE_CLIENT_EMAIL=...
# GOOGLE_DRIVE_PRIVATE_KEY=...
# GOOGLE_DRIVE_FOLDER_ID=...
```

### **6.2 - Render Backend Environment Variables**

Go to: https://dashboard.render.com/ → Backend service → Environment

**Add these**:
```
R2_ACCOUNT_ID = [your account id from step 2.3]
R2_ACCESS_KEY_ID = [your access key from step 2.2]
R2_SECRET_ACCESS_KEY = [your secret key from step 2.2]
R2_BUCKET_NAME = incubez-talent-videos
R2_ENDPOINT = https://[account-id].r2.cloudflarestorage.com
```

**Remove these** (no longer needed):
```
❌ GOOGLE_DRIVE_CLIENT_EMAIL
❌ GOOGLE_DRIVE_PRIVATE_KEY
❌ GOOGLE_DRIVE_FOLDER_ID
```

**Keep these** (still needed):
```
✅ GOOGLE_SHEETS_ID (for data storage)
✅ EMAIL_* (for notifications)
✅ All other settings
```

---

## **STEP 7: Enable Public Access (Optional)**

### **Option A: Enable Public R2 Domain**

1. In R2 dashboard, select your bucket
2. Click: **"Settings"**
3. Find: **"Public access"**
4. Click: **"Allow Access"**
5. Copy the public URL: `https://pub-[id].r2.dev`

Now videos are publicly accessible at:
```
https://pub-[id].r2.dev/founders/firstname-lastname_INC-FND-2025-0001.mp4
```

### **Option B: Use Custom Domain (Advanced)**

1. In R2 bucket settings, click: **"Custom Domains"**
2. Click: **"Connect Domain"**
3. Enter: `videos.incubez.com` (subdomain of your site)
4. Follow DNS setup instructions
5. Videos will be accessible at:
```
https://videos.incubez.com/founders/video.mp4
```

**Recommended**: Start with Option A (public R2 domain), add custom domain later.

---

## **STEP 8: Update File Size Limit**

### **8.1 - Update Routes**

File: `server/src/routes/founderRoutes.js` and `seekerRoutes.js`

Change file size limit:

```javascript
const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB (increased from 100MB!)
  },
  // ... rest stays same
})
```

### **8.2 - Update Error Handler**

File: `server/src/middleware/errorHandler.js`

Update error message:

```javascript
if (err.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
  return res.status(400).json({
    success: false,
    message: 'Video file is too large. Maximum size is 200MB.',
    details: 'Please compress your video before uploading. Recommended: 5-8 minutes at 720p or 1080p.',
    tip: 'Use HandBrake (free app) or CloudConvert (online) to compress your video.'
  })
}
```

---

## **STEP 9: Test Everything**

### **9.1 - Install Package**

```bash
cd server
npm install @aws-sdk/client-s3
```

### **9.2 - Commit Changes**

```bash
git add .
git commit -m "Switch to Cloudflare R2 for video storage - 200MB limit"
git push origin main
```

### **9.3 - Wait for Deployment**

- Render will auto-deploy (~5-7 minutes)
- Check logs for successful deployment

### **9.4 - Test Upload**

1. Go to frontend
2. Upload a video (<200MB)
3. Submit form

**Expected logs**:
```
📝 Founder pitch submission received...
🎥 Uploading video to Cloudflare R2...
📤 Uploading saipavan_INC-FND-2025-0001.mp4 to Cloudflare R2...
✅ Video uploaded successfully to R2!
🗑️ Temporary file deleted
📊 Saving to Google Sheets...
✅ Data saved to Google Sheets
📧 Sending confirmation email...
✅ Confirmation email sent
```

### **9.5 - Verify in R2**

1. Go to R2 dashboard
2. Click on `incubez-talent-videos` bucket
3. Should see:
```
founders/
  └── saipavan_INC-FND-2025-0001.mp4
```

---

## **STEP 10: Update Google Sheets Structure**

### **10.1 - Update Column Name**

In your Google Sheet:
- **Old column**: "Video Drive Link"
- **New column**: "Video URL"

The column will now contain R2 URLs instead of Google Drive links.

---

## 📊 **Architecture After Migration:**

```
User Uploads Video
    ↓
Frontend (React + Vite)
    ↓
Backend (Node.js + Express)
    ↓
┌─────────────────┬──────────────────┐
│                 │                  │
Cloudflare R2     Google Sheets      Gmail SMTP
(Video Storage)   (Data Storage)     (Notifications)
    ↓                 ↓                  ↓
Stored as:        Saved as:          Sent as:
founders/         Row with           Confirmation
video.mp4         all data +         email to user
                  video URL
```

---

## 💰 **Cost Comparison:**

### **Storage (1TB for 1 year):**

| Provider | Cost |
|----------|------|
| **Google Drive** (2TB plan) | $144/year |
| **Cloudflare R2** (1TB) | $180/year |

### **Bandwidth (10TB downloads/month):**

| Provider | Cost |
|----------|------|
| **Google Drive** | Included but slow |
| **Cloudflare R2** | **$0 (FREE!)** 🎉 |

### **Total (1TB storage + 10TB bandwidth/month):**

| Provider | Monthly | Yearly |
|----------|---------|--------|
| **Google Drive** | $12 | $144 |
| **Cloudflare R2** | $15 | $180 |

**Winner**: **Cloudflare R2** for performance + **FREE bandwidth**!

---

## 🎯 **Benefits of Cloudflare R2:**

### **1. No Service Account Issues**
- ✅ No storage quota limitations
- ✅ Simple API key authentication
- ✅ No permission headaches

### **2. Better Performance**
- ✅ Global CDN (fast anywhere in world)
- ✅ Faster uploads
- ✅ Faster downloads
- ✅ Better reliability

### **3. Lower Costs at Scale**
- ✅ **FREE bandwidth** (huge savings!)
- ✅ Pay only for storage
- ✅ No per-request fees

### **4. Scalability**
- ✅ Support up to 5TB per file
- ✅ Unlimited files
- ✅ No rate limits
- ✅ Built for scale

### **5. Developer Experience**
- ✅ S3-compatible API (familiar)
- ✅ Simple authentication
- ✅ Great documentation
- ✅ Easy to use

---

## 🔧 **Troubleshooting:**

### **Issue: "Access Denied" Error**

**Solution**:
- Check Access Key ID is correct
- Check Secret Access Key is correct
- Verify API token has "Object Read & Write" permission
- Ensure token is for correct bucket

### **Issue: "Endpoint Not Found"**

**Solution**:
- Check R2_ENDPOINT URL is correct
- Format: `https://[account-id].r2.cloudflarestorage.com`
- Don't include bucket name in endpoint

### **Issue: "Bucket Does Not Exist"**

**Solution**:
- Check bucket name spelling: `incubez-talent-videos`
- Verify bucket was created successfully
- Check R2_BUCKET_NAME environment variable

### **Issue: Public URLs Not Working**

**Solution**:
- Enable public access in bucket settings
- Wait 2-3 minutes for propagation
- Use correct public URL format

---

## 📋 **Deployment Checklist:**

- [ ] Cloudflare account created
- [ ] R2 enabled
- [ ] Bucket created: `incubez-talent-videos`
- [ ] API token created
- [ ] Credentials saved (Access Key ID, Secret, Endpoint)
- [ ] Account ID extracted
- [ ] Public access enabled (optional)
- [ ] `@aws-sdk/client-s3` package installed
- [ ] R2 service file created
- [ ] Controllers updated
- [ ] Environment variables added to Render
- [ ] File size limit updated to 200MB
- [ ] Code committed and pushed
- [ ] Backend deployed
- [ ] Upload tested
- [ ] Video appears in R2 bucket
- [ ] Data saved to Google Sheets
- [ ] Public URL works

---

## 🎉 **Result:**

After setup:
- ✅ Videos upload to Cloudflare R2
- ✅ Support up to 200MB files
- ✅ **FREE unlimited bandwidth**
- ✅ Fast global CDN delivery
- ✅ Data still in Google Sheets
- ✅ No service account issues
- ✅ Production-ready solution!

---

**Cloudflare R2 is the perfect solution for your platform!** 🚀

