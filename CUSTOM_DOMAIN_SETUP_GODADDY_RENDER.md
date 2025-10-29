# 🌐 Custom Domain Setup Guide: www.incubez.in

## **Complete Guide to Connect GoDaddy Domain to Render**

---

## **📋 OVERVIEW**

We'll connect your custom domain **www.incubez.in** from GoDaddy to your Render services.

**Current Setup:**
- Frontend: `incubez-talent-stories-4eyw.onrender.com`
- Backend: `incubez-talent-stories.onrender.com`

**Target Setup:**
- Frontend: `www.incubez.in` ✅
- Backend: `api.incubez.in` ✅ (Recommended)

---

## **🎯 STEP-BY-STEP GUIDE**

---

## **PART 1: RENDER SETUP (Frontend)**

### **Step 1.1: Add Custom Domain to Render Frontend**

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com/
   - Select your **frontend service**: `incubez-talent-stories-4eyw`

2. **Navigate to Settings:**
   - Click **"Settings"** tab (left sidebar)
   - Scroll down to **"Custom Domains"** section

3. **Add Custom Domain:**
   - Click **"Add Custom Domain"** button
   - Enter: `www.incubez.in`
   - Click **"Save"**

4. **Get DNS Records from Render:**
   
   Render will show you **EITHER:**
   
   **Option A: CNAME Record** (Most common)
   ```
   Type: CNAME
   Name: www
   Value: incubez-talent-stories-4eyw.onrender.com
   TTL: 3600 (or Automatic)
   ```
   
   **Option B: A Records** (If they provide IP addresses)
   ```
   Type: A
   Name: www
   Value: xxx.xxx.xxx.xxx (IP from Render)
   TTL: 3600 (or Automatic)
   ```

5. **Keep this page open!** You'll need these values for GoDaddy.

---

### **Step 1.2: Add Root Domain (Optional but Recommended)**

1. **Add another custom domain:**
   - Click **"Add Custom Domain"** again
   - Enter: `incubez.in` (without www)
   - Click **"Save"**

2. **Get A Records:**
   ```
   Type: A
   Name: @ (or leave blank for root)
   Value: xxx.xxx.xxx.xxx (IP from Render)
   TTL: 3600
   ```

---

## **PART 2: RENDER SETUP (Backend API)** ⚙️

### **Step 2.1: Add API Subdomain (Recommended)**

1. **Go to Backend Service:**
   - Select: `incubez-talent-stories` (backend)

2. **Navigate to Settings → Custom Domains**

3. **Add Custom Domain:**
   - Enter: `api.incubez.in`
   - Click **"Save"**

4. **Get DNS Records:**
   ```
   Type: CNAME
   Name: api
   Value: incubez-talent-stories.onrender.com
   TTL: 3600
   ```

---

## **PART 3: GODADDY DNS CONFIGURATION** 🔧

### **Step 3.1: Login to GoDaddy**

1. Visit: https://www.godaddy.com/
2. Click **"Sign In"**
3. Enter your credentials

---

### **Step 3.2: Access DNS Management**

1. **Go to My Products:**
   - Click your profile icon (top right)
   - Select **"My Products"**

2. **Find Your Domain:**
   - Locate **incubez.in**
   - Click **"DNS"** button next to it
   - Or click **"Manage DNS"**

---

### **Step 3.3: Add DNS Records for Frontend**

#### **For www.incubez.in (Frontend):**

1. **Scroll to "DNS Records" section**

2. **Add CNAME Record:**
   - Click **"Add"** button
   - Select **"Type"**: `CNAME`
   - **Name**: `www`
   - **Value/Points to**: `incubez-talent-stories-4eyw.onrender.com`
   - **TTL**: `1 Hour` (or 3600 seconds)
   - Click **"Save"**

#### **For incubez.in (Root Domain):**

1. **Add A Record:**
   - Click **"Add"** button
   - Select **"Type"**: `A`
   - **Name**: `@` (represents root domain)
   - **Value/Points to**: `[IP address from Render]`
   - **TTL**: `1 Hour`
   - Click **"Save"**

---

### **Step 3.4: Add DNS Record for API**

1. **Add CNAME for API:**
   - Click **"Add"** button
   - Select **"Type"**: `CNAME`
   - **Name**: `api`
   - **Value/Points to**: `incubez-talent-stories.onrender.com`
   - **TTL**: `1 Hour`
   - Click **"Save"**

