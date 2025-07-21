const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware'); // Import our new middleware

const router = express.Router();

// @route   POST api/estimates
// @desc    Save a new estimate
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    // Because of authMiddleware, we have access to req.user.id
    const userId = req.user.id;
    const {
        serviceName,
        materialName,
        inputValue,
        unitLabel,
        estimatedCost
    } = req.body;

    // Basic validation
    if (!serviceName || !inputValue || !unitLabel || !estimatedCost) {
        return res.status(400).json({ error: 'Missing required estimate data.' });
    }

    try {
        const newEstimate = await pool.query(
            `INSERT INTO estimates (user_id, service_name, material_name, input_value, unit_label, estimated_cost)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [userId, serviceName, materialName, inputValue, unitLabel, estimatedCost]
        );

        res.status(201).json(newEstimate.rows[0]); // 201 Created is the correct status code

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;