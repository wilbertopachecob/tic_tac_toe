#!/usr/bin/env node

/**
 * Script to generate favicon PNG files from SVG
 * This script creates multiple sizes for better browser compatibility
 */

const fs = require('fs');
const path = require('path');

// SVG content for the favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!-- Background -->
  <rect width="32" height="32" fill="#120e0c" rx="6"/>

  <!-- Neon ring -->
  <circle cx="16" cy="16" r="13.5" fill="none" stroke="#ff3b5c" stroke-width="1.2" opacity="0.55"/>

  <!-- Game board grid -->
  <g stroke="#f5efe7" stroke-width="1" fill="none" opacity="0.14">
    <line x1="10.67" y1="5" x2="10.67" y2="27"/>
    <line x1="21.33" y1="5" x2="21.33" y2="27"/>
    <line x1="5" y1="10.67" x2="27" y2="10.67"/>
    <line x1="5" y1="21.33" x2="27" y2="21.33"/>
  </g>

  <!-- X marks (neon pink) -->
  <g stroke="#ff3b5c" stroke-width="2.1" fill="none" stroke-linecap="round">
    <!-- Top-left X -->
    <line x1="6.3" y1="6.3" x2="9.4" y2="9.4"/>
    <line x1="9.4" y1="6.3" x2="6.3" y2="9.4"/>
    <!-- Bottom-right X -->
    <line x1="22.6" y1="22.6" x2="25.7" y2="25.7"/>
    <line x1="25.7" y1="22.6" x2="22.6" y2="25.7"/>
  </g>

  <!-- O marks (neon teal) -->
  <g stroke="#2de1c7" stroke-width="2.1" fill="none">
    <circle cx="16" cy="16" r="3.1"/>
    <circle cx="6" cy="21.5" r="2.1"/>
  </g>
</svg>`;

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Write the SVG file
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
fs.writeFileSync(svgPath, svgContent);

console.log('✅ Favicon SVG generated successfully!');
console.log('📁 Location:', svgPath);
console.log('');
console.log('💡 Note: For PNG versions, you can use online tools like:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - Or use ImageMagick: convert favicon.svg favicon.png');
console.log('');
console.log('🎨 The favicon features:');
console.log('   - Tic Tac Toe game board design');
console.log('   - X symbols in neon pink (#ff3b5c)');
console.log('   - O symbols in neon teal (#2de1c7)');
console.log('   - Near-black background (#120e0c) matching the app theme'); 