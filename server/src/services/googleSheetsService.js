import { google } from 'googleapis'

// Initialize Google Sheets API
const initializeSheets = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    return google.sheets({ version: 'v4', auth })
  } catch (error) {
    console.error('Error initializing Google Sheets:', error)
    throw error
  }
}

/**
 * Save founder submission to Google Sheets
 * @param {Object} data - Founder submission data
 * @returns {Object} { rowNumber, success }
 */
export const saveFounderSubmission = async (data) => {
  try {
    const sheets = initializeSheets()
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const sheetName = 'Founders_Submissions'

    // Get current row count
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    })

    const rowCount = response.data.values ? response.data.values.length : 1
    const newId = rowCount // ID is row number minus header

    // Prepare row data (must match column order in sheet)
    const rowData = [
      newId,                              // A: ID
      data.applicationId,                 // B: Application_ID
      data.founderName,                   // C: Founder_Name
      data.email,                         // D: Email
      data.phone,                         // E: Phone
      data.linkedinUrl || '',             // F: LinkedIn
      data.startupName,                   // G: Startup_Name
      data.domain,                        // H: Domain
      data.stage,                         // I: Stage
      data.jobTitle,                      // J: Job_Title
      data.roleType,                      // K: Role_Type
      data.experienceLevel,               // L: Experience_Level
      data.locationPreference,            // M: Location_Preference
      data.compensationType,              // N: Compensation_Type
      data.videoDriveLink || '',          // O: Video_Drive_Link
      data.videoDriveId || '',            // P: Video_Drive_ID
      new Date().toISOString(),           // Q: Submission_Date
      data.couponCode || '',              // R: Coupon_Used
      data.amountPaid || 0,               // S: Amount_Paid
      'Pending'                           // T: Status
    ]

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:T`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    console.log(`✅ Founder submission saved to Google Sheets. Row: ${rowCount + 1}`)

    return {
      rowNumber: rowCount + 1,
      success: true,
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    throw new Error('Failed to save data to Google Sheets: ' + error.message)
  }
}

/**
 * Save seeker application to Google Sheets
 * @param {Object} data - Seeker application data
 * @returns {Object} { rowNumber, success }
 */
export const saveSeekerApplication = async (data) => {
  try {
    const sheets = initializeSheets()
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const sheetName = 'Seekers_Applications'

    // Get current row count
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    })

    const rowCount = response.data.values ? response.data.values.length : 1
    const newId = rowCount // ID is row number minus header

    // Prepare row data (must match column order in sheet)
    const rowData = [
      newId,                              // A: ID
      data.applicationId,                 // B: Application_ID
      data.fullName,                      // C: Full_Name
      data.email,                         // D: Email
      data.phone,                         // E: Phone
      data.linkedinUrl || '',             // F: LinkedIn
      data.currentLocation,               // G: Current_Location
      data.currentRole,                   // H: Current_Role
      data.yearsOfExperience,             // I: Years_Experience
      data.keySkills,                     // J: Key_Skills
      JSON.stringify(data.domainExpertise || []), // K: Domain_Expertise
      JSON.stringify(data.preferredRoleType || []), // L: Preferred_Role_Type
      JSON.stringify(data.preferredStartupStage || []), // M: Preferred_Startup_Stage
      JSON.stringify(data.industryPreferences || []), // N: Industry_Preferences
      data.locationPreference,            // O: Location_Preference
      data.availability,                  // P: Availability
      data.videoDriveLink || '',          // Q: Video_Drive_Link
      data.videoDriveId || '',            // R: Video_Drive_ID
      new Date().toISOString(),           // S: Submission_Date
      data.couponCode || '',              // T: Coupon_Used
      data.amountPaid || 0,               // U: Amount_Paid
      'Pending'                           // V: Status
    ]

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:V`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    console.log(`✅ Seeker application saved to Google Sheets. Row: ${rowCount + 1}`)

    return {
      rowNumber: rowCount + 1,
      success: true,
    }
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    throw new Error('Failed to save data to Google Sheets: ' + error.message)
  }
}

/**
 * Update application status in Google Sheets
 * @param {string} applicationId - Application ID
 * @param {string} status - New status (Pending/Approved/Rejected)
 * @param {string} type - 'founder' or 'seeker'
 */
export const updateApplicationStatus = async (applicationId, status, type) => {
  try {
    const sheets = initializeSheets()
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const sheetName = type === 'founder' ? 'Founders_Submissions' : 'Seekers_Applications'
    const statusColumn = type === 'founder' ? 'T' : 'V'

    // Get all application IDs
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!B:B`,
    })

    const rows = response.data.values
    const rowIndex = rows.findIndex(row => row[0] === applicationId)

    if (rowIndex === -1) {
      throw new Error('Application not found')
    }

    // Update status (rowIndex + 1 because sheets are 1-indexed, + 1 for header)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!${statusColumn}${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[status]],
      },
    })

    console.log(`✅ Status updated for ${applicationId}: ${status}`)

    return { success: true }
  } catch (error) {
    console.error('Error updating status:', error)
    throw error
  }
}

export default {
  saveFounderSubmission,
  saveSeekerApplication,
  updateApplicationStatus,
}
