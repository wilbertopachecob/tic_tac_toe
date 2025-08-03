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
  <rect width="32" height="32" fill="#6366f1" rx="4"/>
  
  <!-- Game board grid -->
  <g stroke="#ffffff" stroke-width="1" fill="none" opacity="0.3">
    <!-- Vertical lines -->
    <line x1="10.67" y1="4" x2="10.67" y2="28"/>
    <line x1="21.33" y1="4" x2="21.33" y2="28"/>
    <!-- Horizontal lines -->
    <line x1="4" y1="10.67" x2="28" y2="10.67"/>
    <line x1="4" y1="21.33" x2="28" y2="21.33"/>
  </g>
  
  <!-- X symbols (blue) -->
  <g stroke="#ffffff" stroke-width="2" fill="none">
    <!-- Top-left X -->
    <line x1="6" y1="6" x2="9.33" y2="9.33"/>
    <line x1="9.33" y1="6" x2="6" y2="9.33"/>
    
    <!-- Center X -->
    <line x1="16.67" y1="16.67" x2="20" y2="20"/>
    <line x1="20" y1="16.67" x2="16.67" y2="20"/>
    
    <!-- Bottom-right X -->
    <line x1="22.67" y1="22.67" x2="26" y2="26"/>
    <line x1="26" y1="22.67" x2="22.67" y2="26"/>
  </g>
  
  <!-- O symbols (orange) -->
  <g stroke="#f59e0b" stroke-width="2" fill="none">
    <!-- Top-center O -->
    <circle cx="16" cy="6" r="2"/>
    
    <!-- Center-left O -->
    <circle cx="6" cy="16" r="2"/>
    
    <!-- Bottom-center O -->
    <circle cx="16" cy="26" r="2"/>
    
    <!-- Center-right O -->
    <circle cx="26" cy="16" r="2"/>
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
console.log('   - X symbols in white');
console.log('   - O symbols in orange (#f59e0b)');
console.log('   - Blue background (#6366f1) matching the app theme'); 