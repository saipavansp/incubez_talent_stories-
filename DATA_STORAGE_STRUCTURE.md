# 📊 Data Storage Structure

## 🎥 **Google Drive - Video Storage**

### **Folder Structure:**
```
INCUBEZ_Videos/                                 (Main Folder - Folder ID needed)
├── Founders_Pitches/                          (Subfolder)
│   ├── rajesh-kumar_INC-FND-2025-0001.mp4
│   ├── priya-sharma_INC-FND-2025-0002.mp4
│   ├── amit-singh_INC-FND-2025-0003.mp4
│   └── ...
│
└── Seekers_Applications/                       (Subfolder)
    ├── neha-gupta_INC-SKR-2025-0001.mp4
    ├── rahul-verma_INC-SKR-2025-0002.mp4
    ├── sarah-johnson_INC-SKR-2025-0003.mp4
    └── ...
```

### **Video Naming Convention:**

**Format**: `firstname-lastname_APPLICATION-ID.mp4`

**Examples**:
- Founder: `rajesh-kumar_INC-FND-2025-0001.mp4`
- Seeker: `neha-gupta_INC-SKR-2025-0001.mp4`

**Rules**:
- Convert name to lowercase
- Replace spaces with hyphens
- Remove special characters
- Add underscore separator
- Add application ID
- Extension: `.mp4`

**Code Logic**:
```javascript
// Example
const founderName = "Rajesh Kumar"
const applicationId = "INC-FND-2025-0001"

const filename = `${founderName.toLowerCase().replace(/\s+/g, '-')}_${applicationId}.mp4`
// Result: rajesh-kumar_INC-FND-2025-0001.mp4
```

---

## 📊 **Google Sheets - Data Storage**

### **Sheet 1: Founders_Submissions**

| Column | Field Name | Description | Example |
|--------|------------|-------------|---------|
| A | ID | Auto-increment number | 1, 2, 3... |
| B | Application_ID | Unique ID | INC-FND-2025-0001 |
| C | Founder_Name | Full name | Rajesh Kumar |
| D | Email | Contact email | rajesh@startup.com |
| E | Phone | Phone number | 9876543210 |
| F | LinkedIn | LinkedIn URL | linkedin.com/in/rajesh |
| G | Startup_Name | Company name | HealthTech Pro |
| H | Domain | Industry | HealthTech |
| I | Stage | Startup stage | MVP |
| J | Job_Title | Position title | Co-founder & CTO |
| K | Role_Type | Role category | Co-founder |
| L | Experience_Level | Required experience | 5-10 years |
| M | Location_Preference | Work location | Remote |
| N | Compensation_Type | Payment type | Equity + Salary |
| O | Video_Drive_Link | Shareable video URL | https://drive.google.com/file/d/... |
| P | Video_Drive_ID | Drive file ID | 1abc2def3ghi |
| Q | Submission_Date | Timestamp | 2025-10-28 14:30:45 |
| R | Coupon_Used | Coupon code | FNDRMET |
| S | Amount_Paid | Payment amount | 0 |
| T | Status | Application status | Pending/Approved/Rejected |

---

### **Sheet 2: Seekers_Applications**

| Column | Field Name | Description | Example |
|--------|------------|-------------|---------|
| A | ID | Auto-increment | 1, 2, 3... |
| B | Application_ID | Unique ID | INC-SKR-2025-0001 |
| C | Full_Name | Applicant name | Neha Gupta |
| D | Email | Contact email | neha@example.com |
| E | Phone | Phone number | 9876543210 |
| F | LinkedIn | LinkedIn URL | linkedin.com/in/neha |
| G | Current_Location | Current city | Bangalore, India |
| H | Current_Role | Current position | Senior Engineer |
| I | Years_Experience | Experience level | 5-10 |
| J | Key_Skills | Skills list | React, Node.js, Leadership |
| K | Domain_Expertise | Industries | HealthTech, FinTech |
| L | Preferred_Role_Type | Desired role | Co-founder, EIR |
| M | Preferred_Startup_Stage | Stage preference | MVP, Growth |
| N | Industry_Preferences | Industries | HealthTech, EdTech |
| O | Location_Preference | Work location | Remote |
| P | Availability | Start date | Immediate |
| Q | Video_Drive_Link | Shareable URL | https://drive.google.com/file/d/... |
| R | Video_Drive_ID | Drive file ID | 1xyz2abc3def |
| S | Submission_Date | Timestamp | 2025-10-28 14:30:45 |
| T | Coupon_Used | Coupon code | FNDRMET |
| U | Amount_Paid | Payment | 0 |
| V | Status | Application status | Pending |

