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
  origin: '*' // Allow requests from your Next.js app's origin
}));

// Endpoint to handle inserting drivetrain data
app.post('/api/drivetrains', async (req, res) => {
  const { drivetrain } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO drivetrains (type) VALUES ($1) RETURNING *', [drivetrain]);
    const insertedDrivetrain = result.rows[0];
    client.release();
    res.json({ success: true, drivetrain: insertedDrivetrain });
  } catch (error) {
    console.error('Error inserting drivetrain data:', error);
    res.status(500).json({ success: false, error: 'Error inserting drivetrain data' });
  }
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
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM teams WHERE name ILIKE $1 OR drivetrain ILIKE $1', [`%${q}%`]);
    const searchResults = result.rows;
    client.release();
    res.json(searchResults);
  } catch (error) {
    console.error('Error searching teams:', error);
    res.status(500).json({ error: 'Error searching teams' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
