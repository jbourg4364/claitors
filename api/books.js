const express = require('express');
const booksRouter = express.Router();
const { createBooks, getAllBooks } = require('../db');

booksRouter.get('/', async (req, res, next) => {
    try {
        const response = await getAllBooks();
        res.status(200).json(response);
    } catch (error) {
        console.error(error, 'Error getting all books in API');
    }
});





module.exports = booksRouter;