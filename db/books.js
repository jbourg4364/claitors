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
    const { rows } = await client.query(
      `
    SELECT * FROM books
    WHERE
      Field_1 ILIKE '%' || $1 || '%' OR
      Field_2 ILIKE '%' || $1 || '%' OR
      Field3 ILIKE '%' || $1 || '%' OR
      Topic ILIKE '%' || $1 || '%' OR
      Family ILIKE '%' || $1 || '%' OR
      pk ILIKE '%' || $1 || '%' OR
      DOC ILIKE '%' || $1 || '%' OR
      Author ILIKE '%' || $1 || '%' OR
      Availability ILIKE '%' || $1 || '%' OR
      AvailableDate ILIKE '%' || $1 || '%' OR
      Binding ILIKE '%' || $1 || '%' OR
      Cover ILIKE '%' || $1 || '%' OR
      CrossReference ILIKE '%' || $1 || '%' OR
      Description ILIKE '%' || $1 || '%' OR
      ExtraDescription ILIKE '%' || $1 || '%' OR
      Format ILIKE '%' || $1 || '%' OR
      ISBN ILIKE '%' || $1 || '%' OR
      ISSN ILIKE '%' || $1 || '%' OR
      KeyPhrases ILIKE '%' || $1 || '%' OR
      ListID ILIKE '%' || $1 || '%' OR
      Note ILIKE '%' || $1 || '%' OR
      Price ILIKE '%' || $1 || '%' OR
      PriceNonUS ILIKE '%' || $1 || '%' OR
      Publisher ILIKE '%' || $1 || '%' OR
      QuantityPrice ILIKE '%' || $1 || '%' OR
      StandingOrderCode ILIKE '%' || $1 || '%' OR
      StatusDate ILIKE '%' || $1 || '%' OR
      StockNumber ILIKE '%' || $1 || '%' OR
      SubjectBibliography ILIKE '%' || $1 || '%' OR
      SuDocsClass ILIKE '%' || $1 || '%' OR
      Title ILIKE '%' || $1 || '%' OR
      Unit ILIKE '%' || $1 || '%' OR
      UnitNonUS ILIKE '%' || $1 || '%' OR
      Weight ILIKE '%' || $1 || '%' OR
      YearPages ILIKE '%' || $1 || '%' OR
      Hyperlink ILIKE '%' || $1 || '%'
    `,
      [keyword]
    );

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
}




module.exports = {
  createBooks,
  getAllBooks,
  getBookById,
  searchBooks,
  editBook
};
