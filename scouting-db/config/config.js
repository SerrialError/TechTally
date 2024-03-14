const fs = require('fs');

const config = {
  PORT: process.env.NODE_PORT,
  db: {
    ssl: {
      rejectUnauthorized : false,
      ca   : fs.readFileSync("server-ca.pem").toString(),
    },
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DATABASE,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
  },
};
module.exports = config;
