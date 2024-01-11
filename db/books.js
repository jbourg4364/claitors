const client = require("./client");

async function createBooks({
  Field_1,
  Field_2,
  Field3,
  Topic,
  Family,
  pk,
  DOC,
  Author,
  Availability,
  AvailableDate,
  Binding,
  Cover,
  CrossReference,
  Description,
  ExtraDescription,
  Format,
  ISBN,
  ISSN,
  KeyPhrases,
  ListID,
  Note,
  Price,
  PriceNonUS,
  Publisher,
  QuantityPrice,
  StandingOrderCode,
  StatusDate,
  StockNumber,
  SubjectBibliography,
  SuDocsClass,
  Title,
  Unit,
  UnitNonUS,
  Weight,
  YearPages,
  Hyperlink,
}) {
  try {
    const {
      rows: [book],
    } = await client.query(
      `
        INSERT INTO books(
          Field_1,
          Field_2,
          Field3,
          Topic,
          Family,
          pk,
          DOC,
          Author,
          Availability,
          AvailableDate,
          Binding,
          Cover,
          CrossReference,
          Description,
          ExtraDescription,
          Format,
          ISBN,
          ISSN,
          KeyPhrases,
          ListID,
          Note,
          Price,
          PriceNonUS,
          Publisher,
          QuantityPrice,
          StandingOrderCode,
          StatusDate,
          StockNumber,
          SubjectBibliography,
          SuDocsClass,
          Title,
          Unit,
          UnitNonUS,
          Weight,
          YearPages,
          Hyperlink
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36)
        RETURNING *;
        `,
      [
        Field_1,
        Field_2,
        Field3,
        Topic,
        Family,
        pk,
        DOC,
        Author,
        Availability,
        AvailableDate,
        Binding,
        Cover,
        CrossReference,
        Description,
        ExtraDescription,
        Format,
        ISBN,
        ISSN,
        KeyPhrases,
        ListID,
        Note,
        Price,
        PriceNonUS,
        Publisher,
        QuantityPrice,
        StandingOrderCode,
        StatusDate,
        StockNumber,
        SubjectBibliography,
        SuDocsClass,
        Title,
        Unit,
        UnitNonUS,
        Weight,
        YearPages,
        Hyperlink,
      ]
    );

    return book;
  } catch (error) {
    console.error(error, "Error creating books in DB");
  }
}

async function getAllBooks() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books;
    `);

    return rows;
  } catch (error) {
    console.error(error, "Error getting all books in DB");
  }
}

async function getBookById(id) {
  try {
    const {
      rows: [book],
    } = await client.query(
      `
    SELECT * FROM books
    WHERE id = $1;
    `,
      [id]
    );

    return book;
  } catch (error) {
    console.error(error, "Error getting book by id in DB");
  }
}

async function searchBooks(keyword) {
  try {
    const keywords = keyword.split(/\s+/); 
    const conditions = keywords.map((word, index) => `
      Title ILIKE $${index + 1}
    `).join(' OR ');

    const query = `
      SELECT * FROM books
      WHERE ${conditions}
    `;

    const { rows } = await client.query(query, keywords.map(word => `%${word}%`));


    return rows;
  } catch (error) {
    console.error(error, "Error searching books in DB");
  }
};

async function searchBooksExactString(keyword) {
  try {
    // Split the search term into individual words
    const searchWords = keyword.split(' ');

    // Construct the tsquery by joining words with the & operator
    const tsqueryString = searchWords.join(' & ');

    const conditions = [
      `to_tsvector('english', Title) @@ to_tsquery('english', $1)`
    ].join(' OR ');

    const query = `
      SELECT * FROM books
      WHERE ${conditions}
    `;

    const { rows } = await client.query(query, [tsqueryString]);

    return rows;
  } catch (error) {
    console.error(error, "Error searching books in DB");
  }
};



async function searchBooksByTwo(keyword) {
  try {
    // Define a list of common stop words
    const stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'with', 'by', 'for', 'to', 'from'];

    // Split the input keyword into individual words
    const keywords = keyword.split(' ');

    // Filter out stop words from the keywords
    const filteredKeywords = keywords.filter(kw => !stopWords.includes(kw.toLowerCase()));

    // Construct the tsquery by joining filtered keywords with the & operator
    const tsqueryString = filteredKeywords.join(' & ');

    // Generate an array to hold the conditions for each keyword
    const conditions = [
      `to_tsvector('english', Title) @@ to_tsquery('english', $1)`
    ];

    // Join the conditions with 'OR' to create the final query
    const query = `
    SELECT * FROM books
    WHERE ${conditions.join(' OR ')}
    `;

    // Execute the query with the tsquery
    const { rows } = await client.query(query, [tsqueryString]);

    return rows;
  } catch (error) {
    console.error(error, "Error searching books in DB");
  }
};





async function editBook({ id, fields = {} }) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

  if (setString.length === 0) {
    return; // If there are no fields to update, exit early.
  }

  try {
    const { rows: [book] } = await client.query(`
      UPDATE books
      SET ${setString}
      WHERE id = $${Object.keys(fields).length + 1} 
      RETURNING *;
    `, [...Object.values(fields), id]);

    return book;
  } catch (error) {
    throw error;
  }
};

async function deleteBook(id) {
  try {
      await client.query(`
      DELETE FROM books
      WHERE id = $1;
      `, [id]);
  } catch (error) {
      throw error; 
  }
};

async function searchTitle(keyword) {
  try {
    // Split the search term into individual words
    const searchWords = keyword.split(' ');

    // Construct the tsquery by joining words with the & operator
    const tsqueryString = searchWords.join(' & ');

    const { rows } = await client.query(`
      SELECT * FROM books
      WHERE to_tsvector('english', Title) @@ to_tsquery('english', $1)
    `, [tsqueryString]);

    return rows;
  } catch (error) {
    console.error(error, 'Error searching books for title in DB');
  }
};



async function searchAuthor(keyword) {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books
    WHERE Author ILIKE '%' || $1 || '%'
    `, [keyword]);

    return rows;
  } catch (error) {
    console.error(error, 'Error searching books for author in DB');
  }
};

async function searchPublisher(keyword) {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books
    WHERE Publisher ILIKE '%' || $1 || '%'
    `, [keyword]);

    return rows;
  } catch (error) {
    console.error(error, 'Error searching books for publisher in DB');
  }
};

async function searchISBN(keyword) {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books
    WHERE ISBN ILIKE '%' || $1 || '%'
    `, [keyword]);

    return rows;
  } catch (error) {
    console.error(error, 'Error searching books for publisher in DB');
  }
};

async function getLastTenBooks() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books
    ORDER BY id DESC
    LIMIT 10;
    `);

    return rows;
  } catch (error) {
    console.error(error, 'Error getting last 10 books in DB');
  }
};



module.exports = {
  createBooks,
  getAllBooks,
  getBookById,
  searchBooks,
  editBook,
  deleteBook,
  searchAuthor,
  searchPublisher,
  searchTitle,
  searchISBN,
  getLastTenBooks,
  searchBooksExactString,
  searchBooksByTwo,
  
};
