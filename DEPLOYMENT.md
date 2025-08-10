# Deployment Guide

This document explains how to deploy the Tic Tac Toe React app using PM2 and Cloudflare.

## Prerequisites

Before deploying, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- PM2 (`npm install -g pm2`)
- Cloudflare CLI (`npm install -g wrangler`)

## Local Deployment with PM2

### 1. Build and Deploy

Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
- Install dependencies
- Build the React app
- Stop any existing PM2 processes
- Start the app with PM2
- Save the PM2 configuration

### 2. PM2 Management

```bash
# View app status
pm2 status

# View logs
pm2 logs tic-tac-toe-app

# Restart the app
pm2 restart tic-tac-toe-app

# Stop the app
pm2 stop tic-tac-toe-app

# Remove from PM2
pm2 delete tic-tac-toe-app

# Save current PM2 configuration
pm2 save

# Restore PM2 configuration on reboot
pm2 startup
```

### 3. Access the App

After successful deployment, your app will be available at:
- **Local**: http://localhost:3000
- **Network**: http://your-ip:3000

## Cloudflare Deployment

### 1. Configure Cloudflare

1. Login to Cloudflare and get your API token
2. Configure wrangler:

```bash
wrangler login
```

### 2. Deploy to Cloudflare

```bash
# Build the app first
npm run build

# Deploy to Cloudflare
wrangler pages deploy build --project-name=tic-tac-toe-app
```

### 3. Custom Domain (Optional)

1. Add your domain to Cloudflare
2. Configure DNS records
3. Update the `wrangler.toml` file with your domain

## Environment Variables

The app uses the following environment variables:

- `NODE_ENV`: Set to 'production' for deployment
- `PORT`: Port number (default: 3000)

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `ecosystem.config.js`
2. **Build fails**: Check for TypeScript errors with `npm run type-check`
3. **PM2 not found**: Install globally with `npm install -g pm2`
4. **Permission denied**: Make the deploy script executable with `chmod +x deploy.sh`

### Logs

- **PM2 logs**: `pm2 logs tic-tac-toe-app`
- **Build logs**: Check the console output during `npm run build`
- **Cloudflare logs**: Available in the Cloudflare dashboard

## Production Considerations

1. **Environment**: Always use production environment variables
2. **Monitoring**: Use PM2 monitoring features
3. **Backup**: Regularly backup your PM2 configuration
4. **SSL**: Configure HTTPS for production deployments
5. **CDN**: Use Cloudflare's CDN for better performance

## Rollback

To rollback to a previous version:

```bash
# Stop current deployment
pm2 stop tic-tac-toe-app

# Revert to previous git commit
git checkout HEAD~1

# Rebuild and redeploy
./deploy.sh
```

## Support

For deployment issues:
1. Check the logs: `pm2 logs tic-tac-toe-app`
2. Verify PM2 status: `pm2 status`
3. Check build output for errors
4. Ensure all prerequisites are installed
