const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import cors

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'user',
  password: 'password',
  host: 'localhost',
  port: 5433,
  database: 'scouting-db'
});

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from your Next.js app's origin
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to handle inserting data
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
    const insertedUser = result.rows[0];
    client.release();
    res.json({ success: true, user: insertedUser });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, error: 'Error inserting data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
