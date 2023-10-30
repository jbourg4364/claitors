const client = require('./client');
const fs = require('fs');
const { createBooks } = require('./books');


async function dropTables() {
    console.log('Dropping tables...');
    try {
        await client.query(`
        DROP TABLE IF EXISTS books;
        `);
    } catch (error) {
        throw error;
    }
};

async function createTables() {
    console.log('Creating tables...');
    try {
        await client.query(`
            CREATE TABLE books (
                id SERIAL PRIMARY KEY,
                Field_1 VARCHAR(400),
                Field_2 VARCHAR(400),
                Field3 VARCHAR(400),
                Topic VARCHAR(400),
                Family VARCHAR(400),
                pk VARCHAR(400),
                DOC VARCHAR(400),
                Author VARCHAR(400),
                Availability VARCHAR(400),
                AvailableDate VARCHAR(400),
                Binding VARCHAR(400),
                Cover VARCHAR(400),
                CrossReference VARCHAR(400),
                Description VARCHAR(400),
                ExtraDescription VARCHAR(400),
                Format VARCHAR(400),
                ISBN VARCHAR(400),
                ISSN VARCHAR(400),
                KeyPhrases VARCHAR(400),
                ListID VARCHAR(400),
                Note VARCHAR(400),
                Price VARCHAR(400),
                PriceNonUS VARCHAR(400),
                Publisher VARCHAR(400),
                QuantityPrice VARCHAR(400),
                StandingOrderCode VARCHAR(400),
                StatusDate VARCHAR(400),
                StockNumber VARCHAR(400),
                SubjectBibliography VARCHAR(400),
                SuDocsClass VARCHAR(400),
                Title VARCHAR(400),
                Unit VARCHAR(400),
                UnitNonUS VARCHAR(400),
                Weight VARCHAR(400) DEFAULT '5.00',
                YearPages VARCHAR(400),
                Hyperlink VARCHAR(400)
            );
        `);
        console.log('Finished creating tables...');
    } catch (error) {
        throw error;
    }
};

function textFileToJSON(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const header = lines[0].split('|');
    const jsonData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const fields = lines[i].split('|');
      const record = {};
  
      for (let j = 0; j < header.length; j++) {
        // Remove the \r from field names
        const fieldName = header[j].replace(/\r/, '');
        record[fieldName] = fields[j].trim();
      }
  
      jsonData.push(record);
    }
  
    return jsonData;
  }
  
  async function createInitialBooks() {
    console.log('Creating initial books...');
    try {
      const filePath = 'db/CATALOG_1.txt';
      const jsonResult = textFileToJSON(filePath); // Calls the textFileToJSON for JSON data
  
      const books = await Promise.all(jsonResult.map(createBooks));
  
      console.log('Books created:', books);
    } catch (error) {
      console.error('Error creating initial books');
    }
  }

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialBooks();
    } catch (error) {
        console.error('Error during rebuildDB');
        throw error;
    }
};


module.exports = {
    rebuildDB
};