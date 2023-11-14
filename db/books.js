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
      Field_1 ILIKE '%' || $${index + 1} || '%' OR
      Field_2 ILIKE '%' || $${index + 1} || '%' OR
      Field3 ILIKE '%' || $${index + 1} || '%' OR
      Topic ILIKE '%' || $${index + 1} || '%' OR
      Family ILIKE '%' || $${index + 1} || '%' OR
      pk ILIKE '%' || $${index + 1} || '%' OR
      DOC ILIKE '%' || $${index + 1} || '%' OR
      Author ILIKE '%' || $${index + 1} || '%' OR
      Availability ILIKE '%' || $${index + 1} || '%' OR
      AvailableDate ILIKE '%' || $${index + 1} || '%' OR
      Binding ILIKE '%' || $${index + 1} || '%' OR
      Cover ILIKE '%' || $${index + 1} || '%' OR
      CrossReference ILIKE '%' || $${index + 1} || '%' OR
      Description ILIKE '%' || $${index + 1} || '%' OR
      ExtraDescription ILIKE '%' || $${index + 1} || '%' OR
      Format ILIKE '%' || $${index + 1} || '%' OR
      ISBN ILIKE '%' || $${index + 1} || '%' OR
      ISSN ILIKE '%' || $${index + 1} || '%' OR
      KeyPhrases ILIKE '%' || $${index + 1} || '%' OR
      ListID ILIKE '%' || $${index + 1} || '%' OR
      Note ILIKE '%' || $${index + 1} || '%' OR
      Price ILIKE '%' || $${index + 1} || '%' OR
      PriceNonUS ILIKE '%' || $${index + 1} || '%' OR
      Publisher ILIKE '%' || $${index + 1} || '%' OR
      QuantityPrice ILIKE '%' || $${index + 1} || '%' OR
      StandingOrderCode ILIKE '%' || $${index + 1} || '%' OR
      StatusDate ILIKE '%' || $${index + 1} || '%' OR
      StockNumber ILIKE '%' || $${index + 1} || '%' OR
      SubjectBibliography ILIKE '%' || $${index + 1} || '%' OR
      SuDocsClass ILIKE '%' || $${index + 1} || '%' OR
      Title ILIKE '%' || $${index + 1} || '%' OR
      Unit ILIKE '%' || $${index + 1} || '%' OR
      UnitNonUS ILIKE '%' || $${index + 1} || '%' OR
      Weight ILIKE '%' || $${index + 1} || '%' OR
      YearPages ILIKE '%' || $${index + 1} || '%' OR
      Hyperlink ILIKE '%' || $${index + 1} || '%'
    `).join(' OR ');

    const query = `
      SELECT * FROM books
      WHERE ${conditions}
    `;

    const { rows } = await client.query(query, keywords);

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
    const { rows } = await client.query(`
    SELECT * FROM books
    WHERE Title ILIKE '%' || $1 || '%'
    `, [keyword]);

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
  searchISBN
};
