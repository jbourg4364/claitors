const client = require('./client');
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
                Field_1 VARCHAR(255),
                Field_2 VARCHAR(255),
                Field3 VARCHAR(255),
                Topic VARCHAR(255),
                Family VARCHAR(255),
                pk VARCHAR(255),
                DOC VARCHAR(255),
                Author VARCHAR(255),
                Availability VARCHAR(255),
                AvailableDate VARCHAR(400),
                Binding VARCHAR(255),
                Cover VARCHAR(255),
                CrossReference VARCHAR(255),
                Description VARCHAR(255),
                ExtraDescription VARCHAR(255),
                Format VARCHAR(255),
                ISBN VARCHAR(255),
                ISSN VARCHAR(255),
                KeyPhrases VARCHAR(255),
                ListID VARCHAR(255),
                Note VARCHAR(255),
                Price VARCHAR(255),
                PriceNonUS VARCHAR(255),
                Publisher VARCHAR(255),
                QuantityPrice VARCHAR(255),
                StandingOrderCode VARCHAR(255),
                StatusDate VARCHAR(255),
                StockNumber VARCHAR(255),
                SubjectBibliography VARCHAR(255),
                SuDocsClass VARCHAR(255),
                Title VARCHAR(255),
                Unit VARCHAR(255),
                UnitNonUS VARCHAR(255),
                Weight VARCHAR(255) DEFAULT '5.00',
                YearPages VARCHAR(255),
                Hyperlink VARCHAR(255)
            );
        `);
        console.log('Finished creating tables...');
    } catch (error) {
        throw error;
    }
};

async function createInitialBooks() {
    console.log('Creating initial books...');
    try {
        const pendingBooks = [
            
                {
                    "Field_1": "top new",
                    "Field_2": "",
                    "Field3": "",
                    "Topic": "",
                    "Family": "",
                    "pk": "govtprintingoffice",
                    "DOC": "1. in stock / whse and/or retail / price",
                    "Author": "",
                    "Availability": "",
                    "AvailableDate": "Economic Report of the President Transmitted to the Congress March 2013 together with the Annual Report of the Council of Economic Advisers. Contains the Economic Report of the President and the Annual Report of the Council of Economic Advisers. Item 8",
                    "Binding": "",
                    "Cover": "",
                    "CrossReference": "",
                    "Description": "",
                    "ExtraDescription": "",
                    "Format": "",
                    "ISBN": "1-59804-683-7",
                    "ISSN": "",
                    "KeyPhrases": "",
                    "List ID": "",
                    "Note": "",
                    "Price": "48.00",
                    "PriceNonUS": "",
                    "Publisher": "",
                    "QuantityPrice": "",
                    "StandingOrderCode": "",
                    "StatusDate": "03/21/2013",
                    "StockNumber": "1-59804-683-7",
                    "SubjectBibliography": "",
                    "SuDocsClass": "",
                    "Title": "Economic Report of The President, 2013",
                    "Unit": "",
                    "UnitNonUS": "",
                    "Weight": "1.18",
                    "YearPages": "",
                    "Hyperlink": "",
                },
                {
                    "Field_1": "",
                    "Field_2": "",
                    "Field3": "",
                    "Topic": "",
                    "Family": "",
                    "pk": "govtprintingoffice",
                    "DOC": "Available at Claitors",
                    "Author": "",
                    "Availability": "",
                    "AvailableDate": "EST. DELIVERY Date 10/28/12. In general, information available as of January 1, 2012 was used in the preparation of this edition. Provides brief information on the geography, people, government, economy, communications, and defense of countries and region",
                    "Binding": "",
                    "Cover": "",
                    "CrossReference": "",
                    "Description": "",
                    "ExtraDescription": "",
                    "Format": "",
                    "ISBN": "9781598046823",
                    "ISSN": "",
                    "KeyPhrases": "",
                    "List ID": "",
                    "Note": "",
                    "Price": "83.00",
                    "PriceNonUS": "",
                    "Publisher": "",
                    "QuantityPrice": "",
                    "StandingOrderCode": "",
                    "StatusDate": "09-22-11",
                    "StockNumber": "9781598046823",
                    "SubjectBibliography": "",
                    "SuDocsClass": "",
                    "Title": "The World Factbook 2012-13",
                    "Unit": "",
                    "UnitNonUS": "",
                    "Weight": "2.00",
                    "YearPages": "",
                    "Hyperlink": "",
                },
                {
                    "Field_1": "newrel",
                    "Field_2": "",
                    "Field3": "",
                    "Topic": "",
                    "Family": "",
                    "pk": "govtprintingoffice",
                    "DOC": "1. in stock / whse and/or retail / price",
                    "Author": "",
                    "Availability": "",
                    "AvailableDate": "2012 basic manual. COF12. File Code iX.",
                    "Binding": "",
                    "Cover": "",
                    "CrossReference": "",
                    "Description": "",
                    "ExtraDescription": "",
                    "Format": "",
                    "ISBN": "1-59804-675-6",
                    "ISSN": "",
                    "KeyPhrases": "O/N 10-029.",
                    "List ID": "",
                    "Note": "",
                    "Price": "117.00",
                    "PriceNonUS": "",
                    "Publisher": "",
                    "QuantityPrice": "",
                    "StandingOrderCode": "",
                    "StatusDate": "02-02-12",
                    "StockNumber": "1-59804-675-6",
                    "SubjectBibliography": "",
                    "SuDocsClass": "",
                    "Title": "Catalog of Federal Domestic Assistance 2012 Edition",
                    "Unit": "",
                    "UnitNonUS": "",
                    "Weight": "13.00",
                    "YearPages": "",
                    "Hyperlink": "",
                },
                {
                    "Field_1": "newrel pp",
                    "Field_2": "",
                    "Field3": "",
                    "Topic": "",
                    "Family": "",
                    "pk": "",
                    "DOC": "Marie-Antoinette Menier",
                    "Author": "Available at Claitors",
                    "Availability": "",
                    "AvailableDate": "",
                    "Binding": "",
                    "Cover": "",
                    "CrossReference": "",
                    "Description": "",
                    "ExtraDescription": "",
                    "Format": "",
                    "ISBN": "1-59804-674-8",
                    "ISSN": "",
                    "KeyPhrases": "Preface by Winston De Ville",
                    "List ID": "",
                    "Note": "",
                    "Price": "75.00",
                    "PriceNonUS": "",
                    "Publisher": "",
                    "QuantityPrice": "",
                    "StandingOrderCode": "",
                    "StatusDate": "",
                    "StockNumber": "1-59804-674-8",
                    "SubjectBibliography": "",
                    "SuDocsClass": "",
                    "Title": "Louisiana Letters: 1678-1803",
                    "Unit": "",
                    "UnitNonUS": "",
                    "Weight": "3.00",
                    "YearPages": "",
                    "Hyperlink": "",
                },
                {
                    "Field_1": "",
                    "Field_2": "",
                    "Field3": "",
                    "Topic": "",
                    "Family": "",
                    "pk": "govtprintingoffice",
                    "DOC": "1. in stock / whse and/or retail / price",
                    "Author": "",
                    "Availability": "",
                    "AvailableDate": "NCES 2015-XXX. The 49th in a series of publications initiated in 1962, the Digest's primary purpose is to provide a compilation of statistical information covering the broad field of American education from prekindergarten through graduate school. The Dig",
                    "Binding": "",
                    "Cover": "",
                    "CrossReference": "",
                    "Description": "",
                    "ExtraDescription": "",
                    "Format": "",
                    "ISBN": "1-59804-763-9",
                    "ISSN": "",
                    "KeyPhrases": "",
                    "List ID": "",
                    "Note": "",
                    "Price": "69.00",
                    "PriceNonUS": "",
                    "Publisher": "",
                    "QuantityPrice": "",
                    "StandingOrderCode": "",
                    "StatusDate": "05-11-15",
                    "StockNumber": "1-59804-763-9",
                    "SubjectBibliography": "",
                    "SuDocsClass": "",
                    "Title": "Digest of Education Statistics 2013",
                    "Unit": "",
                    "UnitNonUS": "",
                    "Weight": "5.00",
                    "YearPages": "",
                    "Hyperlink": "",
                }
        ];

        const books = await Promise.all(pendingBooks.map(createBooks));

        console.log('Books created:', books);
    } catch (error) {
        console.error('Error creating initial books');
    }
};

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