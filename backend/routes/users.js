const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//step 1 - register
// POST /api/users/register --- REGISTER

//validation middleware to route definition
router.post('/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('***REMOVED***', '***REMOVED*** must be at least 6 characters long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return the first error message for simplicity
      return res.status(400).json({ errors: errors.array()[0].msg });
    }


  try {
    const { email, ***REMOVED*** } = req.body;

    // 1. Validate user input
    if (!email || !***REMOVED***) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }

    // 2. Hash the ***REMOVED***
    const salt = await bcrypt.genSalt(10);
    const ***REMOVED***Hash = await bcrypt.hash(***REMOVED***, salt);

    // 3. Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (email, ***REMOVED***_hash) VALUES ($1, $2) RETURNING id, email",
      [email, ***REMOVED***Hash]
    );

    // 4. Create and sign a JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id },
      process***REMOVED***.***REMOVED***,
      { expiresIn: '1h' }
    );

    // 5. Send the token back to the client
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    // Handle a "unique constraint" violation (email already exists)
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email is already in use.' });
    }
    res.status(500).send('Server error');
  }
});

// step 2 - login
// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, ***REMOVED*** } = req.body;

    // 1. Validate input
    if (!email || !***REMOVED***) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }

    // 2. Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      // We use a generic error message for security
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // 3. Compare the provided ***REMOVED*** with the stored hash
    const isMatch = await bcrypt.compare(***REMOVED***, user.rows[0].***REMOVED***_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // 4. If credentials are correct, create and sign a JWT
    const token = jwt.sign(
      { id: user.rows[0].id },
      process***REMOVED***.***REMOVED***,
      { expiresIn: '1h' }
    );

    // 5. Send the token back to the client
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;