module.exports = {
  apps: [
    {
      name: 'tic-tac-toe-app',
      script: 'npx',
      args: 'serve -s build -l 3001 --single',
      cwd: process.cwd(),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
