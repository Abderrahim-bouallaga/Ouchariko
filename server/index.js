require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Database Configuration
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

// Connect to Database
sql.connect(dbConfig)
  .then(() => console.log("Connected to Azure SQL Database"))
  .catch((err) => console.error("Database connection failed:", err));

// Sample API Route
app.get("/get-reviews", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Reviews"); // Change "Reviews" to your actual table
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
