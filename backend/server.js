require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

//General API limiter (for all routes starting with /api)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.'},
});

//Stricter Auth Limiter (specifically for login attempts)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many attempts from this IP, please try again in an hour.' },
});

app.use('/api', apiLimiter);
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// --- API Routes ---
const userRoutes = require('./routes/users');
const estimateRoutes = require('./routes/estimates');

app.use('/api/users', userRoutes);
app.use('/api/estimates', estimateRoutes);

// GET all services with their pricing
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