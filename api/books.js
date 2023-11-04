const express = require('express');
const booksRouter = express.Router();
const { createBooks, getAllBooks, getBookById, searchBooks, editBook } = require('../db');

booksRouter.get('/', async (req, res, next) => {
    try {
        const response = await getAllBooks();
        res.status(200).json(response);
    } catch (error) {
        console.error(error, 'Error getting all books in API');
    }
});

booksRouter.get('/details/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const book = await getBookById(id);
        res.json(book);
    } catch (error) {
        console.error(error, 'Error getting book details in API');
    }
});

booksRouter.get('/search/:keyword', async (req, res, next) => {
    const { keyword } = req.params;
    try {
        const book = await searchBooks(keyword);
        res.json(book);
    } catch (error) {
        console.error(error, 'Error searching books in API');
    }
});

booksRouter.post("/", async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    const newBook = await createBooks({ 
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
        Hyperlink });

        res.status(201).json(newBook);
  } catch (error) {
    console.error(error, "Error creating new book in API");
  }
});

booksRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  try {
    const updateBook = await editBook({
      id: id,
      fields: {
        Field_1: Field_1,
        Field_2: Field_2,
        Field3: Field3,
        Topic: Topic,
        Family: Family,
        pk: pk,
        DOC: DOC,
        Author: Author,
        Availability: Availability,
        AvailableDate: AvailableDate,
        Binding: Binding,
        Cover: Cover,
        CrossReference: CrossReference,
        Description: Description,
        ExtraDescription: ExtraDescription,
        Format: Format,
        ISBN: ISBN,
        ISSN: ISSN,
        KeyPhrases: KeyPhrases,
        ListID: ListID,
        Note: Note,
        Price: Price,
        PriceNonUS: PriceNonUS,
        Publisher: Publisher,
        QuantityPrice: QuantityPrice,
        StandingOrderCode: StandingOrderCode,
        StatusDate: StatusDate,
        StockNumber: StockNumber,
        SubjectBibliography: SubjectBibliography,
        SuDocsClass: SuDocsClass,
        Title: Title,
        Unit: Unit,
        UnitNonUS: UnitNonUS,
        Weight: Weight,
        YearPages: YearPages,
        Hyperlink: Hyperlink,
      },
    });

    res.status(200).json(updateBook);
  } catch (error) {
    console.error(error, "Error editing books in API");
  }
});

module.exports = booksRouter;


