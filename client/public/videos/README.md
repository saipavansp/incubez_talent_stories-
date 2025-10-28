# Success Story Videos

## How to Add Videos

Simply place your MP4 video files in this folder.

### Current Videos:

#### Pitch Videos:
- `pinkwellness seeking co founder.mp4`
- `Founder's office Role.mp4`
- `chahath - founder's office Role.mp4`

#### Explainer Video:
- `how-it-works.mp4` - Explains how INCUBEZ platform works (shown in hero section)

---

## Video Requirements

### Format Specifications:
- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 30fps
- **Bitrate**: 2-4 Mbps
- **Audio Codec**: AAC
- **Max File Size**: 20-25 MB per video

### Recommended Tools for Video Compression:

#### Free Tools:
1. **HandBrake** (Windows/Mac/Linux)
   - Download: https://handbrake.fr/
   - Preset: "Web > Gmail Large 3 Minutes 720p30"
   - Adjust quality slider to achieve target file size

2. **FFmpeg** (Command Line)
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
   ```

3. **Online Compressor**
   - https://www.freeconvert.com/video-compressor
   - https://www.videosmaller.com/

---

## How to Export from Video Editors:

### Adobe Premiere Pro:
1. File > Export > Media
2. Format: H.264
3. Preset: YouTube 1080p HD
4. Bitrate Settings: VBR, 1 pass, Target Bitrate 3-4 Mbps
5. Audio: AAC, 128 kbps

### Final Cut Pro:
1. File > Share > Master File
2. Settings: H.264, 1920x1080, 30fps
3. Quality: Medium
4. Audio: AAC, 128 kbps

### DaVinci Resolve:
1. Deliver tab
2. Format: MP4
3. Codec: H.264
4. Resolution: 1920x1080
5. Frame rate: 30
6. Quality: Medium (adjust to target file size)

---

## Testing Your Video:

After adding a video, test it works by:
1. Opening: http://localhost:3000/videos/your-video.mp4
2. The video should play in your browser
3. Check file size is under 25MB

---

## Deployment Note:

When deploying to Render:
- Videos in `public/` folder are automatically served
- Access via: `https://yourdomain.com/videos/video-name.mp4`
- Render free tier has 100GB bandwidth/month (enough for ~1000 video views/month)

---

## Current Videos:

(Update this list when you add videos)

- [ ] success-story-healthtech.mp4
- [ ] success-story-edtech.mp4  
- [ ] success-story-fintech.mp4
