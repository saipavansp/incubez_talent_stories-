# 🚀 Google Drive, Sheets & Gmail Setup - Step by Step

## 📋 **What We're Setting Up**

### **Google Drive Structure:**
```
INCUBEZ_Videos/
├── Founders_Pitches/
│   ├── rajesh-kumar_INC-FND-2025-0001.mp4
│   ├── priya-sharma_INC-FND-2025-0002.mp4
│   └── ...
└── Seekers_Applications/
    ├── amit-patel_INC-SKR-2025-0001.mp4
    ├── neha-gupta_INC-SKR-2025-0002.mp4
    └── ...
```

### **Google Sheets Structure:**
```
Sheet 1: Founders_Submissions
Sheet 2: Seekers_Applications
```

### **Video Naming Format:**
- Founder: `firstname-lastname_INC-FND-2025-0001.mp4`
- Seeker: `firstname-lastname_INC-SKR-2025-0001.mp4`

---

# 📝 **STEP-BY-STEP SETUP GUIDE**

## 🎯 **PART 1: Google Cloud Console Setup (30 minutes)**

### **Step 1.1: Create Google Cloud Project**

1. **Open**: https://console.cloud.google.com/
2. **Sign in** with your Gmail account
3. **Top navigation bar** → Click project dropdown
4. **Click**: "New Project"
5. **Enter details**:
   ```
   Project Name: INCUBEZ Talent Stories
   Organization: (leave as No Organization)
   Location: (leave default)
   ```
6. **Click**: "CREATE"
7. **Wait** 30 seconds for project to be created
8. **Select** the new project from dropdown

---

### **Step 1.2: Enable Google Drive API**

1. **Left menu** → **APIs & Services** → **Library**
2. **Search bar** → Type: "Google Drive API"
3. **Click**: "Google Drive API" (first result)
4. **Click**: "ENABLE" button
5. **Wait** for confirmation (green checkmark)

---

### **Step 1.3: Enable Google Sheets API**

1. **Go back to Library** (click "Library" in left menu)
2. **Search bar** → Type: "Google Sheets API"
3. **Click**: "Google Sheets API"
4. **Click**: "ENABLE" button
5. **Wait** for confirmation

---

### **Step 1.4: Create Service Account**

1. **Left menu** → **APIs & Services** → **Credentials**
2. **Top bar** → Click **"+ CREATE CREDENTIALS"**
3. **Select**: "Service account"
4. **Service account details**:
   ```
   Service account name: incubez-service
   Service account ID: incubez-service (auto-filled)
   Description: Service account for INCUBEZ video uploads and data storage
   ```
5. **Click**: "CREATE AND CONTINUE"
6. **Grant access** (Optional):
   - Skip this step
   - Click "CONTINUE"
7. **Grant users access** (Optional):
   - Skip this step
   - Click "DONE"

---

### **Step 1.5: Create Service Account Key (IMPORTANT!)**

1. **You'll see** service accounts list
2. **Click** on the service account you just created (`incubez-service@...`)
3. **Click** the **"KEYS"** tab (top menu)
4. **Click**: "ADD KEY" → "Create new key"
5. **Key type**: Select **JSON**
6. **Click**: "CREATE"
7. **A JSON file downloads** to your computer
8. **KEEP THIS FILE SAFE!** (contains credentials)
9. **Rename** the file to: `incubez-service-account.json`

---

### **Step 1.6: Copy Service Account Email**

