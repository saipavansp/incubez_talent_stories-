# 📹 Success Story Videos Setup Guide

## Folder Structure Created

```
client/
└── public/
    ├── videos/
    │   ├── README.md (instructions)
    │   ├── success-story-healthtech.mp4  ← Place your videos here
    │   ├── success-story-edtech.mp4
    │   └── success-story-fintech.mp4
    └── images/
        └── success-stories/
            ├── README.md (instructions)
            ├── healthtech-thumbnail.jpg  ← Place thumbnails here
            ├── edtech-thumbnail.jpg
            └── fintech-thumbnail.jpg
```

---

## 🎬 Video Format Requirements

### ✅ Recommended Format: **MP4 (H.264)**

**Why MP4?**
- Works on ALL browsers and devices
- Best compression (smaller file size)
- Hardware accelerated playback
- Industry standard

### Video Specifications:
```
Format:      MP4
Codec:       H.264 (also called AVC)
Resolution:  1920x1080 (Full HD) OR 1280x720 (HD)
Frame Rate:  30fps
Bitrate:     2-4 Mbps
Audio:       AAC codec, 128 kbps
Max Size:    20-25 MB per video
Duration:    1-3 minutes recommended
```

---

## 🛠️ How to Convert/Compress Videos

### Option 1: HandBrake (FREE - Recommended)

1. **Download:** https://handbrake.fr/
2. **Open your video** in HandBrake
3. **Select Preset:** "Web > Gmail Large 3 Minutes 720p30"
4. **Adjust Settings:**
   - Video Tab: Quality slider to 22-24 (lower = bigger file)
   - Dimensions: 1280x720 or 1920x1080
   - Framerate: 30fps
5. **Start Encode**
6. **Check file size** - should be under 25MB

### Option 2: Online Converter (Quick & Easy)

1. Go to: https://www.freeconvert.com/video-compressor
2. Upload your video
3. Set target size: 20MB
4. Download compressed MP4

### Option 3: FFmpeg (Advanced - Command Line)

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -vf scale=1280:720 output.mp4
```

---

## 📸 Thumbnail Image Requirements

### Format Specifications:
```
Format:      JPG (recommended) or PNG
Dimensions:  1280x720 pixels (16:9 aspect ratio)
Max Size:    200 KB
Quality:     80-85%
```

### How to Create Thumbnails:

1. **Take a screenshot from the video** (at an interesting moment)
2. **Resize to 1280x720 pixels**
3. **Compress using:**
   - https://tinypng.com/ (online)
   - Photoshop: Save for Web, JPEG, Quality 80
   - https://squoosh.app/ (advanced)

---

## 📝 Current Setup

### ✅ Videos Already Added:

1. `pinkwellness seeking co founder.mp4`
2. `Founder's office Role.mp4`
3. `chahath - founder's office Role.mp4`

### Location:
All videos are in: `client/public/videos/`

### Adding More Videos:

1. Convert to MP4 format (if needed)
2. Place video in `client/public/videos/` folder
3. Update the stories array in `SuccessStories.jsx`:
   ```javascript
   {
     id: 4,
     title: 'Your Title',
     company: 'Company Name',
     videoUrl: '/videos/your-video.mp4'
   }
   ```

### Step 5: Test Locally

1. Start the dev server: `npm run dev`
2. Go to homepage
3. Scroll to "Success Stories"
4. Click play button on each story
5. Verify videos play smoothly

---

## 🚀 Deployment on Render

### Automatic Deployment:

1. Push your code to GitHub (include videos in `public/videos/`)
2. Connect Render to your repository
3. Deploy
4. Videos will be served from: `https://yourdomain.com/videos/`

### Bandwidth Considerations:

**Render Free Tier:**
- 100 GB bandwidth/month
- Your setup: 3 videos × 20MB = 60MB total
- **Can handle ~1,600 video views per month** (60MB × 1,600 = ~96GB)

**If you need more:**
- Upgrade to Render paid plan ($7/month for 100GB/month)
- Or use Cloudflare CDN (free, unlimited)

---

## 🔧 Troubleshooting

### Video doesn't play?
- Check file is in correct folder: `client/public/videos/`
- Verify file name matches code exactly
- Make sure format is MP4 (H.264)
- Try opening directly: http://localhost:3000/videos/your-file.mp4

### File too large?
- Re-compress with HandBrake at lower quality (CRF 24-26)
- Reduce resolution to 720p instead of 1080p
- Trim video length if possible

### Thumbnail not showing?
- Check file is in: `client/public/images/success-stories/`
- Verify file name matches code
- Make sure it's JPG or PNG format

---

## 📋 Checklist

Before deploying:
- [x] All 3 videos added to `/public/videos/`
- [x] Videos are MP4 format (H.264 codec)
- [x] File names:
  - [x] pinkwellness seeking co founder.mp4
  - [x] Founder's office Role.mp4
  - [x] chahath - founder's office Role.mp4
- [ ] Tested videos play locally
- [ ] Videos play on mobile (test in browser dev tools)

---

## 🎯 Quick Summary

1. **Convert videos to MP4** (use HandBrake)
2. **Keep each under 20MB**
3. **Place in `client/public/videos/`**
4. **Create thumbnails** (1280x720 JPG)
5. **Place in `client/public/images/success-stories/`**
6. **Match file names** as specified above
7. **Test and deploy!**

---

## Need Help?

- Video won't compress? Try reducing resolution to 720p
- Quality too low? Increase bitrate to 4 Mbps
- File still too big? Reduce video length or use 720p

The setup is complete and ready for your videos! 🎉
