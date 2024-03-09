const express = require("express");
const cors = require("cors"); // Import cors
// setup dotenv
const dotenv = require("dotenv");
dotenv.config();

const dbCon = require("./config/database");

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow requests from your Next.js app's origin
  })
);

// NOTE: https://sidorares.github.io/node-mysql2/docs

// Endpoint to handle inserting drivetrain data
app.post("/api/drivetrains", async (req, res) => {
  const { drivetrain } = req.body;
  try {
    console.log(drivetrain);
    const result = await dbCon.query(
      "INSERT INTO drivetrains (type) VALUES (?)",
      [drivetrain]
    );
    const insertedDrivetrain = result[0];
    res.json({
      success: true,
      drivetrain: { id: insertedDrivetrain.insertId, drivetrain: drivetrain },
    });
  } catch (error) {
    console.error("Error inserting drivetrain data:", error);
    res
      .status(500)
      .json({ success: false, error: "Error inserting drivetrain data" });
  }
});

// Endpoint to handle inserting data
app.post("/api/users", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await dbCon.query("INSERT INTO users (name) VALUES (?)", [
      name,
    ]);
    const insertedUser = {
      id: result.insertId,
      name: name,
    };
    res.json({ success: true, user: insertedUser });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, error: "Error inserting data" });
  }
});

app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  try {
    const result = await dbCon.query(
      "SELECT * FROM users JOIN drivetrains ON users.user_id = drivetrains.user_id WHERE users.name LIKE ? OR drivetrain.type LIKE ?",
      [`%${q}%`, `%${q}%`]
    );
    const searchResults = result.rows;
    client.release();
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching teams:", error);
    res.status(500).json({ error: "Error searching teams" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
