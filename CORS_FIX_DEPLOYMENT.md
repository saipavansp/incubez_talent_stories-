# 🔧 CORS Fix - Deployment Instructions

## ⚠️ Current Issue:
Your frontend cannot connect to your backend due to CORS policy blocking.

**Error**: `Access-Control-Allow-Origin header is present on the requested resource`

---

## ✅ **Solution - 3 Steps:**

### **Step 1: Update Backend Environment Variables on Render**

Go to your **Backend Service** on Render:
1. Dashboard: https://dashboard.render.com/
2. Select: **incubez-talent-stories** (backend service)
3. Click: **"Environment"** tab
4. Update this variable:

```
Variable: CLIENT_URL
Value: https://incubez-talent-stories-4eyw.onrender.com
```

**Save Changes** → Backend will redeploy (3-5 minutes)

---

### **Step 2: Add Frontend Environment Variable**

Go to your **Frontend Service** on Render:
1. Select: **incubez-talent-stories-4eyw** (frontend static site)
2. Click: **"Environment"** tab
3. Add this NEW variable:

```
Variable: VITE_API_URL
Value: https://incubez-talent-stories.onrender.com
```

**Save Changes** → Frontend will redeploy (2-3 minutes)

---

### **Step 3: Push Backend Code Update**

The backend code has been updated to allow CORS from your frontend.

**Deploy the updated code:**
```bash
git add .
git commit -m "Fix: Update CORS configuration to allow frontend origin"
git push origin main
```

**Render will auto-deploy** when it detects the push (~3-5 minutes)

---

## 🔍 **What Changed in Code:**

### **Backend (`server/server.js`):**
```javascript
// BEFORE (only 1 origin):
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))

// AFTER (multiple origins allowed):
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://incubez-talent-stories-4eyw.onrender.com',
  process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

---

## ✅ **After Deployment - Test It:**

### **1. Check Backend Health:**
Visit: https://incubez-talent-stories.onrender.com/api/health

You should see:
```json
{
  "status": "OK",
  "message": "INCUBEZ Talent Stories API is running",
  "timestamp": "2025-10-28T..."
}
```

### **2. Check Frontend:**
Visit: https://incubez-talent-stories-4eyw.onrender.com

Try submitting a test form with:
- Coupon: `FNDRMET`
- Small test video

### **3. Check Console (No Errors):**
Open browser DevTools (F12) → Console

**Before Fix** (you saw):
```
❌ CORS policy: No 'Access-Control-Allow-Origin' header
❌ ERR_NETWORK
```

**After Fix** (you should see):
```
✅ Form submitted successfully
✅ Application ID: INC-FND-2025-XXXX
```

---

## 🎊 **Expected Result:**

✅ No CORS errors
✅ Form submission works
✅ Video uploads to Google Drive
✅ Data saves to Google Sheets
✅ User receives email confirmation
✅ Success page shows

---

## ⏱️ **Timeline:**

- Backend redeploy: **5 minutes**
- Frontend redeploy: **3 minutes**
- **Total: ~8 minutes**

---

## 🐛 **If Issues Persist:**

### **Check Backend Logs:**
Render Dashboard → Backend Service → **Logs** tab

Look for:
```
✅ Server is running on port 5000
✅ Environment: production
✅ MongoDB connection: (depends on USE_MONGODB)
```

### **Check Frontend Environment:**
Render Dashboard → Frontend Service → **Environment** tab

Verify:
```
VITE_API_URL = https://incubez-talent-stories.onrender.com
```

### **Check Browser Console:**
F12 → Network tab → Filter: Fetch/XHR

Click on failed request → Check:
- Request URL: Should be `https://incubez-talent-stories.onrender.com/api/...`
- Response Headers: Should include `Access-Control-Allow-Origin`

---

## 🚀 **Ready to Deploy!**

Run these commands:
```bash
git add .
git commit -m "Fix: CORS configuration for frontend-backend communication"
git push origin main
```

**Then wait 8 minutes for both services to redeploy!** ⏳

---

## 📞 **Support:**
If you still face issues after following all steps:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Clear browser cache and try again

