const express = require('express');
const booksRouter = express.Router();
const { createBooks, getAllBooks, getBookById } = require('../db');

booksRouter.get('/', async (req, res, next) => {
    try {
        const response = await getAllBooks();
        res.status(200).json(response);
    } catch (error) {
        console.error(error, 'Error getting all books in API');
    }
});

booksRouter.get('/details/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const book = await getBookById(id);
        res.json(book);
    } catch (error) {
        console.error(error, 'Error getting book details in API');
    }
});


module.exports = booksRouter;

// Additional Routes

// /:searchTerm
// /category/:lawBooks
// /details/:id
