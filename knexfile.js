const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'server', 'db');

module.exports = {
  development: {
    client: 'mysql',
    connection: '127.0.0.1',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
