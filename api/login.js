const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();




loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (username === "cladmin" && password === "Claitors225") {
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({
                message: `You're logged in!`,
                token: token,
                user: {
                    id: 'admin',
                    username: username
                },

                
            });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        };

    } catch (error) {
        console.error(error, 'Error logging in ADMIN in API');
    }
});

module.exports = loginRouter;