// server/index.js (Entry point for backend)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.connect(dbConfig)
  .then(() => console.log("Connected to SQL Server"))
  .catch((err) => console.error("Database connection failed:", err));

// Fetch reviews
app.get("/get-reviews", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Reviews");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

// Add a review
app.post("/add-review", async (req, res) => {
  try {
    const { name, email, review } = req.body;
    await sql.query(
      `INSERT INTO Reviews (name, email, review) VALUES ('${name}', '${email}', '${review}')`
    );
    res.json({ success: true, message: "Review added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert review" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
