# 🚀 Complete Render Deployment Guide

## Step-by-Step Deployment for INCUBEZ Talent Stories

---

## 📋 **Before You Start**

### What You Need:
1. ✅ GitHub account
2. ✅ Render account (free signup at https://render.com)
3. ✅ Code pushed to: https://github.com/saipavansp/incubez_talent_stories-.git
4. ⏳ Razorpay API keys (can add later)

---

## 🎯 **STEP 1: Deploy Backend First**

### A. Go to Render Dashboard
1. Visit: https://dashboard.render.com/
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### B. Connect GitHub Repository
1. Click **"Connect account"** (if first time)
2. Authorize Render to access your GitHub
3. Search for: `incubez_talent_stories-`
4. Click **"Connect"**

### C. Configure Backend Service

#### Basic Settings:
```
Name: incubez-server
Region: Singapore (closest to India)
Branch: main
Root Directory: server
Runtime: Node
```

#### Build & Start Commands:
```
Build Command: npm install
Start Command: npm start
```

#### Instance Type:
```
Free (for now)
```

### D. Environment Variables (CRITICAL!)

Click **"Advanced"** → **"Add Environment Variable"**

Add these **EXACT** variables:

```env
# 1. Server Configuration
PORT
Value: 5000

# 2. Node Environment  
NODE_ENV
Value: production

# 3. Client URL (UPDATE THIS AFTER FRONTEND IS DEPLOYED)
CLIENT_URL
Value: http://localhost:3000
(Will update to: https://incubez-client.onrender.com after frontend deploy)

# 4. Database (Optional for now)
USE_MONGODB
Value: false

# 5. JWT Secret (Click "Generate")
JWT_SECRET
Click the "Generate" button to create a random secret
OR use: your_super_secret_jwt_key_change_this_12345

# 6. Razorpay (Leave empty for now, add later)
RAZORPAY_KEY_ID
Value: (leave empty or add your test key)

RAZORPAY_KEY_SECRET
Value: (leave empty or add your test secret)

# 7. Google APIs (Leave empty for now)
GOOGLE_DRIVE_CLIENT_EMAIL
Value: (leave empty)

GOOGLE_DRIVE_PRIVATE_KEY
Value: (leave empty)

GOOGLE_DRIVE_FOLDER_ID
Value: (leave empty)

GOOGLE_SHEETS_ID
Value: (leave empty)
```

### E. Deploy Backend
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build to complete
3. Once deployed, you'll get a URL like: `https://incubez-server.onrender.com`
4. **COPY THIS URL** - you'll need it for frontend!

### F. Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "INCUBEZ Talent Stories API is running",
  "timestamp": "2025-10-23T..."
}
```

---

## 🎨 **STEP 2: Deploy Frontend**

### A. Create New Static Site
1. In Render Dashboard, click **"New +"**
2. Select **"Static Site"**

### B. Connect Same GitHub Repository
1. Select: `incubez_talent_stories-`
2. Click **"Connect"**

### C. Configure Frontend Service

#### Basic Settings:
```
Name: incubez-client
Branch: main
Root Directory: client
```

#### Build Settings:
```
Build Command: npm install && npm run build
Publish Directory: dist
```

### D. Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

```env
# 1. Backend API URL (USE YOUR BACKEND URL FROM STEP 1!)
VITE_API_URL
Value: https://incubez-server.onrender.com
(Replace with YOUR actual backend URL)

# 2. Razorpay Key (Frontend key - safe to expose)
VITE_RAZORPAY_KEY
Value: (leave empty or add your test key)
```

### E. Deploy Frontend
1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build
3. You'll get URL like: `https://incubez-client.onrender.com`
4. **COPY THIS URL**

---

## 🔄 **STEP 3: Update Backend with Frontend URL**

### IMPORTANT: Update CLIENT_URL in Backend

1. Go to **Backend Service** (incubez-server)
2. Click **"Environment"** tab
3. Find `CLIENT_URL` variable
4. Update value to: `https://incubez-client.onrender.com` (your actual frontend URL)
5. Click **"Save Changes"**
6. Backend will auto-redeploy (~2 minutes)

---

## 📊 **Complete Environment Variables Reference**

### Backend (.env equivalent):
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://incubez-client.onrender.com
USE_MONGODB=false
JWT_SECRET=generated_secret_key_here
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=secret_key_xxxxx
GOOGLE_DRIVE_CLIENT_EMAIL=
GOOGLE_DRIVE_PRIVATE_KEY=
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_SHEETS_ID=
```

### Frontend (.env equivalent):
```env
VITE_API_URL=https://incubez-server.onrender.com
VITE_RAZORPAY_KEY=rzp_test_xxxxx
```

---

## ✅ **STEP 4: Verify Deployment**

### Check Backend:
1. Visit: `https://your-backend-url.onrender.com/api/health`
2. Should see: `{"status":"OK",...}`

