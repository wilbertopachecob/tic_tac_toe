module.exports = {
  apps: [
    {
      name: 'tic-tac-toe-app',
      script: 'npx',
      args: 'serve -s build -l 3000',
      cwd: '/Users/wilbertopachecobatista/Projects/tic_tac_toe',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
