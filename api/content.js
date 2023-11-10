const express = require('express');
const contentRouter = express.Router();
const { getAllContent, editContent, getContentById } = require('../db');


contentRouter.get('/', async (req, res, next) => {
    try {
        const response = await getAllContent();
        res.status(200).json(response);
    } catch (error) {
        console.error(error, 'Error getting all content in API');
    }
});

contentRouter.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { description, title, imageurl, buttonurl, price } = req.body;

    try {
        const updateContent = await editContent({id: id, fields: {title: title,
        description: description, imageurl: imageurl, buttonurl: buttonurl, price: price}});
        
        res.status(200).json(updateContent);
    } catch (error) {
        console.error(error, 'Error editing content in API');
    }
});


module.exports = contentRouter;