const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;


loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;


    try {
        
        if (username === process.env.ADMIN_LOGIN_ID && password ===process.env.ADMIN_LOGIN_PASS) {
            const token = jwt.sign({ username: username }, SECRET, { expiresIn: '24h' });
            res.status(200).json({
                message: `You're logged in!`,
                token: token,
                user: {
                    id: 'admin',
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