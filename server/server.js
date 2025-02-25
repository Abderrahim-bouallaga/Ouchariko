const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: { encrypt: true, trustServerCertificate: false },
};

app.post("/add-review", async (req, res) => {
    try {
        await sql.connect(config);
        await sql.query`INSERT INTO Reviews (name, email, review) VALUES (${req.body.name}, ${req.body.email}, ${req.body.review})`;
        res.status(201).json({ message: "Avis ajouté !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/get-reviews", async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT name, email, review FROM Reviews`;
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Serveur en écoute sur le port 5000"));
