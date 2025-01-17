const client = require('./client');
const fs = require('fs').promises;
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
                Description VARCHAR(5000),
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

async function jsonFileToObject(filePath) {
    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      throw error;
    }
  };

  function transformJsonToBooksFields(jsonData) {
    return jsonData.map(item => {
      return {
        Field_1: item.field_1 || "",
        Field_2: item.field_2 || "",
        Field3: item.field3 || "",
        Topic: item.topic || "",
        Family: item.family || "",
        pk: item.pk || "",
        DOC: item.doc || "",
        Author: item.author || "",
        Availability: item.availability || "",
        AvailableDate: item.availabledate || "",
        Binding: item.binding || "",
        Cover: item.cover || "",
        CrossReference: item.crossreference || "",
        Description: item.description || "",
        ExtraDescription: item.extradescription || "",
        Format: item.format || "",
        ISBN: item.isbn || "",
        ISSN: item.issn || "",
        KeyPhrases: item.keyphrases || "",
        ListID: item.listid || "",
        Note: item.note || "",
        Price: item.price || "",
        PriceNonUS: item.pricenonus || "",
        Publisher: item.publisher || "",
        QuantityPrice: item.quantityprice || "",
        StandingOrderCode: item.standingordercode || "",
        StatusDate: item.statusdate || "",
        StockNumber: item.stocknumber || "",
        SubjectBibliography: item.subjectbibliography || "",
        SuDocsClass: item.sudocsclass || "",
        Title: item.title || "",
        Unit: item.unit || "",
        UnitNonUS: item.unitnonus || "",
        Weight: item.weight || "",
        YearPages: item.yearpages || "",
        Hyperlink: item.hyperlink || ""
      };
    });
  };
  
  async function createInitialBooks() {
    console.log("Creating initial books...");
    try {
      const filePath = "db/books_11DEC2024.json"; // Your file path
      const jsonResult = await jsonFileToObject(filePath); // Parse the JSON file
  
      // Transform the JSON data into the format expected by the createBooks function
      const transformedBooks = transformJsonToBooksFields(jsonResult);
  
      // Create books asynchronously using createBooks
      const createdBooks = await Promise.all(transformedBooks.map(createBooks));
  
      console.log("Finished creating books...");
      return createdBooks; // Optionally return the created books
    } catch (error) {
      console.error("Error creating initial books:", error);
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
                imageurl: 'https://claitors.com/hblu21.jpg',
                buttonurl: 'https://claitors.fly.dev/books/details/4139',
                price: '$10.00'
            },
            {
                id: 2,
                label: 'home-main-banner',
                title: 'Louisiana Liability & Property Insurance Coverage Law',
                description: 'This is a handbook for those who practice law, handle claims, and write or sell insurance. Years ago, for my own use and for the benefit of clients and friends, I began writing and updating a booklet on insurance law in Louisiana. I finally decided that others could benefit from a coverage handbook. This is not an insurance law treatise — Louisiana already has an excellent one in the McKenzie and Johnson treatise. But for those liability and property insurance issues most commonly seen by lawyers and claims adjusters, this handbook hopefully provides some understanding and points those seeking answers in the right direction.',
                imageurl: 'https://claitors.com/9781598048940.jpg',
                buttonurl: 'https://claitors.fly.dev/books/details/46721',
                price: '$75.00'
            },
            {
                id: 3,
                label: 'home-main-banner',
                title: 'LOUISIANA MINERAL LEASES: A TREATISE',
                description: 'In rich detail, the Treatise examines the evolution of the mineral lease under the civil law that prevails in Louisiana; the contours and various attributes of the lease relationship; the statutory laws that regulate it, as well as the clauses (both customary and special) contained in the mineral lease forms used in Louisiana. Additionally, the Treatise analyzes the types and kinds of mineral lease; transfers of the lease contract, as well as security interests in the mineral lease, and remedies for the breach of the lease.',
                imageurl: 'https://claitors.com/9871598047875.main.gif',
                buttonurl: 'https://claitors.fly.dev/books/details/36823',
                price: '$10.00'
            },
            {
                id: 4,
                label: 'home-ind',
                title: 'Occupational Outlook Handbook',
                description: 'N/A',
                imageurl: 'https://claitors.com/9871598047875.main.gif',
                buttonurl: 'https://claitors.fly.dev/books/details/4044',
                price: 'Paperbound $25.00 | Hardcover $40.00'
            },
            {
                id: 5,
                label: 'home-ind',
                title: 'North American Industry Classification System',
                description: 'N/A',
                imageurl: 'https://www.census.gov/naics/resources/img/2022_manual_cover.png',
                buttonurl: 'https://claitors.fly.dev/books/details/46696',
                price: 'Paperbound $55.00 | Hardcover $65.00'
            },
            {
                id: 6,
                label: 'home-ind',
                title: 'The United States Government Manual 2015',
                description: 'N/A',
                imageurl: 'https://m.media-amazon.com/images/I/61j-5SpcsnL._AC_UF1000,1000_QL80_.jpg',
                buttonurl: 'https://claitors.fly.dev/books/details/36702',
                price: 'Paperbound $35.00'
            },
            {
                id: 7,
                label: 'home-ind',
                title: 'Louisiana Wild Turkeys: History, Science, Management, & Hunting',
                description: 'N/A',
                imageurl: 'https://m.media-amazon.com/images/I/91qpNfDmeyL._AC_UF1000,1000_QL80_.jpg',
                buttonurl: 'https://claitors.fly.dev/books/details/46695',
                price: '$24.95'
            },
            {
                id: 8,
                label: 'home-ind',
                title: 'Official Congressional Directory,2015-16, 114th Congress',
                description: 'N/A',
                imageurl: 'https://m.media-amazon.com/images/I/51AN4rye55L.jpg',
                buttonurl: 'https://claitors.fly.dev/books/details/36825',
                price: '$45.00'
            },
            
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