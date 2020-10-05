module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'auchi',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',                                                             //也可以useradd另建用户
      host : '47.97.82.183',                                                  // 服务器地址
      port : '22',                                                            // 端口号
      ref  : 'origin/master',
      repo : 'git@github.com:stevenxu9494/auchi_backend.git',            // github上的项目地址
      path : '/www/xc/depoly',                                                //  服务器上放项目的目录
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'root',
      host : '47.97.82.183',
      port : '22',                                                            // 端口号
      ref  : 'origin/master',
      repo : 'git@github.com:stevenxu9494/auchi_backend.git',
      path : '/www/xc/depoly',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};