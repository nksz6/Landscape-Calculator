const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Get token from the header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No token, authorization denied.' });
    }

    // The header is formatted as "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token format is invalid, authorization denied.' });
    }

    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process***REMOVED***.***REMOVED***);

        // 3. Add user from payload to the request object
        req.user = decoded; // The payload we created in users.js was { id: user.id }
        next(); // Move on to the next piece of middleware or the route handler
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid.' });
    }
};