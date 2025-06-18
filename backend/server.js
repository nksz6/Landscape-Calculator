const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const PORT = 5001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'landscaping_calculator',
  password: 'IamtheAdmin420!', // IMPORTANT: Use your actual password
  port: 5432,
});

app.get('/api/services', async (req, res) => {
    try {
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