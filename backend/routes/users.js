const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // We will create this db connection file next

const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate user input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );

    // 4. Create and sign a JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id },
      process.env.JWT_SECRET,
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

module.exports = router;