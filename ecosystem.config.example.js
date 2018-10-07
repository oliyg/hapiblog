module.exports = {
  apps: [
    {
      name: 'hapiblog',
      script: 'app.js',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'username',
      host: '0.0.0.0',
      port: '0000',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install --registry=https://registry.npm.taobao.org && cp .env.example .env',
    },
  },
};
