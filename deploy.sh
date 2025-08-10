#!/bin/bash

# Tic Tac Toe React App Deployment Script
# This script builds the React app and deploys it using PM2
# 
# IMPORTANT: Make sure this script has executable permissions:
# chmod +x deploy.sh

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ Error: PM2 is not installed. Please install it first: npm install -g pm2"
    exit 1
fi

# Check if serve is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not available. Please check your Node.js installation."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the React app..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Error: Build failed. build directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Stop existing PM2 process if running
echo "🛑 Stopping existing PM2 process..."
pm2 stop tic-tac-toe-app 2>/dev/null || true
pm2 delete tic-tac-toe-app 2>/dev/null || true

# Start the app with PM2
echo "🚀 Starting app with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Show status
echo "📊 PM2 Status:"
pm2 status

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should be running on http://localhost:3000"
echo ""
echo "📋 Useful PM2 commands:"
echo "  pm2 logs tic-tac-toe-app    - View logs"
echo "  pm2 restart tic-tac-toe-app - Restart the app"
echo "  pm2 stop tic-tac-toe-app    - Stop the app"
echo "  pm2 delete tic-tac-toe-app  - Remove the app from PM2"
