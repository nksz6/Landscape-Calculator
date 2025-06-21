require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the shared pool

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // This is crucial for parsing JSON request bodies

// --- API Routes ---
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// GET all services with their pricing
app.get('/api/services', async (req, res) => {
    try {
        // THIS IS THE CORRECTED QUERY
        const query = `
            SELECT
                s.id,
                s.name,
                s.description,
                s.unit_label,
                json_agg(
                    json_build_object(
                        'rule_id', pr.id,
                        'material_name', pr.material_name,
                        'price_per_unit', pr.price_per_unit,
                        'minimum_charge', pr.minimum_charge
                    )
                ) as pricing_options
            FROM
                services s
            LEFT JOIN
                pricing_rules pr ON s.id = pr.service_id
            GROUP BY
                s.id
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});