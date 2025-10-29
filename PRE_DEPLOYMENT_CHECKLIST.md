# ✅ Pre-Deployment Testing Checklist

## 🎯 **Complete this checklist before going live!**

---

## 📋 **Backend Deployment (Render)**

### **1. Environment Variables**
- [ ] All environment variables set correctly in Render backend
- [ ] `CLIENT_URL` = `https://incubez-talent-stories-4eyw.onrender.com` (or custom domain)
- [ ] `VITE_API_URL` = `https://incubez-talent-stories.onrender.com` in frontend
- [ ] R2 credentials correct (account ID, access key, secret, bucket name)
- [ ] Email credentials correct (Gmail SMTP)
- [ ] Google Sheets ID correct

### **2. Backend Health Check**
- [ ] Visit: `https://incubez-talent-stories.onrender.com/api/health`
- [ ] Should return: `{"status": "ok"}` or similar
- [ ] No 502/404 errors
- [ ] Response time < 5 seconds

### **3. CORS Configuration**
- [ ] Open browser console on frontend
- [ ] Check for CORS errors when loading page
- [ ] Should see no "Access-Control-Allow-Origin" errors
- [ ] Test from both Render link and custom domain (if configured)

---

## 🎨 **Frontend Deployment (Render)**

### **4. Homepage**
- [ ] Hero section displays correctly
- [ ] "Get Started" button scrolls to user type selection
- [ ] Logo switches correctly (white on dark, color on white)
- [ ] "Talent" text stays red when scrolled
- [ ] Mobile menu works properly
- [ ] All animations smooth and no console errors

### **5. Get Started Section**
- [ ] Founder card has red background
- [ ] Seeker card has BLACK background (not red)
- [ ] Both buttons work and navigate to correct forms
- [ ] Responsive on mobile/tablet

### **6. How It Works Section**
- [ ] No rupee symbols visible
- [ ] Founder section shows "Submit Application" (not "Make Payment")
- [ ] Seeker section shows "Submit Application" (not "Pay application fee")
- [ ] Icons display correctly (PaperAirplaneIcon)

### **7. Success Stories**
- [ ] Videos play without errors
- [ ] Chahath video shows thumbnail (chahath-thumbnail.jpg)
- [ ] Other videos use first frame as thumbnail (no 404 errors)
- [ ] Navigation arrows work
- [ ] No "play() interrupted" errors in console

---

## 📝 **Form Testing - Founder Pitch**

### **8. Form Navigation**
- [ ] Step 1: Startup Information - all fields work
- [ ] Step 2: Founder Details - validation works
- [ ] Step 3: Position Details - dropdowns work
- [ ] Step 4: Video Pitch - upload works (test with < 250MB video)
- [ ] Step 5: Review & Submit - data displayed correctly

### **9. Scroll Behavior**
- [ ] Click "Next" → page scrolls to TOP ✅
- [ ] Click "Previous" → page scrolls to TOP ✅
- [ ] Form stays centered and visible

### **10. Video Upload**
- [ ] Can select video file (< 250MB)
- [ ] Can drag & drop video
- [ ] Can record video (if supported)
- [ ] Shows "Pro Tip" about 250MB limit
- [ ] Upload progress shows correctly
- [ ] No "Note: This video will store in device" message visible

### **11. Coupon Code**
- [ ] Coupon code auto-filled with "FNDRMET"
- [ ] User can click "Apply" button
- [ ] Shows success message when applied
- [ ] Final amount becomes ₹0

### **12. Submission Process**
- [ ] Progress modal appears when submitting
- [ ] Shows upload progress (0-100%)
- [ ] Shows steps: Uploading → Saving → Complete
- [ ] Modal closes automatically
- [ ] Redirects to success page

### **13. Success Page**
- [ ] Application ID displays
- [ ] Amount shows ₹0 (INVOICE RESET) ✅
- [ ] Transaction ID shows
- [ ] Type shows "founder"
- [ ] Video R2 link shows (if visible)

