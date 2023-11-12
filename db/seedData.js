const client = require('./client');
const fs = require('fs');
const { createBooks } = require('./books');
const { createContent } = require('./content');


async function dropTables() {
    console.log('Dropping tables...');
    try {
        await client.query(`
        DROP TABLE IF EXISTS content;
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
                Description VARCHAR(1000),
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

            CREATE TABLE content (
                id SERIAL PRIMARY KEY,
                label VARCHAR(255),
                title VARCHAR(1000),
                description VARCHAR(1000),
                imageURL VARCHAR(1000),
                buttonURL VARCHAR(1000),
                price VARCHAR(1000)
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
    //   const filePath = 'db/CATALOG_1.txt';
      const filePath = 'db/CATALOG.txt';
      const jsonResult = textFileToJSON(filePath); // Calls the textFileToJSON for JSON data
  
      const books = await Promise.all(jsonResult.map(createBooks));
  
      console.log('Finished creating books...');
    } catch (error) {
      console.error('Error creating initial books');
    }
  };

  async function createInitialContent() {
    console.log('Creating initial content...')
    try {
        const contentToCreate = [
            {
                id: 1,
                label: 'home-main-banner',
                title: 'NEW 21ST EDITION! (Save 10% when you order 10+ copies)',
                description: 'The Twenty-first edition of The Bluebook retains the same basic approach to legal citation established by its predecessors. The layout of The Bluebook has been updated to make the information easier to access. Some citation forms have been expanded, elaborated upon, or modified from previous editions to reflect the ever---expanding range of authorities used in legal writing and to respond to suggestions from the community.',
                imageURL: 'https://claitors.com/hblu21.jpg',
                buttonURL: 'https://claitors.fly.dev/books/details/4139',
                price: '$10.00'
            },
            {
                id: 2,
                label: 'home-main-banner-two',
                title: 'Louisiana Liability & Property Insurance Coverage Law',
                description: 'This is a handbook for those who practice law, handle claims, and write or sell insurance. Years ago, for my own use and for the benefit of clients and friends, I began writing and updating a booklet on insurance law in Louisiana. I finally decided that others could benefit from a coverage handbook. This is not an insurance law treatise — Louisiana already has an excellent one in the McKenzie and Johnson treatise. But for those liability and property insurance issues most commonly seen by lawyers and claims adjusters, this handbook hopefully provides some understanding and points those seeking answers in the right direction.',
                imageURL: 'https://claitors.com/9781598048940.jpg',
                buttonURL: 'https://claitors.fly.dev/books/details/46721',
                price: '$75.00'
            },
            {
                id: 3,
                label: 'home-main-banner-three',
                title: 'LOUISIANA MINERAL LEASES: A TREATISE',
                description: 'In rich detail, the Treatise examines the evolution of the mineral lease under the civil law that prevails in Louisiana; the contours and various attributes of the lease relationship; the statutory laws that regulate it, as well as the clauses (both customary and special) contained in the mineral lease forms used in Louisiana. Additionally, the Treatise analyzes the types and kinds of mineral lease; transfers of the lease contract, as well as security interests in the mineral lease, and remedies for the breach of the lease.',
                imageURL: 'https://claitors.com/9871598047875.main.gif',
                buttonURL: 'https://claitors.fly.dev/books/details/36823',
                price: '$10.00'
            },
            {
                id: 4,
                label: 'home-ind',
                title: 'Occupational Outlook Handbook',
                description: 'N/A',
                imageURL: 'https://claitors.com/9871598047875.main.gif',
                buttonURL: 'https://claitors.fly.dev/books/details/4044',
                price: 'Paperbound $25.00 | Hardcover $40.00'
            },
            {
                id: 5,
                label: 'home-ind',
                title: 'North American Industry Classification System',
                description: 'N/A',
                imageURL: 'https://www.census.gov/naics/resources/img/2022_manual_cover.png',
                buttonURL: 'https://claitors.fly.dev/books/details/46696',
                price: 'Paperbound $55.00 | Hardcover $65.00'
            },
            {
                id: 6,
                label: 'home-ind',
                title: 'The United States Government Manual 2015',
                description: 'N/A',
                imageURL: 'https://m.media-amazon.com/images/I/61j-5SpcsnL._AC_UF1000,1000_QL80_.jpg',
                buttonURL: 'https://claitors.fly.dev/books/details/36702',
                price: 'Paperbound $35.00'
            }
            
        ];

        const content = await Promise.all(contentToCreate.map(createContent));
        console.log('Content created:', content);
    } catch (error) {
        console.error(error, 'Error creating initial content in DB');
    }
  };



async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialBooks();
        await createInitialContent();
    } catch (error) {
        console.error('Error during rebuildDB');
        throw error;
    }
};


module.exports = {
    rebuildDB
};