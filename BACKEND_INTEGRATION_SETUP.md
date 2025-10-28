# 🔧 Backend Integration Setup Guide

## 📋 **Pending Tasks Overview**

### **What Needs Backend Integration:**
1. 🎥 **Video Upload to Google Drive**
2. 📊 **Data Storage in Google Sheets**
3. 📧 **Email Notifications via Gmail**

### **Current Status:**
- ✅ Frontend forms collect all data
- ✅ Coupon code system working
- ✅ Success page shows
- ⏳ Data not saved permanently (needs backend)

---

## 🎯 **TASK 1: Google Drive API Setup**

### **Purpose:**
- Store user-uploaded videos (Founder pitches, Seeker applications)
- Organize in folders: `Founders_Pitches/`, `Seekers_Applications/`
- Generate shareable links for admin review

### **What You Need to Set Up:**

#### **Step 1: Google Cloud Console**
1. **Go to**: https://console.cloud.google.com/
2. **Create Project** (or use existing):
   - Project Name: "INCUBEZ Talent Stories"
   - Project ID: `incubez-talent-stories`

#### **Step 2: Enable Google Drive API**
1. **APIs & Services** → **Library**
2. **Search**: "Google Drive API"
3. **Click**: Google Drive API
4. **Click**: "Enable"

#### **Step 3: Create Service Account**
1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service Account**
3. **Service Account Details**:
   - Name: `incubez-drive-service`
   - Description: `Service account for INCUBEZ video uploads`
4. **Click**: "Create and Continue"
5. **Skip** role assignment (click "Continue")
6. **Click**: "Done"

#### **Step 4: Generate Service Account Key**
1. **Click** on created service account
2. **Keys** tab → **Add Key** → **Create New Key**
3. **Key Type**: JSON
4. **Click**: "Create"
5. **Download** JSON file (keep it safe!)

#### **Step 5: Create Google Drive Folder**
1. **Go to**: https://drive.google.com/
2. **Create Folder**: "INCUBEZ_Videos"
3. **Inside create subfolders**:
   - `Founders_Pitches/`
   - `Seekers_Applications/`
4. **Right-click** main folder → **Share**
5. **Add** service account email (from JSON file)
6. **Permission**: Editor
7. **Copy Folder ID** from URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

---

## 🎯 **TASK 2: Google Sheets API Setup**

### **Purpose:**
- Store form submission data
- Track application status
- Admin dashboard data source

### **What You Need to Set Up:**

#### **Step 1: Enable Google Sheets API**
1. **Same Google Cloud Project**
2. **APIs & Services** → **Library**
3. **Search**: "Google Sheets API"
4. **Click**: Google Sheets API
5. **Click**: "Enable"

#### **Step 2: Create Google Sheets**
1. **Go to**: https://sheets.google.com/
2. **Create** new spreadsheet
3. **Name**: "INCUBEZ Talent Submissions"

#### **Step 3: Set Up Sheet Structure**

**Sheet 1: Founders_Submissions**
```
Columns (Row 1):
A: ID
B: Application_ID  
C: Founder_Name
D: Email
E: Phone
F: Startup_Name
G: Job_Title
H: Role_Type
I: Video_Drive_Link
J: Submission_Date
K: Payment_Status
L: Coupon_Used
M: Amount_Paid
N: Status
```

**Sheet 2: Seekers_Applications**
```
Columns (Row 1):
A: ID
B: Application_ID
C: Full_Name
D: Email
E: Phone
F: Current_Role
G: Preferred_Role
H: Video_Drive_Link
I: Submission_Date
J: Payment_Status
K: Coupon_Used
L: Amount_Paid
M: Status
```

#### **Step 4: Share Sheet with Service Account**
1. **Click**: "Share" button
2. **Add**: Service account email (same as Drive)
3. **Permission**: Editor
4. **Copy Sheet ID** from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

---

## 🎯 **TASK 3: Gmail SMTP Setup**

### **Purpose:**
- Send confirmation emails to users
- Send notifications to admin
- Professional email communication

### **What You Need to Set Up:**

#### **Step 1: Gmail App Password**
1. **Go to**: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (enable if not already)
3. **Security** → **App passwords**
4. **Select app**: Mail
5. **Select device**: Other (custom name)
6. **Name**: "INCUBEZ Talent Platform"
7. **Generate** → Copy the 16-character password

#### **Step 2: Create Dedicated Gmail Account (Recommended)**
- **Email**: `talent@incubez.com` or `noreply@incubez.com`
- **Purpose**: Dedicated for sending platform emails
- **Benefits**: Professional, separate from personal email

#### **Step 3: SMTP Configuration**
```
Host: smtp.gmail.com
Port: 587
Security: STARTTLS
Username: your-email@gmail.com
Password: 16-character-app-password (not your regular password)
```

---