1. **Open** the downloaded JSON file
2. **Find** this line: `"client_email": "incubez-service@....iam.gserviceaccount.com"`
3. **Copy** the email address (you'll need it next)
4. **Example**: `incubez-service@incubez-talent-stories.iam.gserviceaccount.com`

---

## 🎯 **PART 2: Google Drive Setup (15 minutes)**

### **Step 2.1: Create Main Folder**

1. **Open**: https://drive.google.com/
2. **Sign in** with your Gmail
3. **Click**: "+ New" (top left)
4. **Select**: "Folder"
5. **Name**: `INCUBEZ_Videos`
6. **Click**: "Create"

---

### **Step 2.2: Create Subfolders**

1. **Double-click** to open `INCUBEZ_Videos` folder
2. **Create first subfolder**:
   - Click "+ New" → "Folder"
   - Name: `Founders_Pitches`
   - Click "Create"
3. **Create second subfolder**:
   - Click "+ New" → "Folder"
   - Name: `Seekers_Applications`
   - Click "Create"

**Your structure should look like**:
```
INCUBEZ_Videos/
├── Founders_Pitches/
└── Seekers_Applications/
```

---

### **Step 2.3: Share with Service Account**

1. **Go back** to main `INCUBEZ_Videos` folder
2. **Right-click** on folder → **"Share"**
3. **In "Add people" box**, paste your **service account email**
   - Example: `incubez-service@incubez-talent-stories.iam.gserviceaccount.com`
4. **Role**: Select **"Editor"**
5. **Uncheck**: "Notify people" (service account doesn't need email)
6. **Click**: "Share"

---

### **Step 2.4: Get Folder ID**

1. **Open** `INCUBEZ_Videos` folder
2. **Look at URL** in browser:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
                                            ↑ This is your Folder ID
   ```
3. **Copy** the Folder ID (everything after `/folders/`)
4. **Example**: `1a2b3c4d5e6f7g8h9i0j`
5. **Save this** - you'll need it for environment variables

---

## 🎯 **PART 3: Google Sheets Setup (20 minutes)**

### **Step 3.1: Create Spreadsheet**

1. **Open**: https://sheets.google.com/
2. **Click**: "+ Blank spreadsheet"
3. **Top left** → Rename to: `INCUBEZ Talent Submissions`

---

### **Step 3.2: Set Up Founders Sheet**

1. **Rename Sheet 1**:
   - Right-click "Sheet1" tab → "Rename"
   - Name: `Founders_Submissions`

2. **Add Column Headers** (Row 1):
   ```
   A1: ID
   B1: Application_ID
   C1: Founder_Name
   D1: Email
   E1: Phone
   F1: LinkedIn
   G1: Startup_Name
   H1: Domain
   I1: Stage
   J1: Job_Title
   K1: Role_Type
   L1: Experience_Level
   M1: Location_Preference
   N1: Compensation_Type
   O1: Video_Drive_Link
   P1: Video_Drive_ID
   Q1: Submission_Date
   R1: Coupon_Used
   S1: Amount_Paid
   T1: Status
   ```

3. **Format Header Row**:
   - Select Row 1
   - Bold text
   - Background color: Light gray
   - Text color: Black

---

### **Step 3.3: Set Up Seekers Sheet**

1. **Create new sheet**:
   - Click "+" icon at bottom left
   - Rename to: `Seekers_Applications`

2. **Add Column Headers** (Row 1):
   ```
   A1: ID
   B1: Application_ID
   C1: Full_Name
   D1: Email
   E1: Phone
   F1: LinkedIn
   G1: Current_Location
   H1: Current_Role
   I1: Years_Experience
   J1: Key_Skills
   K1: Domain_Expertise
   L1: Preferred_Role_Type
   M1: Preferred_Startup_Stage
   N1: Industry_Preferences
   O1: Location_Preference
   P1: Availability
   Q1: Video_Drive_Link
   R1: Video_Drive_ID
   S1: Submission_Date
   T1: Coupon_Used
   U1: Amount_Paid
   V1: Status
   ```

3. **Format Header Row** (same as above)

---

### **Step 3.4: Share with Service Account**

1. **Click**: "Share" button (top right)
2. **Add**: Your service account email
   - Example: `incubez-service@incubez-talent-stories.iam.gserviceaccount.com`
3. **Role**: Editor
4. **Uncheck**: "Notify people"
5. **Click**: "Share"

---

### **Step 3.5: Get Sheet ID**

1. **Look at URL**:
   ```
   https://docs.google.com/spreadsheets/d/1x2y3z4a5b6c7d8e9f0g/edit
                                          ↑ This is your Sheet ID
   ```
2. **Copy** the Sheet ID (between `/d/` and `/edit`)
3. **Example**: `1x2y3z4a5b6c7d8e9f0g`
4. **Save this** - you'll need it

---

## 🎯 **PART 4: Gmail SMTP Setup (15 minutes)**

### **Step 4.1: Enable 2-Factor Authentication**

1. **Open**: https://myaccount.google.com/security
2. **Find**: "2-Step Verification"
3. **If not enabled**:
   - Click "2-Step Verification"
   - Follow setup wizard
   - Verify with phone number
   - Complete setup

---

### **Step 4.2: Generate App Password**

1. **Open**: https://myaccount.google.com/apppasswords
   - Or search "App passwords" in Google Account settings
2. **You'll see**: "App passwords" page
3. **Select app**: Type "INCUBEZ Talent Platform"
4. **Click**: "Create"
5. **You'll get**: 16-character password (like: `abcd efgh ijkl mnop`)
6. **Copy this password** immediately
7. **Save it** - you can't see it again!

**Important**: This is NOT your Gmail password!

---

## 🎯 **PART 5: Collect All Credentials**

After completing all steps above, you'll have:

### **✅ Checklist - Make Sure You Have:**

```
✓ Service Account JSON File
  - File name: incubez-service-account.json
  - Contains: client_email and private_key

✓ Google Drive Folder ID
  - Example: 1a2b3c4d5e6f7g8h9i0j
  - From: INCUBEZ_Videos folder URL

✓ Google Sheets ID
  - Example: 1x2y3z4a5b6c7d8e9f0g
  - From: INCUBEZ Talent Submissions spreadsheet URL

✓ Gmail Account & App Password
  - Email: your-gmail@gmail.com
  - App Password: 16-character code (abcd efgh ijkl mnop)
  - NOT your regular Gmail password!
```

---

## 📋 **Format Your Credentials**

### **Open the Service Account JSON file and find:**

```json
{
  "type": "service_account",
  "project_id": "incubez-talent-stories",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "incubez-service@incubez-talent-stories.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

**You need**:
- `client_email` value
- `private_key` value (entire thing including BEGIN/END lines)

---

## 🔐 **Environment Variables for Render**

**After you have all credentials, add these to Render Backend:**

```env
# Google Drive API
GOOGLE_DRIVE_CLIENT_EMAIL=incubez-service@incubez-talent-stories.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...your key...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j

# Google Sheets API
GOOGLE_SHEETS_ID=1x2y3z4a5b6c7d8e9f0g

# Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password

# Enable integrations
USE_GOOGLE_DRIVE=true
USE_GOOGLE_SHEETS=true
USE_EMAIL_NOTIFICATIONS=true
```

---

## ⚠️ **IMPORTANT NOTES**

### **Private Key Format:**
The private key MUST include:
- Opening quotes: `"`
- BEGIN line: `-----BEGIN PRIVATE KEY-----\n`
- The key content with `\n` for line breaks
- END line: `\n-----END PRIVATE KEY-----\n`
- Closing quotes: `"`

**Example**:
```
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...(long string)...abc123\n-----END PRIVATE KEY-----\n"
```

### **Security:**
- ✅ Never commit JSON file to GitHub
- ✅ Never share credentials publicly
- ✅ Use environment variables only
- ✅ Keep JSON file in safe location

---

## 🎯 **After Setup - Send Me:**

### **Method 1: Securely Share Credentials**

Create a text file with:

```
=== GOOGLE DRIVE ===
Client Email: incubez-service@incubez-talent-stories.iam.gserviceaccount.com
Private Key: (paste the entire private key including BEGIN/END)
Folder ID: 1a2b3c4d5e6f7g8h9i0j

=== GOOGLE SHEETS ===
Sheet ID: 1x2y3z4a5b6c7d8e9f0g

=== GMAIL ===
Email: your-gmail@gmail.com
App Password: abcd efgh ijkl mnop
```

### **Method 2: Or Just Share:**
1. Service account JSON file
2. Drive folder ID
3. Sheet ID
4. Gmail credentials

---

## ✅ **Verification Checklist**

Before sharing credentials, verify:

**Google Drive:**
- [ ] INCUBEZ_Videos folder created
- [ ] Founders_Pitches subfolder exists
- [ ] Seekers_Applications subfolder exists
- [ ] Service account has Editor permission
- [ ] Folder ID copied correctly

**Google Sheets:**
- [ ] Spreadsheet created
- [ ] Founders_Submissions sheet with headers
- [ ] Seekers_Applications sheet with headers
- [ ] Service account has Editor permission
- [ ] Sheet ID copied correctly

**Gmail:**
- [ ] 2FA enabled
- [ ] App password generated (16 characters)
- [ ] Password saved securely

**Service Account:**
- [ ] JSON file downloaded
- [ ] Client email copied
- [ ] Private key ready

---

## 🔧 **What I'll Do Next**

Once you provide credentials:

### **1. Create Service Files** (2 hours)
```javascript
server/src/services/
├── googleDriveService.js    // Upload videos, generate links
├── googleSheetsService.js   // Save form data
└── emailService.js          // Send confirmations
```

### **2. Implement Video Upload Logic**
- Accept video from form
- Generate filename: `name_application-id.mp4`
- Upload to correct Drive folder (Founders/Seekers)
- Get shareable link
- Return Drive file ID

### **3. Implement Sheets Storage**
- Parse form data
- Format for Google Sheets
- Append row to correct sheet
- Include all fields + Drive link

### **4. Implement Email Notifications**
- Create email templates
- Send confirmation to user
- Send notification to admin
- Include application ID and details

### **5. Test Everything**
- Test video upload
- Test data saving
- Test email sending
- Verify all works

### **6. Deploy & Go Live**
- Update environment variables on Render
- Redeploy with new code
- Full functionality live!

---

## ⏱️ **Timeline**

**Your Part** (Setup):
- Google Cloud: 30 min
- Google Drive: 15 min
- Google Sheets: 20 min
- Gmail: 10 min
- **Total**: ~1.5 hours

**My Part** (Development):
- Service implementations: 2-3 hours
- Testing: 1 hour
- Deployment: 30 min
- **Total**: ~4 hours

**Complete Integration**: Same day! ✅

---

## 🎯 **Start Here:**

1. **Go to**: https://console.cloud.google.com/
2. **Follow steps 1.1 through 1.6** above
3. **Then continue** to Drive and Sheets setup
4. **Share credentials** with me
5. **I'll implement** the integration
6. **Deploy & test**!

---

## 📞 **Questions?**

If you get stuck:
- Check if project is selected (top bar)
- Make sure APIs are enabled (green checkmark)
- Verify service account email is correct
- Double-check folder/sheet sharing

**Ready to start? Follow Step 1.1!** 🚀
