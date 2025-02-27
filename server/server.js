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

// Connect to the database
sql.connect(dbConfig)
  .then(() => console.log("Connected to SQL Server"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Fetch reviews
app.get("/get-reviews", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Reviews");
    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    res.json(result.recordset);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Add a review
app.post('/add-review', async (req, res) => {
    try {
        const { name, email, review } = req.body;
        if (!name || !email || !review) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('review', sql.NVarChar, review)
            .query('INSERT INTO Reviews (name, email, review) VALUES (@name, @email, @review)');

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
