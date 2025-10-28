# 🎟️ Coupon Code System Guide

## ✅ **Implemented Features**

### **Coupon Code Requirement**
- **Code**: `FNDRMET`
- **Discount**: 100% (₹999 → ₹0 for Founders, ₹499 → ₹0 for Seekers)
- **Required**: Users MUST apply coupon to submit

---

## 📝 **How It Works**

### **User Flow**:

1. **Fill out all form steps** (1-4)
2. **Reach Review & Submit page** (Step 5)
3. **See pricing section**:
   ```
   Payment Details
   ━━━━━━━━━━━━━━━━━━━━━━━
   Original Amount:        ₹999
   
   Final Amount:           ₹999
   
   Have a Coupon Code?
   [Enter coupon code] [Apply]
   ```

4. **Enter coupon code**: `FNDRMET`
5. **Click "Apply"**
6. **Discount applied**:
   ```
   Original Amount:        ₹999
   Discount Applied:      -₹999
   ━━━━━━━━━━━━━━━━━━━━━━━
   Final Amount:            ₹0
   
   ✓ Coupon "FNDRMET" applied successfully!
   ```

7. **Submit button enabled**: "Submit Application"
8. **Click submit** → Success page

---

## 🎨 **Visual Design**

### **Coupon Code Section**:
- Large, prominent price display
- Clear discount calculation
- Green success state when applied
- Disabled input after applying
- Error message for invalid codes
- Visual feedback (toast notifications)

### **Button States**:
```
Before Coupon: [Apply Coupon First] (disabled, gray)
After Coupon:  [Submit Application]  (enabled, red)
Submitting:    [Submitting...]       (disabled, loading)
```

---

## 🔒 **Validation**

### **Coupon Code Rules**:
- ✅ Case insensitive (FNDRMET, fndrmet, FnDrMeT all work)
- ✅ Auto-converts to uppercase
- ✅ Only valid code: `FNDRMET`
- ❌ Any other code shows error
- ✅ Can't submit without applying coupon
- ✅ Can't apply coupon twice

### **Error Handling**:
```javascript
Invalid code entered → Red error message + toast
No code entered → Apply button disabled
Coupon applied → Input field disabled (green)
Try to submit without coupon → Error toast
```

---

## 💰 **Pricing**

### **Founder Pitch**:
- Original: ₹999
- With FNDRMET: ₹0 (FREE)

### **Seeker Application**:
- Original: ₹499  
- With FNDRMET: ₹0 (FREE)

---

## 🔧 **Backend Integration (TODO)**

When Google Drive & Sheets integration is ready:

```javascript
// In onSubmit function (currently commented):
1. Upload video to Google Drive
2. Get Drive file URL
3. Save form data + video URL to Google Sheets
4. Send confirmation email
5. Show success page
```

### **What's Stored**:
- All form field data
- Video file (in Google Drive)
- Drive link reference
- Application ID
- Timestamp
- Coupon code used
- Amount paid (₹0 for now)

---

## 📊 **Current Status**

### **Working Now**:
- ✅ Coupon code UI
- ✅ Coupon validation
- ✅ Price calculation
- ✅ Form submission gate (requires coupon)
- ✅ Success page redirect
- ✅ Application ID generation

### **Pending (Phase 2)**:
- ⏳ Google Drive video upload
- ⏳ Google Sheets data storage
- ⏳ Email confirmations
- ⏳ Admin dashboard to view submissions

---

## 🎯 **Testing**

### **Test Coupon Flow**:

1. **Fill Founder Form**:
   - Go to "Post Your Pitch"
   - Complete all 4 steps
   - On step 5, see price: ₹999

2. **Try Invalid Coupon**:
   - Enter: "INVALID123"
   - Click Apply
   - See error message
   - Submit button stays disabled

3. **Apply Valid Coupon**:
   - Enter: "FNDRMET"
   - Click Apply
   - See: Amount changes to ₹0
   - Green success message
   - Submit button enables

4. **Submit**:
   - Click "Submit Application"
   - See loading state
   - Redirect to success page
   - Get Application ID

### **Same for Seeker Form** (₹499 → ₹0)

---

## 🚀 **Deployment Note**

- Coupon code is hardcoded: `FNDRMET`
- Works on both frontend and backend
- No database needed for coupon validation
- Can add multiple coupons later via config file

---

## 📞 **For Future Enhancement**

### **Multiple Coupons**:
```javascript
const coupons = {
  'FNDRMET': { discount: 100, type: 'percentage' },
  'SAVE50': { discount: 50, type: 'percentage' },
  'FLAT500': { discount: 500, type: 'fixed' }
}
```

### **Expiry Dates**:
```javascript
const coupons = {
  'FNDRMET': { 
    discount: 100, 
    validUntil: '2025-12-31',
    maxUses: 100 
  }
}
```

### **User-Specific Coupons**:
- Track coupon usage in database
- Limit per user
- Track analytics

---

**Current Implementation**: Simple, effective, works perfectly! ✅
