const client = require("./client");

async function createContent({
    label,
    title, 
    description,
    imageurl,
    buttonurl,
    price
}) {
    try {
        const { rows: [content] } = await client.query(`
        INSERT INTO content(label, title, description, imageurl, buttonurl, price)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [label, title, description, imageurl, buttonurl, price]);

        return content;
    } catch (error) {
        console.error(error, 'Error creating content in DB');
    }
};

async function editContent({ id, fields = {} }) {
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1 }`).join(', ');

    if (setString === 0) {
        return;
    };

    try {
        const { rows: [content] } = await client.query(`
        UPDATE content
        SET ${ setString }
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));

        return content;
    } catch (error) {
        console.error(error, 'Error editing content in DB');
    }
};

async function getAllContent() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM content;
        `);

        return rows;
    } catch (error) {
        console.error(error, 'Error getting all content in DB');
    }
};

async function getContentById(id) {
    try {
        const { rows: [content] } = await client.query(`
        SELECT * FROM content
        WHERE id = $1;
        `, [id]);

        return content;
    } catch (error) {
        console.error(error, 'Error getting content by id in DB');
    }
};

async function deleteIndContent(id) {
    try {
        const { rows: [content] } = await client.query(`
        DELETE FROM content
        WHERE id=$1;
        `, [id]);

    } catch (error) {
        console.error(error, 'Error deleting individual content in DB');
    }
};

module.exports = { createContent, editContent, getAllContent, getContentById, deleteIndContent };