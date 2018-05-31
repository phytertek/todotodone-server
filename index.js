const enmapi = require('enmapi');
const devConf =
  process.env.NODE_ENV === 'development' ? require('./dev.conf.json') : {};
enmapi.server.setConfig({
  Level: process.env.NODE_ENV || 'development',
  Name: process.env.NAME || 'server component repo',
  Host: process.env.HOST || 'http://localhost',
  Port: process.env.PORT || 3333,
  DatabaseName: process.env.DBNAME || 'server DB',
  DatabaseURI: process.env.DB_URI || devConf.DB_URI,
  JWTSecret: process.env.JWTSECRET || devConf.JWTSECRET
});

enmapi.server.start();
