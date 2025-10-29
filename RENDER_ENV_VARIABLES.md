# 🔐 Render Environment Variables - Complete Setup (Cloudflare R2)

## 🎯 **Add These to Render Backend Service**

### **Go to Render Dashboard:**
1. https://dashboard.render.com/
2. Select your **backend service** (incubez-talent-stories)
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add each variable below

---

## ✅ **REQUIRED ENVIRONMENT VARIABLES**

### **1. Server Configuration**

```
Variable: PORT
Value: 5000
```

```
Variable: NODE_ENV
Value: production
```

```
Variable: CLIENT_URL
Value: https://incubez-talent-stories-4eyw.onrender.com
```

---

### **2. Database (Optional)**

```
Variable: USE_MONGODB
Value: false
```

---

### **3. JWT Secret**

```
Variable: JWT_SECRET
Value: incubez_super_secret_jwt_token_2025_production
```

💡 **Tip:** Use Render's "Generate" button for a secure random string

---

### **4. Cloudflare R2 Storage** ⭐ **YOUR CREDENTIALS**

```
Variable: R2_ACCOUNT_ID
Value: 597b05798abe68f19ebdff00cf87788a
```

```
Variable: R2_ACCESS_KEY_ID
Value: d70b275304b7519baf107ba05e0ed29b
```

```
Variable: R2_SECRET_ACCESS_KEY
Value: c52b379a902b4be9387faed9a0c6286f7eaf0f14eb2c4623dea32d114d05c98d
```

```
Variable: R2_BUCKET_NAME
Value: incubeztalent
```

```
Variable: R2_ENDPOINT
Value: https://597b05798abe68f19ebdff00cf87788a.r2.cloudflarestorage.com
```

---

### **5. Google Sheets API** ⭐ **YOUR CREDENTIALS**

```
Variable: GOOGLE_SHEETS_ID
Value: 1_a4okLiH-3LB82I5PBo8fl9RFeRHZ7Fc21LRoBAKiyg
```

---

### **6. Gmail SMTP** ⭐ **YOUR CREDENTIALS**

```
Variable: EMAIL_HOST
Value: smtp.gmail.com
```

```
Variable: EMAIL_PORT
Value: 587
```

```
Variable: EMAIL_USER
Value: incubez.ott@gmail.com
```

```
Variable: EMAIL_PASS
Value: kvildtbqwptoudlv
```

```
Variable: ADMIN_EMAIL
Value: incubez.ott@gmail.com
```

---

### **7. Enable Integrations** ⭐ **IMPORTANT**

```
Variable: USE_GOOGLE_SHEETS
Value: true
```

```
Variable: USE_EMAIL_NOTIFICATIONS
Value: true
```

---

### **8. Payment Gateway** (Optional for now)

```
Variable: RAZORPAY_KEY_ID
Value: (leave empty for now)
```

```
Variable: RAZORPAY_KEY_SECRET
Value: (leave empty for now)
```

---

## ✅ **Complete Environment Variables Checklist**

Copy this checklist and check off as you add each one:

### **Backend Service (incubez-talent-stories):**
- [ ] PORT = 5000
- [ ] NODE_ENV = production
- [ ] CLIENT_URL = https://incubez-talent-stories-4eyw.onrender.com
- [ ] USE_MONGODB = false
- [ ] JWT_SECRET = incubez_super_secret_jwt_token_2025_production
- [ ] R2_ACCOUNT_ID = 597b05798abe68f19ebdff00cf87788a
- [ ] R2_ACCESS_KEY_ID = d70b275304b7519baf107ba05e0ed29b
- [ ] R2_SECRET_ACCESS_KEY = c52b379a902b4be9387faed9a0c6286f7eaf0f14eb2c4623dea32d114d05c98d
- [ ] R2_BUCKET_NAME = incubeztalent
- [ ] R2_ENDPOINT = https://597b05798abe68f19ebdff00cf87788a.r2.cloudflarestorage.com
- [ ] GOOGLE_SHEETS_ID = 1_a4okLiH-3LB82I5PBo8fl9RFeRHZ7Fc21LRoBAKiyg
- [ ] EMAIL_HOST = smtp.gmail.com
- [ ] EMAIL_PORT = 587
- [ ] EMAIL_USER = incubez.ott@gmail.com
- [ ] EMAIL_PASS = kvildtbqwptoudlv
- [ ] ADMIN_EMAIL = incubez.ott@gmail.com
- [ ] USE_GOOGLE_SHEETS = true
- [ ] USE_EMAIL_NOTIFICATIONS = true

### **Frontend Service (incubez-talent-stories-4eyw):**
- [ ] VITE_API_URL = https://incubez-talent-stories.onrender.com

---

## 🗑️ **REMOVE THESE OLD GOOGLE DRIVE VARIABLES** ⚠️

If you previously set up Google Drive, **DELETE** these variables from Render:

- ❌ `GOOGLE_DRIVE_CLIENT_EMAIL`
- ❌ `GOOGLE_DRIVE_PRIVATE_KEY`
- ❌ `GOOGLE_DRIVE_FOLDER_ID`
- ❌ `USE_GOOGLE_DRIVE`

