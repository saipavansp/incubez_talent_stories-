# 📸 Video Thumbnails

## Required Thumbnail Files:

Place the following thumbnail images in this directory:

1. **`chahath-thumbnail.jpg`**
   - For: Chahath - Founder's Office Role video
   - Recommended size: 1920x1080 or 1280x720
   - Format: JPG or PNG

2. **`pinkwellness-thumbnail.jpg`**
   - For: Pinkwellness seeking co-founder video
   - Recommended size: 1920x1080 or 1280x720
   - Format: JPG or PNG

3. **`startup-thumbnail.jpg`**
   - For: Founder's Office Role video
   - Recommended size: 1920x1080 or 1280x720
   - Format: JPG or PNG

## How to Generate Thumbnails:

### Option 1: Extract from Video
```bash
# Using ffmpeg (if installed)
ffmpeg -i "video.mp4" -ss 00:00:01 -vframes 1 thumbnail.jpg
```

### Option 2: Take Screenshot
1. Open video in any video player
2. Pause at a good frame (1-2 seconds in)
3. Take screenshot
4. Save as JPG

### Option 3: Design Custom Thumbnail
- Create a branded thumbnail in Photoshop/Canva
- Include company logo and title
- Export as JPG (1920x1080)

## Note:
If thumbnails are missing, the video component will gracefully handle it by:
- Showing the video player without poster image
- Loading the first frame of the video automatically
- No errors will be thrown

## Current Status:
❌ Missing thumbnails (404 errors are normal until you add them)

