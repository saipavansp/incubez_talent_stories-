# 🌐 CORS & Domain Configuration - Complete Guide

## ✅ **Current Setup Summary**

Your application is configured to work with **MULTIPLE ORIGINS** simultaneously!

---

## 🎯 **Allowed Origins (CORS Whitelist)**

The backend (`server/server.js`) allows requests from:

### **Development:**
- ✅ `http://localhost:3000`
- ✅ `http://localhost:5173`

### **Production - Render:**
- ✅ `https://incubez-talent-stories-4eyw.onrender.com` (Frontend)
- ✅ Backend: `https://incubez-talent-stories.onrender.com`

### **Production - Custom Domain:**
- ✅ `https://www.incubez.in`
- ✅ `https://incubez.in`
- ✅ `http://www.incubez.in` (HTTP redirect)
- ✅ `http://incubez.in` (HTTP redirect)

---

## 🚀 **What This Means For You**

### **Option 1: Access via Render Link (Current)**
```
Frontend: https://incubez-talent-stories-4eyw.onrender.com
Backend:  https://incubez-talent-stories.onrender.com
Status:   ✅ Working NOW
```

### **Option 2: Access via Custom Domain (After DNS Setup)**
```
Frontend: https://www.incubez.in
Backend:  https://incubez-talent-stories.onrender.com
Status:   ✅ Will work after DNS setup
```

### **BOTH WORK SIMULTANEOUSLY!** 🎉

---

## 📋 **Current Environment Variables**

### **Backend (Render):**
```env
CLIENT_URL=https://incubez-talent-stories-4eyw.onrender.com
# OR after going live with custom domain:
# CLIENT_URL=https://www.incubez.in
```

**💡 The CORS whitelist allows BOTH, so either value works!**

### **Frontend (Render):**
```env
VITE_API_URL=https://incubez-talent-stories.onrender.com
```

**💡 No changes needed! Backend stays at Render URL for now.**

---

## 🎯 **CORS Code (Already Implemented)**

In `server/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://incubez-talent-stories-4eyw.onrender.com', // ✅ Render link
  'https://www.incubez.in',                             // ✅ Custom domain
  'https://incubez.in',                                  // ✅ Custom domain (no www)
  'http://www.incubez.in',                               // ✅ HTTP redirect
  'http://incubez.in',                                   // ✅ HTTP redirect
  process.env.CLIENT_URL                                  // ✅ Flexible
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('❌ CORS blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

---

## ✅ **Testing Both Origins**

### **Test 1: Render Link**
1. Open: `https://incubez-talent-stories-4eyw.onrender.com`
2. Submit a test application
3. Should work: ✅ CORS allows this origin

### **Test 2: Custom Domain (After DNS Setup)**
1. Open: `https://www.incubez.in`
2. Submit a test application
3. Should work: ✅ CORS allows this origin

---

## 🔄 **Migration Path (Render → Custom Domain)**

### **Phase 1: Initial Launch (NOW)**
```
Users access: https://incubez-talent-stories-4eyw.onrender.com
Backend:      https://incubez-talent-stories.onrender.com
Status:       ✅ Working
```

### **Phase 2: Custom Domain Setup**
1. Add custom domain in Render (see `CUSTOM_DOMAIN_SETUP_GODADDY_RENDER.md`)
2. Update GoDaddy DNS records
3. Wait for SSL certificate
4. Test: `https://www.incubez.in`

### **Phase 3: Both Work Simultaneously**
```
Users can access BOTH:
- https://incubez-talent-stories-4eyw.onrender.com ✅
- https://www.incubez.in ✅

Both frontends call same backend:
- https://incubez-talent-stories.onrender.com ✅
```

### **Phase 4: Primary Domain (Optional)**
1. Update `CLIENT_URL` to `https://www.incubez.in`
2. Use custom domain as primary
3. Render link still works as backup

---

## 🎯 **When to Update Environment Variables**

### **Scenario 1: Keep Render as Primary**
```
No changes needed! Current setup works for both origins.
```

### **Scenario 2: Switch to Custom Domain as Primary**
```
Update in Render Backend Environment:
CLIENT_URL=https://www.incubez.in

Redeploy backend (automatic)
```

### **Scenario 3: Custom Backend Domain (Advanced)**
```
If you want: https://api.incubez.in as backend:

1. Add "api.incubez.in" as custom domain to backend in Render
2. Add CNAME record in GoDaddy DNS
3. Update frontend env:
   VITE_API_URL=https://api.incubez.in
4. Redeploy frontend
```

---

## 🚨 **Important Notes**

### **CORS Security:**
- ✅ Only specified origins are allowed
- ✅ Credentials enabled for cookies/auth
- ✅ Proper methods and headers configured
- ❌ Unknown origins are blocked

### **Frontend Build:**
- Frontend is compiled with `VITE_API_URL`
- After changing `VITE_API_URL`, redeploy frontend
- Backend `CLIENT_URL` can change without frontend rebuild

### **Email Links:**
- Emails may contain links with `CLIENT_URL`
- Set `CLIENT_URL` to the primary domain users should see
- Current: Render link → Future: Custom domain

---

## 📊 **Quick Reference Table**

| Component | Current Value | After Custom Domain | Notes |
|-----------|--------------|---------------------|-------|
| Frontend (User) | `incubez-talent-stories-4eyw.onrender.com` | `www.incubez.in` | Both work! |
| Backend (API) | `incubez-talent-stories.onrender.com` | Same | No change needed |
| CORS Allowed | ✅ Both | ✅ Both | Already configured |
| Env: `CLIENT_URL` | Render link | Can be either | Flexible |
| Env: `VITE_API_URL` | Render link | Same | No change |

---

## 🎉 **Summary**

✅ **CORS is already configured correctly!**

✅ **Both Render link AND custom domain will work simultaneously!**

✅ **No environment variable changes needed right now!**

✅ **After DNS setup, both frontends will access the same backend!**

---

**Need Help?**
- Check `CUSTOM_DOMAIN_SETUP_GODADDY_RENDER.md` for DNS setup
- Check `RENDER_ENV_VARIABLES.md` for environment variables
- Test current Render deployment before adding custom domain

