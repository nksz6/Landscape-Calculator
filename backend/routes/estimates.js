const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//code for saving an estimate
// @route   POST api/estimates
// @desc    Save a new estimate
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
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

        res.status(201).json(newEstimate.rows[0]);

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const allEstimates = await pool.query(
            "SELECT * FROM estimates WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        res.json(allEstimates.rows);

    } catch (err) {
    res.status(500).send('Server Error');
    }
});

module.exports = router;