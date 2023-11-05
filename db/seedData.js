const client = require('./client');
const fs = require('fs');
const { createBooks, editBook } = require('./books');
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
                label VARCHAR(255) UNIQUE,
                title VARCHAR(255),
                description VARCHAR(1000),
                imageURL VARCHAR(255),
                buttonURL VARCHAR(255),
                price VARCHAR(255)
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
                title: 'NEW 21ST EDITION! $45.00(Save 10% when you order 10+ copies)',
                description: 'The Twenty-first edition of The Bluebook retains the same basic approach to legal citation established by its predecessors. The layout of The Bluebook has been updated to make the information easier to access. Some citation forms have been expanded, elaborated upon, or modified from previous editions to reflect the ever---expanding range of authorities used in legal writing and to respond to suggestions from the community.',
                imageURL: 'https://claitors.com/hblu21.jpg',
                buttonURL: 'https://claitors.com/cgi-bin/clt/cltdetails_ct.cgi?Stock_Number=HBLU21',
                price: '$10.00'
            },
            {
                id: 2,
                label: 'home-ind-one',
                title: 'Occupational Outlook Handbook',
                description: 'N/A',
                imageURL: 'https://m.media-amazon.com/images/I/81yRCBNrA-L._AC_UF1000,1000_QL80_.jpg',
                buttonURL: 'https://claitors.com/hblu21.jpg',
                price: 'Paperbound $25.00 | Hardcover $40.00'
            },
            {
                id: 3,
                label: 'home-ind-two',
                title: 'North American Industry Classification System',
                description: 'N/A',
                imageURL: 'https://www.census.gov/naics/resources/img/2022_manual_cover.png',
                buttonURL: 'https://claitors.com/hblu21.jpg',
                price: 'Paperbound $55.00 | Hardcover $65.00'
            },
            {
                id: 4,
                label: 'home-ind-three',
                title: 'The United States Government Manual 2015',
                description: 'N/A',
                imageURL: 'https://m.media-amazon.com/images/I/61j-5SpcsnL._AC_UF1000,1000_QL80_.jpg',
                buttonURL: 'https://claitors.com/hblu21.jpg',
                price: 'Paperbound $35.00'
            }
            
        ];

        const content = await Promise.all(contentToCreate.map(createContent));
        console.log('Content created:', content);
    } catch (error) {
        console.error(error, 'Error creating initial content in DB');
    }
  };

  async function tryEditBook() {
    console.log("Editing book...");
    try {
        const edit = {
            field_1: "fdsfd",
            field_2: "",
            field3: "",
            topic: "",
            family: "CFR15",
            pk: "",
            doc: "",
            author: "",
            availability: "Available at Claitors",
            availabledate: "",
            binding: "",
            cover: "",
            crossreference: "",
            description: "",
            extradescription: "",
            format: "",
            isbn: "",
            issn: "",
            keyphrases: "",
            listid: "",
            note: "",
            price: "11.00",
            pricenonus: "",
            publisher: "",
            quantityprice: "",
            standingordercode: "",
            statusdate: "",
            stocknumber: "",
            subjectbibliography: "",
            sudocsclass: "",
            title: "Code of Federal Regulations Title 1, General Provisions, 2015",
            unit: "",
            unitnonus: "",
            weight: "2.50",
            yearpages: "",
            hyperlink: "",
      };

      const response = await editBook({id: 1, fields: edit})
      console.log(response);
    } catch (error) {
      console.error(error, "Error editing initial book");
    }
  }


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