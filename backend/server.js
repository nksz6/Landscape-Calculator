require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the shared pool
const rateLimit = require('express-rate-limit'); //Import the rate-limit package

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // This is crucial for parsing JSON request bodies


// --- Configure and apply rate limiting ---


//General API limiter (for all routes starting with /api)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 mins
    max: 100, //limit each IP to 100 requests per 'window' (every 15 minutes)
    standardHeaders: true, //return rate limit info in the 'RateLimit-*' headers
    legacyHeaders: false, //disable the 'X-RateLimit-*' headers
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.'},
});


//Stricter Auth Limiter (specifically for login attempts)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, //1 hour
    max: 5, //limit each IP to 5 attemps per 'window' (every 1 hour)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many attempts from this IP, please try again in an hour.' }, //general message for both login and registration endpoints...
});


//Apply the limiters to the app
app.use('/api', apiLimiter); //apply the general limiter to all API routes
app.use('/api/users/login', authLimiter); //Apply the stricter limiter specifically to the login route
app.use('/api/users/register', authLimiter); //also apply to the registration route



// --- API Routes ---
const userRoutes = require('./routes/users');
const estimateRoutes = require('./routes/estimates'); //requiring new root file

app.use('/api/users', userRoutes);
app.use('/api/estimates', estimateRoutes); //USE new route

//the Express server is listening.

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