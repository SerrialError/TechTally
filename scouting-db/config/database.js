const { Pool } = require('pg');
const fs = require('fs');
const config = require("./config");

const pool = new Pool({
  ssl: {
    rejectUnauthorized : false,
    ca   : fs.readFileSync("server-ca.pem").toString(),
  },
  user: String(config.db.user),
  password: String(config.db.password),
  host: String(config.db.host),
  port: config.db.port,
  database: config.db.database,
});
const dbCon = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
};

module.exports = dbCon;