---

## 📧 **Email Notifications**

### **Email 1: User Confirmation**

**To**: User's email  
**Subject**: Application Submitted Successfully - INCUBEZ Talent Stories

```
Dear [Name],

Thank you for submitting your application to INCUBEZ Talent Stories!

Application Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Application ID: [Application_ID]
Submitted On: [Date & Time]
Amount Paid: ₹[Amount]
Status: Under Review
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happens next?
• Our team will review your submission within 24-48 hours
• Your video pitch will be made available to relevant matches
• You'll be notified once your application is approved

Track Your Application:
Visit: https://incubez-client.onrender.com/dashboard

Need Help?
Email: talent@incubez.com
Phone: +91 85228 32623

Best regards,
INCUBEZ Team
Hyderabad, India
```

---

### **Email 2: Admin Notification**

**To**: talent@incubez.com  
**Subject**: 🔔 New [Founder/Seeker] Application - [Name]

```
New application submitted!

Application Type: [Founder Pitch / Seeker Application]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETAILS:
Name: [Full Name]
Email: [Email]
Phone: [Phone]
Application ID: [ID]

SPECIFICS:
[For Founders]
- Startup: [Startup Name]
- Position: [Job Title]
- Domain: [Industry]

[For Seekers]
- Current Role: [Role]
- Experience: [Years]
- Looking For: [Preferred Role]

VIDEO:
View Video: [Google Drive Link]
Download: [Direct Download Link]

DATA:
View in Sheet: [Link to Sheets row]

ACTIONS:
• Review video
• Update status in Google Sheets
• Contact if needed

Submitted: [Date & Time]
Amount Paid: ₹[Amount]
Coupon Used: [Coupon Code]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔄 **Complete Flow**

### **User Submits Form**:
```
1. User fills all form fields
2. User uploads video
3. User enters coupon code: FNDRMET
4. User clicks "Submit Application"
    ↓
5. Frontend sends to Backend API
    ↓
6. Backend processes:
   • Generates Application ID
   • Creates filename: name_id.mp4
   • Uploads video to Google Drive (correct folder)
   • Gets Drive shareable link
   • Saves all data to Google Sheets (correct sheet)
   • Sends confirmation email to user
   • Sends notification email to admin
    ↓
7. Backend returns success
    ↓
8. Frontend shows success page with Application ID
```

---

## 📋 **Sample Data Rows**

### **Founders_Submissions Sheet - Row 2:**
```
1 | INC-FND-2025-0001 | Rajesh Kumar | rajesh@startup.com | 9876543210 | linkedin.com/in/rajesh | HealthTech Pro | HealthTech | MVP | Co-founder & CTO | Co-founder | 5-10 years | Remote | Equity + Salary | https://drive.google.com/file/d/1abc | 1abc2def | 2025-10-28 14:30:45 | FNDRMET | 0 | Pending
```

### **Seekers_Applications Sheet - Row 2:**
```
1 | INC-SKR-2025-0001 | Neha Gupta | neha@example.com | 9876543210 | linkedin.com/in/neha | Bangalore | Senior Engineer | 5-10 | React, Node.js | HealthTech, FinTech | Co-founder | MVP, Growth | HealthTech | Remote | Immediate | https://drive.google.com/file/d/1xyz | 1xyz2abc | 2025-10-28 14:35:20 | FNDRMET | 0 | Pending
```

---

## 🎯 **Ready to Set Up?**

**Start with**: https://console.cloud.google.com/

**Follow**: Steps 1.1 through 4.2 in order

**Time**: ~1.5 hours total

**Then**: Share credentials and I'll implement everything!

**Questions?** Check each step carefully and let me know if you get stuck! 🚀
