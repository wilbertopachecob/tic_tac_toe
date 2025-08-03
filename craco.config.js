const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Ensure resolve extensions include TypeScript files
      if (!webpackConfig.resolve.extensions) {
        webpackConfig.resolve.extensions = [];
      }
      
      // Add TypeScript extensions if they don't exist
      if (!webpackConfig.resolve.extensions.includes('.tsx')) {
        webpackConfig.resolve.extensions.unshift('.tsx');
      }
      if (!webpackConfig.resolve.extensions.includes('.ts')) {
        webpackConfig.resolve.extensions.unshift('.ts');
      }
      
      return webpackConfig;
    },
  },
}; 