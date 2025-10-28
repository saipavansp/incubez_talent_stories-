# 🔐 Render Environment Variables - Complete Setup

## 🎯 **Add These to Render Backend Service**

### **Go to Render Dashboard:**
1. https://dashboard.render.com/
2. Select your **backend service** (incubez-server)
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
Click the "Generate" button (or use any random string)
```

---

### **4. Google Drive API** ⭐ **YOUR CREDENTIALS**

```
Variable: GOOGLE_DRIVE_CLIENT_EMAIL
Value: incubez-service@incubez-talent-stories.iam.gserviceaccount.com
```

```
Variable: GOOGLE_DRIVE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRsuC+Bm6Txj3+\nQLQsWXJlItlgl0sF8rarP4hzENEnjZs6w5Iylz1hDr9TnhuSMyU0s2U9RbLFmgg6\neJltrVijBMmyHkxPVYo0zmOLj1BnH9oIdqI4Gffl8hmZq4y79prAFdag2CdE9Rb3\n5ulwICauwCWw+Xi7NJVXdBrKfVgm8l7FUFziP5KBiSSJMehA+SscNo0HHv4rTtSv\nsaNM+T8t4vkhv8y+MSf6jAnZlRn9LkF4fadn6KEjYtTT/RIeYcgSsX4Bt5xTpKc5\nTCqek3MVhcL8lIM6VwzXcd1ccou3czzx+oMYoht9cUo0rKip5Lv4/ycLZB4NrsrY\ngNo3PYT7AgMBAAECggEAAcbi7KP1T+nqyzq/zBhomxQehMOuGRDOHMlfCJ/ohc3y\nC3TDdQufCNwtIYeXcuJdZa2XerDFK7N7Gl5nPmys8ZoFc4Lvi+83n+xCdQOeiiEq\nTHlk39Yofu78Pzca7C98xDVAf6sVOhpcOsw0HNpzjsuGBj027q8qt3ZTu8owHbRa\nzFPb82keGqXBIC3uD4DCNs8cB4XyAgnmggA+r7QRCxfPuTqF+xbrSgNMx/bC1XIn\nLP6xdsbLt/XgQd32aQCNt7g9fitw1Mw71ZQsq1J5me0MkftqXP/yMlDl0fNBmasM\nNHliS1ouiYDiEmBn+qF/BaMu2+z9eVnVJTnkLm+D4QKBgQDyVbqyzmXmBTIjSp+S\nSj/3RnifcQxSw3RN3L0X6wuNCSDPD+h0H8/KeHWCM/3xpQSI32Ux40oi6WzHxHdG\nrjomz4YTGiEdCXoa/PXNSBbqvLISO9NGKCO2lmwIEXLujRb1PYilR/0LM0akRV2C\nw2Y0fts4LJQG/LyBj3SBrBR36QKBgQDdhgYEJwbEQgOEgHd88qhuHkZM3zo5FsM5\nu0Bxl1zo7VqHBDSFqpDTZdmfCREaug0pKeewxLrYib6h7GLwfJ47aZq5Y+48zEma\ndX7RH5AVOS4fOJ4LZpJc5O+kpwGqQvR2o2yYU/WiGxsrp3uLwseGVwLSFeSmbcUw\nNiGEVw4rQwKBgQDh192gCFTU0uDQHRqrxoDonYeK6FtYwokgi2i64rWoIequrp+v\noXoQssSorHWs/2JDgRaZML8F3E8hucqDV5ogU2UbZk2X9x4SCs+1GcspxuOZtKGI\nj54A6x0RQ9m90kWkFk3D41xDVO0v6OlmFV6p69O3/WuTO3UetagZtVp6CQKBgGmp\nr9zzMIsUYdEl5di3dhdwYV/xajgo313+LzL/W9XOwUt9ef/357St9Cuji4EQFY74\n6garD+SRb1iVBGxpRKBaMu8S92QQnVsLiD3/rB4zdAh4XQpbFp0wpg4HiwfHgAvG\nz9mo0pVMEJ21+XwkoD836aSDxNiNq2zfpQUW8S85AoGBAIfRyHrKqdCivdi9K7bb\n80m77H4NaB/ASCIWXe7h7j+dFsXoMGoordnp4XSit5JTaOB0Z+bEGfeZnpWtFXCO\nHg5C6o1X4cE4m6kzPoeRhIX79u5IXgeVKbALTuiPOPhZsLgBg4P70z+Sg65Fsaf9\n/wmaI7hEp64zENWP5+cdnSoQ\n-----END PRIVATE KEY-----\n