---

### **Step 3.5: Remove Old Records (If Exist)**

⚠️ **Important:** Check for conflicting records!

1. Look for existing records with same **Name** (`www`, `@`, `api`)
2. If found, either:
   - **Delete** the old record, OR
   - **Edit** it with new Render values

**Common conflicts:**
- Old A records for `www`
- Parking page redirects
- Default GoDaddy DNS entries

---

## **PART 4: SSL CERTIFICATE (Automatic)** 🔒

### **Render Handles SSL Automatically!**

1. Once DNS propagates, Render will:
   - Automatically provision SSL certificate (Let's Encrypt)
   - Enable HTTPS for your domain
   - Redirect HTTP → HTTPS

2. **Timeline:**
   - DNS propagation: 15 minutes - 48 hours
   - SSL certificate: Automatic after DNS is verified
   - Usually works within **30-60 minutes**

---

## **PART 5: UPDATE ENVIRONMENT VARIABLES** 🔧

### **Step 5.1: Update Backend Environment Variables**

1. **Go to Backend Service Settings:**
   - Service: `incubez-talent-stories`
   - Tab: **"Environment"**

2. **Update CLIENT_URL:**
   ```
   Key: CLIENT_URL
   Value: https://www.incubez.in
   ```

3. **Click "Save Changes"**

---

### **Step 5.2: Update Frontend Environment Variables**

1. **Go to Frontend Service Settings:**
   - Service: `incubez-talent-stories-4eyw`
   - Tab: **"Environment"**

2. **Update VITE_API_URL:**
   ```
   Key: VITE_API_URL
   Value: https://api.incubez.in
   ```
   
   **OR** (if not using api subdomain):
   ```
   Value: https://incubez-talent-stories.onrender.com
   ```

3. **Click "Save Changes"**

---

## **PART 6: TESTING & VERIFICATION** 🧪

### **Step 6.1: Check DNS Propagation**

Wait 15-30 minutes, then check:

1. **Online DNS Checker:**
   - Visit: https://dnschecker.org/
   - Enter: `www.incubez.in`
   - Check if it resolves to Render

2. **Command Line (Windows PowerShell):**
   ```powershell
   nslookup www.incubez.in
   nslookup api.incubez.in
   ```

3. **Expected Results:**
   ```
   www.incubez.in → incubez-talent-stories-4eyw.onrender.com
   api.incubez.in → incubez-talent-stories.onrender.com
   ```

---

### **Step 6.2: Test Your Website**

1. **Visit Frontend:**
   - Open: https://www.incubez.in
   - Should load your homepage ✅

2. **Test API:**
   - Open: https://api.incubez.in/api/health
   - Should show: `{"status":"OK","message":"INCUBEZ Talent Stories API is running"}`

3. **Test Form Submission:**
   - Go to: https://www.incubez.in/founder/pitch
   - Fill form and submit
   - Should work without CORS errors ✅

---

## **📊 COMPLETE DNS RECORDS SUMMARY**

After setup, your GoDaddy DNS should look like this:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | @ | [Render IP] | 3600 |
| **CNAME** | www | incubez-talent-stories-4eyw.onrender.com | 3600 |
| **CNAME** | api | incubez-talent-stories.onrender.com | 3600 |

---

## **🎯 ARCHITECTURE AFTER SETUP**

```
User Browser
    ↓
www.incubez.in (Frontend)
    ↓ API calls to
api.incubez.in (Backend)
    ↓
┌──────────────────┬──────────────────┬──────────────────┐
│                  │                  │                  │
Cloudflare R2      Google Sheets      Gmail SMTP
(Video Storage)    (Data Storage)     (Email Service)
```

---

## **⏱️ TIMELINE EXPECTATIONS**

| Step | Time |
|------|------|
| **Render Domain Setup** | 2 minutes |
| **GoDaddy DNS Update** | 5 minutes |
| **DNS Propagation** | 15 min - 48 hours (usually 30 min) |
| **SSL Certificate** | Automatic after DNS |
| **Total** | 30 minutes - 48 hours |

**Pro Tip:** Usually works within **30-60 minutes!**

---

## **🚨 TROUBLESHOOTING**

### **Issue 1: Domain Not Resolving**

**Symptoms:** www.incubez.in shows "Site can't be reached"

**Solutions:**
1. Wait 30-60 minutes for DNS propagation
2. Check DNS records in GoDaddy are correct
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private browsing
5. Flush DNS cache:
   ```powershell
   ipconfig /flushdns
   ```

---

### **Issue 2: SSL Certificate Not Working**

**Symptoms:** "Your connection is not private" error

**Solutions:**
1. Wait for Render to provision SSL (automatic after DNS)
2. Check Render dashboard → Settings → Custom Domains
3. Look for "SSL Certificate" status (should be green ✅)
4. If stuck > 2 hours, remove and re-add domain in Render

---

### **Issue 3: CORS Errors**

**Symptoms:** "blocked by CORS policy" in console

**Solutions:**
1. Update `CLIENT_URL` in backend Render environment
2. Update `VITE_API_URL` in frontend Render environment
3. Redeploy both services
4. **Already fixed in code!** Just need to deploy

---

### **Issue 4: 404 Not Found**

**Symptoms:** Domain loads but shows 404

**Solutions:**
1. Check if frontend service is running in Render
2. Verify custom domain is verified (green checkmark)
3. Try redeploying frontend service
4. Check logs in Render dashboard

---

## **📝 CHECKLIST FOR COMPLETE SETUP**

### **Render Setup:**
- [ ] Add `www.incubez.in` to frontend custom domains
- [ ] Add `incubez.in` to frontend custom domains (root)
- [ ] Add `api.incubez.in` to backend custom domains
- [ ] Note all DNS records provided by Render

### **GoDaddy Setup:**
- [ ] Add CNAME record: `www` → `incubez-talent-stories-4eyw.onrender.com`
- [ ] Add A record: `@` → [Render IP]
- [ ] Add CNAME record: `api` → `incubez-talent-stories.onrender.com`
- [ ] Remove/update conflicting DNS records
- [ ] Save all changes

### **Environment Variables:**
- [ ] Update `CLIENT_URL` in backend
- [ ] Update `VITE_API_URL` in frontend
- [ ] Save and redeploy both services

### **Testing:**
- [ ] Wait 30-60 minutes
- [ ] Test: https://www.incubez.in
- [ ] Test: https://api.incubez.in/api/health
- [ ] Test form submission
- [ ] Verify SSL certificate (🔒 in browser)

---

## **🎊 SUCCESS INDICATORS**

✅ **You're Done When:**

1. **www.incubez.in** loads your frontend
2. **Green padlock 🔒** appears in browser (HTTPS)
3. **api.incubez.in/api/health** shows API response
4. **Form submission works** without errors
5. **No CORS errors** in console

---

## **💡 PRO TIPS**

### **1. Use API Subdomain**
```
✅ Recommended: https://api.incubez.in
❌ Not Recommended: https://www.incubez.in/api
```
**Why?** Cleaner, more professional, easier to manage.

### **2. Set Up Email Forwarding**
In GoDaddy, forward:
- `admin@incubez.in` → your Gmail
- `contact@incubez.in` → your Gmail

### **3. Monitor Performance**
Use Render analytics to track:
- Response times
- Request counts
- Error rates

### **4. Backup Current Render URLs**
Keep these working until custom domain is verified:
- `https://incubez-talent-stories-4eyw.onrender.com`
- `https://incubez-talent-stories.onrender.com`

---

## **📞 NEED HELP?**

### **Render Support:**
- Dashboard: https://dashboard.render.com/
- Docs: https://render.com/docs/custom-domains

### **GoDaddy Support:**
- Help Center: https://www.godaddy.com/help
- Phone: 1-480-505-8877

### **DNS Checker:**
- https://dnschecker.org/

---

## **🚀 FINAL NOTES**

1. **DNS changes take time** - Be patient (usually 30-60 min)
2. **CORS is already configured** in the code pushed to GitHub
3. **SSL is automatic** - Render handles it
4. **Keep Render URLs as backup** until custom domain works
5. **Test thoroughly** before announcing the new domain

---

**🎉 CONGRATULATIONS!**

Once DNS propagates, you'll have:
- ✅ Professional custom domain
- ✅ Automatic SSL/HTTPS
- ✅ API subdomain
- ✅ All services working perfectly

**Your platform will be at: www.incubez.in** 🎊

