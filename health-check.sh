#!/bin/bash

# Quick Health Check Script for Raspberry Pi 5 + Cloudflare Tunnel
# Run this script to check if everything is up and running

echo "=========================================="
echo "Raspberry Pi 5 - Health Check"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# 1. Check Cloudflare Tunnel Service
echo "1. Checking Cloudflare Tunnel Service..."
if systemctl is-active --quiet cloudflared; then
    print_status 0 "Cloudflare Tunnel service is running"
else
    print_status 1 "Cloudflare Tunnel service is NOT running"
    echo "   Run: sudo systemctl start cloudflared"
fi

# 2. Check Tunnel Connection
echo ""
echo "2. Checking Tunnel Connection..."
if cloudflared tunnel info my-pi-tunnel &>/dev/null; then
    TUNNEL_STATUS=$(cloudflared tunnel info my-pi-tunnel 2>/dev/null | grep -i "status" | head -1)
    if echo "$TUNNEL_STATUS" | grep -qi "connected"; then
        print_status 0 "Tunnel is connected: $TUNNEL_STATUS"
    else
        print_status 1 "Tunnel exists but may not be connected"
        echo "   Status: $TUNNEL_STATUS"
    fi
else
    print_status 1 "Cannot get tunnel info (may need sudo or tunnel not found)"
fi

# 3. Check PM2 Status
echo ""
echo "3. Checking PM2 Applications..."
if command -v pm2 &> /dev/null; then
    PM2_APPS=$(pm2 list 2>/dev/null | grep -E "online|stopped|errored" | wc -l)
    PM2_ONLINE=$(pm2 list 2>/dev/null | grep "online" | wc -l)
    if [ $PM2_ONLINE -gt 0 ]; then
        print_status 0 "PM2 has $PM2_ONLINE app(s) online"
        echo "   Apps status:"
        pm2 list 2>/dev/null | grep -E "name|online|stopped|errored" | head -5
    else
        print_status 1 "No PM2 apps are online"
        echo "   Run: pm2 restart all"
    fi
else
    print_status 1 "PM2 not found or not in PATH"
fi

# 4. Check Port 3000 (Paint App)
echo ""
echo "4. Checking Port 3000 (Paint App)..."
if curl -s --max-time 3 http://localhost:3000 > /dev/null 2>&1; then
    print_status 0 "Port 3000 is responding"
else
    print_status 1 "Port 3000 is NOT responding"
    echo "   Check: pm2 logs socket-painting-app"
fi

# 5. Check Port 3001 (Tic-Tac-Toe App)
echo ""
echo "5. Checking Port 3001 (Tic-Tac-Toe App)..."
if curl -s --max-time 3 http://localhost:3001 > /dev/null 2>&1; then
    print_status 0 "Port 3001 is responding"
else
    print_status 1 "Port 3001 is NOT responding"
    echo "   Check: pm2 logs tic-tac-toe-app"
fi

# 6. Check if Ports are Listening
echo ""
echo "6. Checking if Ports are Listening..."
if command -v ss &> /dev/null; then
    PORT_3000=$(sudo ss -tlnp 2>/dev/null | grep ":3000 " | wc -l)
    PORT_3001=$(sudo ss -tlnp 2>/dev/null | grep ":3001 " | wc -l)
    
    if [ $PORT_3000 -gt 0 ]; then
        print_status 0 "Port 3000 is listening"
    else
        print_status 1 "Port 3000 is NOT listening"
    fi
    
    if [ $PORT_3001 -gt 0 ]; then
        print_status 0 "Port 3001 is listening"
    else
        print_status 1 "Port 3001 is NOT listening"
    fi
else
    echo -e "${YELLOW}⚠${NC} ss command not available (install iproute2)"
fi

# 7. Check System Resources
echo ""
echo "7. Checking System Resources..."
LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
MEMORY=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
DISK=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

echo "   Load Average: $LOAD"
echo "   Memory Usage: ${MEMORY}%"
echo "   Disk Usage: ${DISK}%"

if (( $(echo "$LOAD > 2.0" | bc -l) )); then
    print_status 1 "High load average (>2.0)"
elif (( $(echo "$MEMORY > 90" | bc -l) )); then
    print_status 1 "High memory usage (>90%)"
elif [ $DISK -gt 90 ]; then
    print_status 1 "High disk usage (>90%)"
else
    print_status 0 "System resources look healthy"
fi

# 8. Check Internet Connectivity
echo ""
echo "8. Checking Internet Connectivity..."
if ping -c 1 -W 2 8.8.8.8 > /dev/null 2>&1; then
    print_status 0 "Internet connectivity OK"
else
    print_status 1 "No internet connectivity"
fi

# 9. Check DNS Resolution
echo ""
echo "9. Checking DNS Resolution..."
if nslookup tictactoe.wilbertopachecob.dev > /dev/null 2>&1; then
    print_status 0 "DNS resolution working"
else
    print_status 1 "DNS resolution may have issues"
fi

# Summary
echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""
echo "If you see any ✗ (red X) above, that component needs attention."
echo ""
echo "Quick fixes:"
echo "  - Restart PM2: pm2 restart all"
echo "  - Restart Tunnel: sudo systemctl restart cloudflared"
echo "  - Check logs: sudo journalctl -u cloudflared -n 50"
echo ""
echo "For detailed troubleshooting, see: 502_ERROR_DIAGNOSTIC_CHECKLIST.md"
echo ""