⚠️ IMPORTANT: Copy the ENTIRE value including quotes and \n characters!
```

```
Variable: GOOGLE_DRIVE_FOLDER_ID
Value: 16vGp6Hz9AVQFl9CuM06rz2j1nG8g2MkY
```

---

### **5. Google Sheets API** ⭐ **YOUR CREDENTIALS**

```
Variable: GOOGLE_SHEETS_ID
Value: 1_a4okLiH-3LB82I5PBo8fl9RFeRHZ7Fc21LRoBAKiyg
```

---

### **6. Gmail SMTP** ⏳ **ADD YOUR GMAIL**

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
Variable: USE_GOOGLE_DRIVE
Value: true
```

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

## ✅ **Complete Environment Variables List**

Copy this checklist and check off as you add each one:

- [ ] PORT = 5000
- [ ] NODE_ENV = production
- [ ] CLIENT_URL = https://your-frontend-url.onrender.com
- [ ] USE_MONGODB = false
- [ ] JWT_SECRET = (generate or use random string)
- [ ] GOOGLE_DRIVE_CLIENT_EMAIL = incubez-service@incubez-talent-stories.iam.gserviceaccount.com
- [ ] GOOGLE_DRIVE_PRIVATE_KEY = (the long private key)
- [ ] GOOGLE_DRIVE_FOLDER_ID = 16vGp6Hz9AVQFl9CuM06rz2j1nG8g2MkY
- [ ] GOOGLE_SHEETS_ID = 1_a4okLiH-3LB82I5PBo8fl9RFeRHZ7Fc21LRoBAKiyg
- [ ] EMAIL_HOST = smtp.gmail.com
- [ ] EMAIL_PORT = 587
- [ ] EMAIL_USER = incubez.ott@gmail.com
- [ ] EMAIL_PASS = kvildtbqwptoudlv
- [ ] ADMIN_EMAIL = incubez.ott@gmail.com
- [ ] USE_GOOGLE_DRIVE = true
- [ ] USE_GOOGLE_SHEETS = true
- [ ] USE_EMAIL_NOTIFICATIONS = true (or false if Gmail not set up)

---

## ⚠️ **IMPORTANT NOTES:**

### **Private Key Format:**
When pasting the private key in Render:
- Include the opening quote: `"`
- Include all `\n` characters (don't replace them with actual line breaks!)
- Include the closing quote: `"`
- Example: `"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"`

### **Gmail App Password:**
- This is NOT your regular Gmail password
- It's a 16-character code like: `abcd efgh ijkl mnop`
- Remove spaces when entering: `abcdefghijklmnop`
- If you don't have it, follow: https://myaccount.google.com/apppasswords

---

## 🚀 **After Adding Environment Variables:**

1. **Click "Save Changes"** in Render
2. **Backend will redeploy** automatically (~3-5 minutes)
3. **Check logs** for any errors
4. **Test API**: https://your-backend-url.onrender.com/api/health

---

## ✅ **Frontend Environment Variables** ⭐ IMPORTANT!

### **For Render Static Site (Frontend):**

Go to your **Frontend Service** on Render:
1. Click on **"Environment"** tab
2. Add this environment variable:

```
Variable: VITE_API_URL
Value: https://incubez-talent-stories.onrender.com
```

**This tells your frontend where to send API requests!**

---

## 🎊 **What Will Work After Deployment:**

✅ User fills form
✅ User uploads video
✅ User applies coupon (FNDRMET)
✅ User submits

**Then Backend:**
1. ✅ Uploads video to Google Drive
2. ✅ Names video: `firstname-lastname_INC-FND-2025-0001.mp4`
3. ✅ Saves to correct folder (Founders/Seekers)
4. ✅ Saves all data to Google Sheets
5. ✅ Sends beautiful confirmation email to user
6. ✅ Returns success to frontend

**User sees:**
✅ Success page with Application ID
✅ Beautiful email confirmation in inbox with all details

**You (admin) can access:**
✅ All data in Google Sheets (organized, live)
✅ All videos in Google Drive (properly named)
✅ No spam emails - check Sheets for new submissions!

---

## 🚀 **You're Ready to Deploy!**

**All backend services are implemented and ready to use!** 🎉
