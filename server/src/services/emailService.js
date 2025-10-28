import nodemailer from 'nodemailer'

// Initialize email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/**
 * Send confirmation email to user
 * @param {Object} data - Application data
 * @param {string} type - 'founder' or 'seeker'
 */
export const sendConfirmationEmail = async (data, type) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️  Email credentials not configured. Skipping email...')
      return { success: false, message: 'Email not configured' }
    }

    const transporter = createTransporter()

    const subject = `Application Submitted Successfully - INCUBEZ Talent Stories`
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #000000 0%, #e14f46 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; }
    .details-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e14f46; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .detail-label { font-weight: bold; color: #6b7280; }
    .detail-value { color: #111827; }
    .button { background: #e14f46; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
    .footer { background: #111827; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    .footer a { color: #e14f46; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Application Submitted Successfully!</h1>
    </div>
    
    <div class="content">
      <p>Dear <strong>${type === 'founder' ? data.founderName : data.fullName}</strong>,</p>
      
      <p>Thank you for submitting your ${type === 'founder' ? 'job pitch' : 'application'} to INCUBEZ Talent Stories!</p>
      
      <div class="details-box">
        <h3 style="margin-top: 0; color: #e14f46;">Application Details</h3>
        <div class="detail-row">
          <span class="detail-label">Application ID:</span>
          <span class="detail-value"><strong>${data.applicationId}</strong></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Submitted On:</span>
          <span class="detail-value">${new Date().toLocaleString('en-IN')}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount Paid:</span>
          <span class="detail-value">₹${data.amountPaid || 0}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: #f59e0b;">Under Review</span>
        </div>
      </div>
      
      <h3>What happens next?</h3>
      <ul>
        <li>Our team will review your submission within 24-48 hours</li>
        <li>Your video ${type === 'founder' ? 'pitch' : 'application'} will be made available to relevant matches</li>
        <li>You'll be notified once your application is approved</li>
        <li>${type === 'founder' ? 'Qualified candidates will be able to view your pitch and apply' : 'Founders looking for talent like you will be notified'}</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="${process.env.CLIENT_URL || 'https://incubez-client.onrender.com'}" class="button">
          Visit INCUBEZ
        </a>
      </div>
      
      <p style="margin-top: 30px; padding: 15px; background: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
        <strong>📋 Keep this email for your records.</strong><br>
        Your Application ID: <strong>${data.applicationId}</strong>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>INCUBEZ Talent Stories</strong></p>
      <p>Connecting founders with exceptional talent through video</p>
      <p style="margin-top: 10px;">
        📧 <a href="mailto:talent@incubez.com">talent@incubez.com</a> | 
        📞 +91 85228 32623 | 
        📍 Hyderabad, India
      </p>
      <p style="margin-top: 15px; font-size: 12px;">
        © 2025 Webkraft Technologies. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `

    const mailOptions = {
      from: `"INCUBEZ Talent" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Confirmation email sent to: ${data.email}`)

    return { success: true }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Send admin notification email
 * @param {Object} data - Application data
 * @param {string} type - 'founder' or 'seeker'
 */
export const sendAdminNotification = async (data, type) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️  Email credentials not configured. Skipping admin notification...')
      return { success: false, message: 'Email not configured' }
    }

    const transporter = createTransporter()
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER

    const subject = `🔔 New ${type === 'founder' ? 'Founder Pitch' : 'Seeker Application'} - ${type === 'founder' ? data.founderName : data.fullName}`
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #e14f46; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; }
    .info-box { background: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #e14f46; }
    .action-button { background: #e14f46; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🔔 New ${type === 'founder' ? 'Founder Pitch' : 'Seeker Application'} Received</h2>
    </div>
    
    <div class="content">
      <div class="info-box">
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> ${type === 'founder' ? data.founderName : data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>LinkedIn:</strong> <a href="${data.linkedinUrl}">${data.linkedinUrl}</a></p>
        <p><strong>Application ID:</strong> <strong style="color: #e14f46;">${data.applicationId}</strong></p>
      </div>
      
      ${type === 'founder' ? `
      <div class="info-box">
        <h3>Startup Details</h3>
        <p><strong>Startup:</strong> ${data.startupName}</p>
        <p><strong>Domain:</strong> ${data.domain}</p>
        <p><strong>Stage:</strong> ${data.stage}</p>
        <p><strong>Position:</strong> ${data.jobTitle}</p>
        <p><strong>Role Type:</strong> ${data.roleType}</p>
      </div>
      ` : `
      <div class="info-box">
        <h3>Professional Details</h3>
        <p><strong>Current Role:</strong> ${data.currentRole}</p>
        <p><strong>Experience:</strong> ${data.yearsOfExperience} years</p>
        <p><strong>Key Skills:</strong> ${data.keySkills}</p>
        <p><strong>Looking For:</strong> ${JSON.stringify(data.preferredRoleType)}</p>
      </div>
      `}
      
      <div class="info-box">
        <h3>Video & Submission</h3>
        <p><strong>Video Link:</strong> <a href="${data.videoDriveLink}" target="_blank">View on Google Drive</a></p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
        <p><strong>Coupon Used:</strong> ${data.couponCode || 'None'}</p>
        <p><strong>Amount Paid:</strong> ₹${data.amountPaid || 0}</p>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="${data.videoDriveLink}" class="action-button">📹 Watch Video</a>
        <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}" class="action-button">📊 View in Sheets</a>
      </div>
      
      <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 6px;">
        <strong>⏰ Action Required:</strong> Review this submission and update status in Google Sheets.
      </p>
    </div>
  </div>
</body>
</html>
    `

    const mailOptions = {
      from: `"INCUBEZ Talent Platform" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Admin notification sent`)

    return { success: true }
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return { success: false, error: error.message }
  }
}

export default {
  sendConfirmationEmail,
  sendAdminNotification,
}
