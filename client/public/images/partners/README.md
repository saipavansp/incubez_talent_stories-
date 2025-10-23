# Partner Logos Setup

## Required Logo Files

Place your partner logo files in this folder with these **EXACT** names:

### File Names (Use lowercase with hyphens):

```
1.  the-august-fest.png (or .jpg)
2.  tie-hyderabad.png (or .jpg)
3.  tie50.png (or .jpg)
4.  enrission-india-capital.png (or .jpg)
5.  t-hub.png (or .jpg)
6.  we-hub.png (or .jpg)
7.  aic-bimtech.png (or .jpg)
8.  draper-startup-house.png (or .jpg)
9.  aira.png (or .jpg)
10. cokarma.png (or .jpg)
11. early-seed-ventures.png (or .jpg)
12. venture-wolf.png (or .jpg)
```

---

## Logo Specifications

### Format:
- **Preferred**: PNG with transparent background
- **Alternative**: JPG with white background
- **Size**: Flexible (will be auto-resized)
- **Recommended Dimensions**: 200px × 80px (or similar ratio)

### File Size:
- **Target**: Under 100KB per logo
- **Maximum**: 200KB per logo

### Image Quality:
- High resolution (looks good when scaled)
- Clear, readable logo
- Good contrast

---

## How to Prepare Logos

### If logos are too large:

1. **Online Compression**:
   - https://tinypng.com/ (for PNG)
   - https://compressjpeg.com/ (for JPG)

2. **Resize if needed**:
   - https://www.iloveimg.com/resize-image
   - Set width to 200px, maintain aspect ratio

### Tips:
- Use PNG if logo has transparency
- Use JPG if logo has solid white/colored background
- Ensure logo is clear and readable
- Test on both light and dark backgrounds

---

## File Naming Examples

**Your Partners**:
- The August Fest → `the-august-fest.png`
- TiE Hyderabad → `tie-hyderabad.png`
- TiE50 → `tie50.png`
- Enrission India Capital → `enrission-india-capital.png`
- T-Hub → `t-hub.png`
- WE Hub → `we-hub.png`
- AIC BIMTECH → `aic-bimtech.png`
- Draper Startup House → `draper-startup-house.png`
- AIRA → `aira.png`
- CoKarma → `cokarma.png`
- Early Seed Ventures → `early-seed-ventures.png`
- Venture Wolf → `venture-wolf.png`

---

## After Adding Logos

1. Place all logo files in this folder
2. Ensure file names match exactly (case-sensitive!)
3. Commit to Git:
   ```bash
   git add client/public/images/partners/
   git commit -m "Add partner logos"
   git push origin main
   ```
4. Logos will appear automatically on the website!

---

## Visual Effect

Logos will:
- Display in grayscale by default
- Turn to full color on hover
- Responsive grid: 6 on desktop, 3 on tablet, 2 on mobile
- Professional, clean appearance

---

## Fallback

If a logo file is not found:
- A placeholder will show with partner name
- No broken image icons
- Website still works perfectly
