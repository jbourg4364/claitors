const BASE = 'http://localhost:8080/api';

// deployment`
// const BASE = '/api';

export const getAllBooks = async () => {
    try {
        const response = await fetch(`${BASE}/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error, 'Error getting all books in middleware');
    }
};

export const getBookById = async (id) => {
    try {
        const response = await fetch(`${BASE}/books/details/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error, 'Error getting book details in middleware');
    }
};

export const searchBooks = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/books/search/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error searching books in middleware')
    };
};

export const getAllContent = async () => {
    try {
        const response = await fetch(`${BASE}/content`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error getting all content in middleware');
    }
};

export const editContent = async (id, title, description, imageurl, buttonurl, price) => {
    try {

        const response = await fetch(`${BASE}/content/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, description, imageurl, buttonurl, price })
        });
        
        const result = await response.json();
    
        return result;
    } catch (error) {
        console.error(error, 'Error editing content in middleware');
    };
};

export const createBook = async (
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
) => {
  try {
    const response = await fetch(`${BASE}/books`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error, "Error creating book in middleware");
  }
};

export const editBook = async (
    id,
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
    ) => {
    try {

        const response = await fetch(`${BASE}/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
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
             })
        });
        
        const result = await response.json();
    
        return result;
    } catch (error) {
        console.error(error, 'Error editing book in middleware');
    };
};
