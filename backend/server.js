require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5001;

// --- EXPLICIT CORS CONFIGURATION ---
const allowedOrigins = [
  'https://nikelley.com',
  'https://www.nikelley.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// --- MIDDLEWARE ---
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.'},
});

// Stricter Auth Limiter
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


// --- API ROUTES ---
const userRoutes = require('./routes/users');
const estimateRoutes = require('./routes/estimates');

app.use('/api/users', userRoutes);
app.use('/api/estimates', estimateRoutes);

// GET all services with their pricing
app.get('/api/services', async (req, res) => {
    try {
        const query = `
            SELECT
                s.id, s.name, s.description, s.unit_label,
                json_agg(
                    json_build_object(
                        'rule_id', pr.id,
                        'material_name', pr.material_name,
                        'price_per_unit', pr.price_per_unit,
                        'minimum_charge', pr.minimum_charge
                    )
                ) as pricing_options
            FROM services s
            LEFT JOIN pricing_rules pr ON s.id = pr.service_id
            GROUP BY s.id
            ORDER BY s.id;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        //send a JSON error for consistency
        res.status(500).json({ error: 'Error fetching services' });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});