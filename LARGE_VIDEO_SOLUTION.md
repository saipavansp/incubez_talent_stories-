# 📹 Large Video File Solution

## ⚠️ Issue: how-it-works.mp4 is 436 MB (GitHub limit: 100 MB)

## 🎯 **Solutions**

### **Option 1: Keep Local Video (Current Setup)**
- Video works locally and on Render deployment
- File is in `.gitignore` (not pushed to GitHub)
- **Manual deployment**: Upload video directly to Render

### **Option 2: Compress Video**
Reduce file size to under 100 MB:

#### Using HandBrake (Recommended):
1. Download: https://handbrake.fr/
2. Open `how-it-works.mp4`
3. Preset: "Web > Gmail Large 3 Minutes 720p30"
4. Adjust quality (RF 24-28) to get ~80-90 MB
5. Save as compressed version

#### Using FFmpeg:
```bash
ffmpeg -i how-it-works.mp4 -vcodec libx264 -crf 28 -preset medium -vf scale=1280:720 how-it-works-compressed.mp4
```

#### Online Compression:
- https://www.freeconvert.com/video-compressor
- Set target: 90 MB

### **Option 3: Use YouTube (Fallback)**
- Keep YouTube embed as backup
- No file size issues
- Professional player

---

## 🚀 **Current Deployment Strategy**

### **For Render Deployment**:
1. **GitHub**: Contains all code except large video
2. **Render Build**: Pulls from GitHub
3. **Manual Upload**: Add `how-it-works.mp4` directly to Render after deployment

### **Steps**:
1. Deploy normally (without how-it-works.mp4)
2. After deployment, upload video via Render dashboard
3. Place in `/client/public/videos/` on Render server

---

## ✅ **Current Status**

**Working**:
- ✅ Code configured for local video
- ✅ Video exists locally (436 MB)
- ✅ Will work on Render deployment
- ✅ Thumbnail support ready

**GitHub**:
- ✅ All code pushed
- ❌ Large video excluded (in .gitignore)
- ✅ Ready for deployment

---

## 📋 **Recommendation**

**For now**: Deploy without the large video file
**After deployment**: 
1. Compress video to under 100 MB
2. Remove from `.gitignore`
3. Push to GitHub
4. Auto-redeploy on Render

**Or**: Keep YouTube embed (works perfectly, no issues)
