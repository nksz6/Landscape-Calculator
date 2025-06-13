const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const ***REMOVED*** = ***REMOVED***;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'landscaping_calculator',
    ***REMOVED***: '***REMOVED***', // <-- IM***REMOVED***ANT: This is actual ***REMOVED***!
    port: 5432,
});

// GET all services with their pricing
app.get('/api/services', async (req, res) => {
    try {
        const query = `
            SELECT
                s.id,
                s.name,
                s.description,
                s.unit_label,
                pr.price_per_unit
            FROM
                services s
            LEFT JOIN
                pricing_rules pr ON s.id = pr.service_id
            ORDER BY
                s.id;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching services' });
    }
});

app.listen(***REMOVED***, () => {
  console.log(`Server is running on http://localhost:${***REMOVED***}`);
});