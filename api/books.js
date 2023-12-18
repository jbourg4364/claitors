const express = require('express');
const booksRouter = express.Router();
const { createBooks, getAllBooks, getBookById, searchBooks, editBook, deleteBook, searchAuthor, searchTitle, searchPublisher, searchISBN, getLastTenBooks, searchBooksExactString, searchBooksByTwo } = require('../db');
const { response } = require('../app');

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
      // Run the search functions concurrently using Promise.all
      const [booksExactString, booksByTwo, booksDefault] = await Promise.all([
          searchBooksExactString(keyword),
          searchBooksByTwo(keyword)
          // searchBooks(keyword)
      ]);

      // Combine the results from all three search functions
      const response = [...booksExactString, ...booksByTwo];

      res.json(response);
  } catch (error) {
      console.error('Error searching books in API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



booksRouter.get('/search/title/:keyword', async (req, res, next) => {
  const { keyword } = req.params;
  try {
      const book = await searchTitle(keyword);
      res.json(book);
  } catch (error) {
      console.error(error, 'Error searching books for title in API');
  }
});

booksRouter.get('/search/author/:keyword', async (req, res, next) => {
  const { keyword } = req.params;
  try {

      const book = await searchAuthor(keyword);
      res.json(book);
  } catch (error) {
      console.error(error, 'Error searching books for author in API');
  }
});

booksRouter.get('/search/publisher/:keyword', async (req, res, next) => {
  const { keyword } = req.params;
  try {
      const book = await searchPublisher(keyword);
      res.json(book);
  } catch (error) {
      console.error(error, 'Error searching books for publisher in API');
  }
});

booksRouter.get('/search/isbn/:keyword', async (req, res, next) => {
  const { keyword } = req.params;
  try {
      const book = await searchISBN(keyword);
      res.json(book);
  } catch (error) {
      console.error(error, 'Error searching books for ISBN in API');
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

booksRouter.get('/admin/dash', async (req, res, next) => {
  try {
    const response = await getLastTenBooks();
    res.status(200).json(response);
  } catch (error) {
    console.errror(error, 'Error getting last 10 books in API');
  }
});

module.exports = booksRouter;


