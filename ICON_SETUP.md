# Icon Setup Guide

## The Problem

Chrome extensions **require PNG icons** in the manifest.json for:
- Extension icon in toolbar (`action.default_icon`)
- Extension icon in Chrome Web Store (`icons`)
- DevTools panel icon

SVG icons are **not supported** in `manifest.json`, but you can use them in your UI code.

## Current Setup

Your extension uses:
- `icon.svg` (512x512) - Your main icon in SVG format
- Needs: `icon-128.png` - For Chrome Web Store and extension icon
- Needs: `icon-34.png` - For toolbar and DevTools panel

## How to Generate PNG Icons from SVG

### Method 1: Online Converter (Easiest)

1. **Go to:** https://svgtopng.com or https://cloudconvert.com/svg-to-png

2. **Upload:** `chrome-extension/public/icon.svg`

3. **Generate two sizes:**
   - **128x128 pixels** → Save as `icon-128.png`
   - **34x34 pixels** → Save as `icon-34.png`

4. **Place files in:** `chrome-extension/public/`
   ```
   chrome-extension/public/
   ├── icon.svg         (your current file)
   ├── icon-128.png     (new - 128x128)
   └── icon-34.png      (new - 34x34)
   ```

5. **Rebuild the extension:** `pnpm dev` or `pnpm build`

### Method 2: Using Figma/Sketch/Design Tool

1. Open your SVG in Figma/Sketch
2. Export as PNG at:
   - 128x128px → `icon-128.png`
   - 34x34px → `icon-34.png`
3. Save to `chrome-extension/public/`

### Method 3: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
cd chrome-extension/public

# Convert to 128x128 PNG
magick icon.svg -resize 128x128 icon-128.png

# Convert to 34x34 PNG
magick icon.svg -resize 34x34 icon-34.png
```

Install ImageMagick:
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows
# Download from https://imagemagick.org/script/download.php
```

### Method 4: Using Node.js Script

Create a script to convert automatically:

```bash
pnpm add -D sharp
```

Then create `scripts/generate-icons.js`:

\`\`\`javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [
  { size: 128, name: 'icon-128.png' },
  { size: 34, name: 'icon-34.png' }
];

async function generateIcons() {
  const svgBuffer = fs.readFileSync('chrome-extension/public/icon.svg');

  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(\`chrome-extension/public/\${name}\`);
    console.log(\`Generated \${name}\`);
  }
}

generateIcons();
\`\`\`

Run: `node scripts/generate-icons.js`

## Using SVG in Your UI Code

You **can** use SVG in React components (just not in manifest.json):

```tsx
// In any React component
import iconUrl from '/icon.svg';

<img src={iconUrl} alt="Icon" />

// Or with chrome.runtime.getURL
<img src={chrome.runtime.getURL('icon.svg')} alt="Icon" />
```

## Why PNG is Required

Chrome extensions use PNG because:
- **Consistency:** Works across all platforms (Windows, Mac, Linux, ChromeOS)
- **Performance:** Faster to decode than SVG for small icons
- **Chrome Web Store:** Only accepts PNG for store listings
- **System integration:** OS expects bitmap formats for taskbar/toolbar icons

## Recommended Sizes

For production, you should have:
- `icon-16.png` - Browser toolbar (small screens)
- `icon-32.png` - Browser toolbar (retina displays)
- `icon-48.png` - Extension management page
- `icon-128.png` - Chrome Web Store & installation

Minimal setup (current):
- `icon-34.png` - Works for most cases
- `icon-128.png` - Required for Chrome Web Store

## After Generating Icons

Once you have the PNG files, rebuild:

```bash
pnpm dev
```

The icons will be copied to the `dist` folder and used by the extension.
