const express = require('express');
const booksRouter = express.Router();
const { createBooks, getAllBooks, getBookById, searchBooks, editBook, deleteBook } = require('../db');

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
        field_1: Field_1,
        field_2: Field_2,
        field3: Field3,
        topic: Topic,
        family: Family,
        pk: pk,
        doc: DOC,
        author: Author,
        availability: Availability,
        availabledate: AvailableDate,
        binding: Binding,
        cover: Cover,
        crossreference: CrossReference,
        description: Description,
        extradescription: ExtraDescription,
        format: Format,
        isbn: ISBN,
        issn: ISSN,
        keyphrases: KeyPhrases,
        listid: ListID,
        note: Note,
        price: Price,
        pricenonus: PriceNonUS,
        publisher: Publisher,
        quantityprice: QuantityPrice,
        standingordercode: StandingOrderCode,
        statusdate: StatusDate,
        stocknumber: StockNumber,
        subjectbibliography: SubjectBibliography,
        sudocsclass: SuDocsClass,
        title: Title,
        unit: Unit,
        unitnonus: UnitNonUS,
        weight: Weight,
        yearpages: YearPages,
        hyperlink: Hyperlink,
      },
    });
    

    res.status(200).json(updateBook);
  } catch (error) {
    console.error(error, "Error editing books in API");
  }
});

booksRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
      const book = await deleteBook(id);
      res.status(200).json(book);
  } catch (error) {
      console.error(error, 'Error getting book details in API');
  }
});

module.exports = booksRouter;


