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
};


async function getAllBooks() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM books;
    `);

    return rows;
  } catch (error) {
    console.error(error, 'Error getting all books in DB');
  }
};

module.exports = {
  createBooks,
  getAllBooks
};