### **14. After Submission**
- [ ] Form state completely reset
- [ ] Video file cleared
- [ ] Coupon code reset to "FNDRMET"
- [ ] Step reset to 1
- [ ] localStorage cleared
- [ ] Can submit new application without refresh

---

## 📝 **Form Testing - Seeker Application**

### **15. Seeker Form**
Repeat all tests from #8-#14 above for Seeker form:
- [ ] Navigation works
- [ ] Scroll to top works
- [ ] Video upload works (< 250MB)
- [ ] Coupon auto-filled
- [ ] Progress modal shows
- [ ] Success page shows ₹0
- [ ] Form resets completely

---

## 🔥 **Error Handling Tests**

### **16. Network Error Simulation**
**Test with Chrome DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Enable "Offline" mode
4. Try to submit form
5. **Expected:** 
   - [ ] Shows error toast
   - [ ] Shows "Retrying submission..." (auto-retry)
   - [ ] After retries fail: shows helpful error message
   - [ ] Suggests refreshing the page

### **17. Large File Test**
1. Try to upload video > 250MB
2. **Expected:**
   - [ ] Shows error: "Video file is too large. Maximum size is 250MB"
   - [ ] Shows compression tips
   - [ ] Suggests HandBrake or CloudConvert

### **18. Invalid Coupon Test**
1. Change coupon code to "INVALID"
2. Click "Apply"
3. **Expected:**
   - [ ] Shows error toast
   - [ ] Amount stays at ₹999 (founder) or ₹499 (seeker)
   - [ ] Cannot proceed without valid coupon

### **19. Backend Down Test**
**If backend is cold-starting:**
- [ ] First request may take 30-60 seconds
- [ ] Shows progress modal while waiting
- [ ] Auto-retries if it fails
- [ ] Eventually succeeds or shows helpful error

---

## 📧 **Email Testing**

