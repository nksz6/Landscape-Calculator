const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // <-- Import the pg Pool

const app = express();
app.use(cors());
const PORT = 5001;

// --- DATABASE CONNECTION ---

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'landscaping_calculator',
    password: 'iAuthAdmin420!', // <-- IMPORTANT: This is actual password!
    port: 5432,
});

// --- API ENDPOINTS ---

// GET all services
app.get('/api/services', async (req, res) => {
    try {
        // Query the database to get all rows from the services table
        const result = await pool.query('SELECT * FROM services ORDER BY id');
        // Send the results back as a JSON array
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching services' });
    }
});

// Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});