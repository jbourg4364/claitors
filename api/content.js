const express = require('express');
const contentRouter = express.Router();
const { getAllContent, editContent, getContentById, createContent, deleteIndContent } = require('../db');


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

contentRouter.post('/', async (req, res, next) => {
    const { label, title, description, imageurl, buttonurl, price } = req.body;
    try {
        const newContent = await createContent({ label: label, title: title, description: description, imageurl: imageurl, buttonurl: buttonurl, price: price });

        res.status(200).json(newContent);
    } catch (error) {
        console.error(error, 'Error posting book to home page in API')
    }
});

contentRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteContent = await deleteIndContent(id);

        res.status(200).json(deleteContent);
    } catch (error) {
        console.error(error, 'Error posting book to home page in API')
    }
});


module.exports = contentRouter;