// /home/huawenfrontend/ecosystem.config.js
module.exports = {
  apps: [{
    name: 'astro-ssr-app',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};