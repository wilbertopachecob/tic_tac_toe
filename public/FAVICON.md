# 🎯 Favicon Design

This directory contains the custom favicon for the Tic Tac Toe game.

## 📁 Files

- `favicon.svg` - Vector-based favicon (primary)
- `favicon.ico` - Legacy ICO format for older browsers
- `logo192.png` - 192x192 PNG for PWA manifest
- `logo512.png` - 512x512 PNG for PWA manifest

## 🎨 Design

The favicon features a Tic Tac Toe game board design with:

- **Background**: Near-black (#120e0c) matching the app's night-diner theme
- **Ring**: A thin neon-pink outline, echoing the glowing card border in the app
- **Grid**: Subtle warm-white lines creating a 3x3 game board
- **X Symbols**: Neon pink (#ff3b5c) crosses representing player X
- **O Symbols**: Neon teal (#2de1c7) circles representing player O
- **Layout**: Strategic placement showing an active game state

## 🔧 Generation

To regenerate the favicon:

```bash
# Generate SVG favicon
node scripts/generate-favicon.js

# Convert to PNG (requires ImageMagick)
convert public/favicon.svg public/favicon.png

# Create multiple sizes for PWA
convert public/favicon.svg -resize 192x192 public/logo192.png
convert public/favicon.svg -resize 512x512 public/logo512.png
```

## 🌐 Browser Support

- **Modern browsers**: SVG favicon (scalable, crisp at any size)
- **Legacy browsers**: ICO fallback
- **PWA**: PNG versions for app icons

## 📱 PWA Integration

The favicon is integrated with the PWA manifest for:
- App icons on mobile devices
- Home screen shortcuts
- Splash screens
- App store listings 