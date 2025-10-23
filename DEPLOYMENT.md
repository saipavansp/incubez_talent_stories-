# 🚀 INCUBEZ Talent Stories - Deployment Guide

## Deployment on Render

This project is configured to deploy both **frontend** and **backend** on Render using the `render.yaml` blueprint.

---

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Code pushed to https://github.com/saipavansp/incubez_talent_stories-.git
3. **Environment Variables**: Have your API keys ready

---

## 🎯 Quick Deploy

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/

2. **Create New Blueprint**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository: `saipavansp/incubez_talent_stories-`
   - Render will auto-detect `render.yaml`

3. **Configure Services**
   
   **Frontend (incubez-client)**
   - Type: Static Site
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`
   - Environment Variables:
     ```
     NODE_VERSION=18.0.0
     ```

   **Backend (incubez-server)**
   - Type: Web Service
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     ```
     PORT=5000
     NODE_ENV=production
     USE_MONGODB=false
     CLIENT_URL=https://your-frontend-url.onrender.com
     JWT_SECRET=<generate-random-string>
     RAZORPAY_KEY_ID=<your-razorpay-key>
     RAZORPAY_KEY_SECRET=<your-razorpay-secret>
     ```

4. **Deploy**
   - Click "Apply" to deploy both services
   - Wait for build to complete (~5-10 minutes)

---

## 🔧 Environment Variables Setup

### Required for Backend:

```env
# Server
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.onrender.com

# Database (Optional for MVP)
USE_MONGODB=false

# JWT Secret (Generate using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your_generated_secret

# Payment Gateway (Get from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# Google APIs (Optional for MVP - can add later)
GOOGLE_DRIVE_CLIENT_EMAIL=
GOOGLE_DRIVE_PRIVATE_KEY=
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_SHEETS_ID=
```

### Update Frontend Environment:

After backend is deployed, update client's API URL:
1. Go to client service settings
2. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
3. Redeploy frontend

---

## 📡 Service URLs

After deployment, you'll get:

**Frontend**: `https://incubez-client.onrender.com`  
**Backend**: `https://incubez-server.onrender.com`

Update these in your environment variables!

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Homepage displays correctly
- [ ] Videos play in pitches section
- [ ] Forms open and validate
- [ ] API health check works: `https://your-backend-url.onrender.com/api/health`
- [ ] Update `CLIENT_URL` in backend env vars
- [ ] Update `VITE_API_URL` in frontend env vars
- [ ] Test form submission (will need payment keys)

---

## 🔄 Auto-Deploy Setup

Render automatically redeploys when you push to GitHub:

1. **Connect GitHub**: Done during setup
2. **Auto-Deploy Branch**: `main` or `master`
3. **Push to GitHub**: 
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   ```
4. **Render rebuilds automatically**

---

## 💰 Pricing

### Free Tier (Perfect for MVP):

**Static Site (Frontend)**
- ✅ Free forever
- ✅ 100 GB bandwidth/month
- ✅ Global CDN
- ✅ Custom domain
- ✅ Auto SSL

**Web Service (Backend)**
- ✅ Free tier available
- ✅ 750 hours/month
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ First request takes 30-60s to wake up

### Paid Tier ($7/month per service):
- No sleep
- Always instant response
- More bandwidth
- Better performance

---

## 🐛 Troubleshooting

### Frontend Not Loading?
- Check build logs in Render dashboard
- Verify `dist` folder is created
- Check Node version is 18.0.0

### Backend Not Responding?
- Free tier sleeps after inactivity (30-60s wake-up time)
- Check logs for errors
- Verify environment variables are set
- Test: `https://your-backend-url.onrender.com/api/health`

### Videos Not Playing?
- Videos in `client/public/videos/` should be included in build
- Check file names match code
- Verify file sizes aren't too large

### CORS Errors?
- Ensure `CLIENT_URL` in backend matches frontend URL
- Check CORS settings in `server/server.js`

---

## 📞 Support

**Render Documentation**: https://render.com/docs  
**GitHub Issues**: https://github.com/saipavansp/incubez_talent_stories-/issues

---

## 🎯 Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - In Render dashboard → Settings → Custom Domains
   - Add your domain and update DNS

2. **Set up Payment Gateway**
   - Create Razorpay account
   - Add API keys to environment variables
   - Test payment flow

3. **Configure Google APIs** (Later)
   - Set up Google Drive API
   - Set up Google Sheets API
   - Add credentials to environment

4. **Set up MongoDB** (When needed)
   - Create MongoDB Atlas account
   - Get connection string
   - Set `USE_MONGODB=true`
   - Add `MONGODB_URI`

5. **Monitor Performance**
   - Check Render metrics
   - Monitor response times
   - Upgrade to paid tier if needed

---

## 🚀 You're Ready!

Your INCUBEZ Talent Stories platform is now live! 🎉

Share your URL and start connecting founders with talent!