### Check Frontend:
1. Visit: `https://your-frontend-url.onrender.com`
2. Should see homepage loading
3. Test navigation menu
4. Check videos play in Pitches section

### Test Form Submission:
1. Go to "Post Your Pitch" 
2. Fill out all steps
3. Upload a video (optional for now)
4. Click "Submit & Pay"
5. Should see **Payment Success** page with Application ID

---

## 🐛 **Troubleshooting**

### Backend Shows "Service Unavailable"
- ⏰ Free tier sleeps after 15 min inactivity
- 🔄 First request takes 30-60 seconds to wake up
- ✅ Just refresh after 1 minute

### Frontend Not Loading
- Check build logs in Render dashboard
- Verify build command ran successfully
- Check `dist` folder was created

### CORS Errors in Console
- Verify `CLIENT_URL` in backend matches frontend URL exactly
- Check both URLs use `https://` (not `http://`)
- Wait for backend redeploy after updating CLIENT_URL

### Videos Not Playing
- Videos should work fine (they're in frontend bundle)
- Check browser console for errors
- Verify video files are in `client/public/videos/`

### Form Submission Not Working
- Currently set to **bypass payment** and show success directly
- This is intentional until payment gateway is configured
- Backend not needed for form testing

---

## 🔐 **When to Add Real Integrations**

### Payment Gateway:
1. Create Razorpay account: https://razorpay.com/
2. Get Test API keys from dashboard
3. Update environment variables in Render
4. Uncomment payment code in forms
5. Test with Razorpay test cards

### Google Drive:
1. Create project in Google Cloud Console
2. Enable Google Drive API
3. Create service account
4. Download credentials JSON
5. Add to Render environment variables
6. Videos will auto-upload to Drive

### Google Sheets:
1. Enable Google Sheets API (same project)
2. Create a spreadsheet
3. Share with service account email
4. Copy spreadsheet ID
5. Add to environment variables
6. Submissions auto-save to Sheets

### MongoDB:
1. Create account at MongoDB Atlas
2. Create free cluster
3. Get connection string
4. Set `USE_MONGODB=true` in Render
5. Add `MONGODB_URI` variable

---

## 💰 **Render Free Tier Limits**

### Static Site (Frontend):
- ✅ **FREE Forever**
- ✅ Unlimited sites
- ✅ 100 GB bandwidth/month
- ✅ Global CDN
- ✅ Auto SSL certificate
- ✅ Custom domain support

### Web Service (Backend):
- ✅ **FREE Tier Available**
- ✅ 750 hours/month (enough for 1 site)
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 30-60s wake up time
- ✅ 100 GB bandwidth/month

### When to Upgrade ($7/month):
- ❌ No sleep (instant response)
- ✅ Always-on
- ✅ Better for production traffic
- ✅ More reliability

---

## 🎯 **Quick Checklist**

### Before Deployment:
- [x] Code pushed to GitHub
- [x] .gitignore configured
- [x] Videos in public/videos/
- [x] render.yaml created
- [x] Environment templates created

### During Deployment:
- [ ] Backend deployed first
- [ ] Backend URL copied
- [ ] Frontend deployed with backend URL
- [ ] Frontend URL copied
- [ ] Backend updated with frontend URL

### After Deployment:
- [ ] Both services show "Live"
- [ ] Health check works
- [ ] Homepage loads
- [ ] Videos play
- [ ] Forms work
- [ ] Success page shows

---

## 📝 **Important URLs After Deployment**

```
Frontend (Website): https://incubez-client.onrender.com
Backend (API):      https://incubez-server.onrender.com
Health Check:       https://incubez-server.onrender.com/api/health
GitHub Repo:        https://github.com/saipavansp/incubez_talent_stories-.git
```

**Save these URLs!**

---

## 🔄 **Auto-Deploy Setup**

Render automatically redeploys when you push to GitHub:

```bash
# Make changes to code
git add .
git commit -m "Your update message"
git push origin main

# Render automatically:
# 1. Detects push to main branch
# 2. Rebuilds affected services
# 3. Deploys new version
# 4. Takes 3-5 minutes
```

---

## 🆘 **Getting Help**

### Render Support:
- Documentation: https://render.com/docs
- Community: https://community.render.com/
- Support: support@render.com

### Common Issues:
- Service not starting? Check logs in Render dashboard
- Build failing? Verify package.json scripts
- CORS errors? Check CLIENT_URL matches frontend URL
- Slow response? Free tier wakes up from sleep

---

## 🎉 **You're Ready to Deploy!**

Follow the steps above, and your INCUBEZ Talent Stories platform will be live on the internet! 🌐

**Estimated Total Time**: 20-30 minutes

**Cost**: $0 (completely free to start!)

---

## 📞 **Post-Deployment**

After successful deployment:
1. Share your live URL with users
2. Test all features thoroughly
3. Monitor Render dashboard for errors
4. Add payment gateway when ready
5. Upgrade to paid tier when traffic increases

**Good luck! 🚀**