### **20. Confirmation Email**
After successful submission:
- [ ] Check email inbox (submission's email)
- [ ] Receives confirmation email within 1-2 minutes
- [ ] Email has INCUBEZ branding
- [ ] Contains application ID
- [ ] Contains video link (R2 URL)
- [ ] Has social links (LinkedIn, Twitter, Instagram, Website)
- [ ] Looks professional and well-formatted

**Note:** Email is sent async, so submission completes immediately even if email is delayed.

---

## 🗄️ **Data Storage Testing**

### **21. Cloudflare R2**
1. After submission, check R2 bucket
2. **Expected:**
   - [ ] Video uploaded successfully
   - [ ] Filename format: `firstname-lastname_INC-FND-2025-0001.mp4`
   - [ ] In correct folder: `founders/` or `seekers/`
   - [ ] Publicly accessible via: `https://pub-6ad37bc5f3074f2db41fce494eea4da6.r2.dev/...`

### **22. Google Sheets**
1. After submission, check Google Sheets
2. **Expected:**
   - [ ] New row added
   - [ ] All form data present
   - [ ] Application ID correct (INC-FND-2025-XXXX or INC-SKR-2025-XXXX)
   - [ ] Video R2 URL present
   - [ ] Timestamp present
   - [ ] Amount shows ₹0 (with coupon)

---

## 🌐 **Custom Domain Testing** (If Configured)

### **23. Custom Domain Access**
- [ ] Visit: `https://www.incubez.in`
- [ ] Page loads correctly
- [ ] SSL certificate active (🔒 shows in browser)
- [ ] No certificate warnings

### **24. Custom Domain CORS**
- [ ] Open browser console
- [ ] No CORS errors when submitting form
- [ ] API calls succeed from custom domain
- [ ] Video upload works from custom domain

### **25. Domain Redirect**
- [ ] Visit: `http://incubez.in` (no www, no https)
- [ ] **Expected:** Redirects to `https://www.incubez.in`

---

## 📱 **Mobile/Responsive Testing**

### **26. Mobile Devices**
Test on phone/tablet or use Chrome DevTools Device Mode:
- [ ] Homepage displays correctly
- [ ] Forms are usable and readable
- [ ] Video upload works on mobile
- [ ] Progress modal fits screen
- [ ] Success page readable
- [ ] No horizontal scrolling
- [ ] Touch interactions work

### **27. Different Browsers**
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Chrome (Android)
- [ ] Safari (iOS)

---

## 🔍 **Console Error Check**

### **28. Browser Console**
Throughout all testing:
- [ ] No critical errors in console
- [ ] No 404 errors (except HEAD / from Render health check - that's normal)
- [ ] No "Uncaught" errors
- [ ] No CORS errors
- [ ] No "play() interrupted" errors (fixed)
- [ ] "Tabs cannot be edited" error is from Chrome extension (ignore)

---

## ⚡ **Performance Testing**

### **29. Load Times**
- [ ] Homepage loads in < 3 seconds
- [ ] Form loads instantly (< 1 second)
- [ ] API calls respond in < 5 seconds
- [ ] Video upload shows progress immediately

### **30. Concurrent User Simulation** (Optional)
**For 100-200 users, upgrade to Standard plan first!**

Use a tool like Artillery or Postman:
1. Simulate 5 concurrent form submissions
2. **Expected:**
   - [ ] All submissions succeed
   - [ ] No 502/503/504 errors
   - [ ] Response times acceptable (< 10s)
   - [ ] Backend doesn't crash

**⚠️ On Free Tier:** May see issues with > 10 concurrent users
**✅ On Standard Plan ($25/month):** Should handle 100-200 users smoothly

---

## 🎯 **Final Pre-Launch Checks**

### **31. Content Review**
- [ ] All text is correct (no typos)
- [ ] All links work (no broken links)
- [ ] All images load (no broken images)
- [ ] Contact information correct
- [ ] Social media links correct

### **32. Security Check**
- [ ] No sensitive data in browser console
- [ ] No API keys visible in frontend code
- [ ] HTTPS enabled (SSL active)
- [ ] No mixed content warnings

### **33. Analytics** (Optional)
- [ ] Google Analytics installed (if using)
- [ ] Events tracking correctly (form submissions)
- [ ] Page views tracking

### **34. Backup & Recovery**
- [ ] Latest code pushed to GitHub ✅
- [ ] Environment variables documented (RENDER_ENV_VARIABLES.md) ✅
- [ ] Have access to Render dashboard ✅
- [ ] Have access to R2 dashboard ✅
- [ ] Have access to Google Sheets ✅

---

## 🚀 **Ready to Launch?**

### **If ALL checkboxes are ✅:**
```
🎉 CONGRATULATIONS! Your application is production-ready!

You can now:
1. Share the link with users
2. Monitor performance in Render dashboard
3. Check submissions in Google Sheets
4. Watch for error emails/alerts

Recommended: Start with 10-20 users and monitor performance
before scaling to 100-200 users.
```

### **If ANY checkboxes are ❌:**
```
⚠️ Fix the issues before launching!

Common fixes:
1. Redeploy backend/frontend in Render
2. Check environment variables
3. Verify R2/Gmail credentials
4. Test in incognito/private mode
5. Clear browser cache and test again
```

---

## 📞 **Post-Launch Monitoring**

### **Daily (First Week):**
- [ ] Check Render logs for errors
- [ ] Monitor CPU/Memory usage in Render
- [ ] Verify submissions in Google Sheets
- [ ] Test submission yourself

### **Weekly:**
- [ ] Review error logs
- [ ] Check R2 storage usage
- [ ] Monitor email delivery
- [ ] Collect user feedback

### **Monthly:**
- [ ] Review performance metrics
- [ ] Consider scaling if needed
- [ ] Update dependencies
- [ ] Backup Google Sheets data

---

## 🎊 **Launch Day!**

When you're ready:
1. ✅ Complete this entire checklist
2. ✅ Fix any issues
3. ✅ Test one more time end-to-end
4. ✅ Share the link!
5. ✅ Monitor closely for first few hours
6. ✅ Be ready to help first users
7. ✅ Celebrate! 🎉

---

**🚀 Good luck with your launch! Everything is ready and working!**