## 📝 **Environment Variables You'll Need**

### **After Setup, Add These to Render:**

```env
# Google Drive API
GOOGLE_DRIVE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j

# Google Sheets API  
GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j_different_id

# Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# Enable integrations
USE_GOOGLE_DRIVE=true
USE_GOOGLE_SHEETS=true
USE_EMAIL_NOTIFICATIONS=true
```

---

## 🔧 **Code Changes Needed**

### **After You Get Credentials:**

#### **Step 1: Update Server Environment**
Add all environment variables to Render backend service

#### **Step 2: Uncomment Integration Code**
In these files, uncomment the marked sections:
- `client/src/components/forms/FounderPitchForm.jsx`
- `client/src/components/forms/SeekerApplicationForm.jsx`
- `server/src/controllers/founderController.js`
- `server/src/controllers/seekerController.js`

#### **Step 3: Create Service Files**
I'll create these when you have credentials:
- `server/src/services/googleDriveService.js`
- `server/src/services/googleSheetsService.js`
- `server/src/services/emailService.js`

---

## 📧 **Email Templates Needed**

### **Confirmation Email (User)**:
```
Subject: Application Submitted Successfully - INCUBEZ Talent Stories

Dear [Name],

Your application has been submitted successfully!

Application ID: [ID]
Amount Paid: ₹[Amount]
Status: Under Review

We'll review your submission within 24-48 hours.

Best regards,
INCUBEZ Team
```

### **Admin Notification Email**:
```
Subject: New Application Submitted - [Type]

New [Founder/Seeker] application received:

Name: [Name]
Email: [Email]
Company: [Company]
Video: [Drive Link]

Review at: [Admin Dashboard Link]
```

---

## ⏱️ **Time Estimates**

### **Setup Time:**
- Google Cloud setup: 30 minutes
- Google Drive/Sheets: 20 minutes
- Gmail SMTP: 10 minutes
- **Total**: ~1 hour

### **Development Time:**
- Service implementations: 2-3 hours
- Testing: 1 hour
- **Total**: ~4 hours

---

## 🎯 **Priority Order**

### **Phase 1 (Essential)**:
1. **Google Drive** - Video storage
2. **Google Sheets** - Data tracking
3. **Gmail** - User confirmations

### **Phase 2 (Nice to Have)**:
4. MongoDB (if you want database instead of Sheets)
5. Advanced email templates
6. Admin dashboard

---

## 🚀 **Deployment Strategy**

### **Current (MVP)**:
```
Deploy Now → Users can test → Forms work → No data saved
```

### **After Integration**:
```
Add Credentials → Uncomment Code → Redeploy → Full Functionality
```

---

## 📞 **What You Need to Do:**

### **Before I Start Coding:**

1. **Set up Google Cloud Project** (30 min)
   - Enable Drive & Sheets APIs
   - Create service account
   - Download JSON credentials

2. **Create Google Drive Folder** (10 min)
   - Share with service account
   - Get folder ID

3. **Create Google Sheet** (10 min)
   - Set up columns as specified
   - Share with service account
   - Get sheet ID

4. **Set up Gmail App Password** (10 min)
   - Enable 2FA
   - Generate app password

5. **Send Me Credentials** (Securely)
   - Service account JSON
   - Drive folder ID
   - Sheet ID
   - Gmail credentials

### **Then I'll:**
1. Create service files
2. Implement integrations
3. Test everything
4. Deploy with full functionality

---

## 🔒 **Security Notes**

- **Never share credentials publicly**
- **Use environment variables only**
- **Service account has limited permissions**
- **App password is not your main Gmail password**
- **Credentials only work for your specific project**

---

## 📋 **Quick Checklist**

**Google Cloud Setup:**
- [ ] Project created
- [ ] Drive API enabled
- [ ] Sheets API enabled
- [ ] Service account created
- [ ] JSON key downloaded

**Google Drive:**
- [ ] INCUBEZ_Videos folder created
- [ ] Subfolders created (Founders_Pitches, Seekers_Applications)
- [ ] Shared with service account
- [ ] Folder ID copied

**Google Sheets:**
- [ ] Spreadsheet created
- [ ] Columns set up (Founders & Seekers sheets)
- [ ] Shared with service account
- [ ] Sheet ID copied

**Gmail:**
- [ ] 2FA enabled
- [ ] App password generated
- [ ] SMTP details noted

**Ready for Integration:**
- [ ] All credentials collected
- [ ] Environment variables ready
- [ ] Ready to implement services

---

## 🎉 **After Integration Complete**

Users will get:
- ✅ Video uploaded to Google Drive
- ✅ Data saved in Google Sheets
- ✅ Confirmation email sent
- ✅ Admin notification sent
- ✅ Application tracking
- ✅ Full audit trail

**Let me know when you have the credentials ready!** 🚀