**We're now using Cloudflare R2 for video storage!**

---

## ⚠️ **IMPORTANT NOTES:**

### **R2 Credentials Security:**
- **NEVER** commit these credentials to Git
- Keep them in Render environment variables only
- These credentials give access to your R2 bucket

### **R2 Public Access:**
- Videos are publicly accessible via: `https://pub-6ad37bc5f3074f2db41fce494eea4da6.r2.dev/`
- Your bucket is configured for public read access
- File URLs are automatically generated after upload

### **Gmail App Password:**
- This is NOT your regular Gmail password
- It's a 16-character code like: `kvil dtbq wpto udlv`
- Remove spaces when entering: `kvildtbqwptoudlv`
- If you don't have it, follow: https://myaccount.google.com/apppasswords

---

## 🚀 **After Adding Environment Variables:**

1. **Save Changes** in Render
2. **Backend will redeploy** automatically (~3-5 minutes)
3. **Check logs** for successful startup
4. **Test API**: https://incubez-talent-stories.onrender.com/api/health

---

## 📋 **Frontend Environment Variables**

### **For Render Static Site (Frontend):**

Go to your **Frontend Service** on Render:
1. Click **"Environment"** tab
2. **Remove or fix** the incorrect variable:
   - ❌ Delete: `NAME_OF_VARIABLE`
3. Add this environment variable:

```
Variable: VITE_API_URL
Value: https://incubez-talent-stories.onrender.com
```

**This tells your frontend where to send API requests!**

---

## 🎊 **What Will Work After Deployment:**

✅ User fills form
✅ User uploads video (up to **200MB**)
✅ User applies coupon (FNDRMET)
✅ User submits

**Then Backend:**
1. ✅ Uploads video to **Cloudflare R2**
2. ✅ Names video: `firstname-lastname_INC-FND-2025-0001.mp4`
3. ✅ Organizes in folders: `founders/` or `seekers/`
4. ✅ Generates public video URL
5. ✅ Saves all data to **Google Sheets**
6. ✅ Sends beautiful confirmation email to user
7. ✅ Returns success to frontend

**User sees:**
✅ Success page with Application ID
✅ Beautiful email confirmation with all details

**You (admin) can access:**
✅ All data in **Google Sheets** (organized, live)
✅ All videos in **Cloudflare R2** (properly named, publicly accessible)
✅ Video URLs in Google Sheets for easy viewing

---

## 🎯 **Video Storage Details**

### **Storage Solution:**
- **Service:** Cloudflare R2 (S3-compatible object storage)
- **Bucket:** incubeztalent
- **Max File Size:** 200MB
- **Public URL:** https://pub-6ad37bc5f3074f2db41fce494eea4da6.r2.dev/

### **Folder Structure:**
```
incubeztalent/
├── founders/
│   └── john-doe_INC-FND-2025-0001.mp4
│   └── jane-smith_INC-FND-2025-0002.mp4
└── seekers/
    └── alex-johnson_INC-SKR-2025-0001.mp4
    └── sarah-williams_INC-SKR-2025-0002.mp4
```

### **Video URLs (examples):**
```
https://pub-6ad37bc5f3074f2db41fce494eea4da6.r2.dev/founders/john-doe_INC-FND-2025-0001.mp4
https://pub-6ad37bc5f3074f2db41fce494eea4da6.r2.dev/seekers/alex-johnson_INC-SKR-2025-0001.mp4
```

---

## ✅ **Advantages of Cloudflare R2:**

1. **No Egress Fees** - Free bandwidth (unlike AWS S3)
2. **No Storage Quota Limits** - No service account restrictions
3. **Fast Global CDN** - Videos load quickly worldwide
4. **S3-Compatible** - Easy to migrate if needed
5. **Cost-Effective** - Pay only for storage (~$0.015/GB/month)
6. **Scalable** - Handles unlimited uploads
7. **Public Access** - Direct video URLs for embedding/sharing

---

## 🚀 **You're Ready to Deploy!**

**All backend services are implemented and ready to use!** 🎉

**Next Steps:**
1. Add all environment variables to Render (backend + frontend)
2. Remove old Google Drive variables
3. Deploy and test
4. Submit a test application with a video
5. Check Google Sheets for data
6. Check your email for confirmation
7. Access video via R2 public URL

**Need Help?**
- Check `CLOUDFLARE_R2_SETUP.md` for detailed R2 setup guide
- Check backend logs on Render for any errors
- Test video upload with a small file first

---

## 📞 **Support & Troubleshooting**

### **Common Issues:**

**1. "R2_ACCOUNT_ID is not defined"**
- Solution: Add all R2 environment variables to Render

**2. "Failed to upload to R2"**
- Solution: Check R2 credentials are correct
- Verify R2 bucket exists and has public access enabled

**3. "CORS Error"**
- Solution: Already fixed in code, just redeploy

**4. "Ran out of memory"**
- Solution: Already fixed (using disk storage + streaming)

**5. "File too large"**
- Solution: Limit is now 200MB, compress video if needed

---

**🎊 CONGRATULATIONS! Your platform is production-ready! 🚀**
