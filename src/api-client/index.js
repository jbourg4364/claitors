const BASE = 'http://localhost:8080/api';

// deployment
// const BASE = '/api';


export const loginAdmin = async (object) => {
    try {
        const response = await fetch(`${BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(object),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, message, user } = data;

            if (token) {
                localStorage.setItem('token', token);
                return { token, message, user };
            }

            return { message, error: data.error };
        } else {
            const { error, message } = await response.json();
            return { error, message };
        }

    } catch (error) {
        console.error(error, 'Error logging in Admin in middleware');
        return { error: 'Unexpected error occurred' };
    }
};


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


export const searchTitle = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/books/search/title/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error searching books for title in middleware')
    };
};

export const searchAuthor = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/books/search/author/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error searching books for author in middleware')
    };
};

export const searchPublisher = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/books/search/publisher/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error searching books for publisher in middleware')
    };
};

export const searchISBN = async (keyword) => {
    try {
        const response = await fetch(`${BASE}/books/search/isbn/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error, 'Error searching books for ISBN in middleware')
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

export const deleteBook = async (id) => {
    try {
      const response = await fetch(`${BASE}/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.ok) {
        // Check if the response status code is in the 2xx range
        // If it is, return a success message or any relevant data
        return { success: true, message: "Book deleted successfully" };
      } else {
        // If the response status code is not in the 2xx range, throw an error
        throw new Error(`Failed to delete the book. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const addIndBookToHome = async (label, title, description, imageurl, buttonurl, price) => {

    try {
        const response = await fetch(`${BASE}/content`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ label, title, description, imageurl, buttonurl, price })
        });
      
        const result = await response.json();
  
        return result;
    } catch (error) {
        console.error(error, 'Error adding individual book to home page in middleware');
    }
  };

  export const deleteContent = async (id) => {
    try {
        const response = await fetch(`${BASE}/content/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          });

          if (response.ok) {
            return { success: true, message: "Book deleted successfully from home page" };
          } else {
            throw new Error(`Failed to delete the book from home page. Status: ${response.status}`);
          }
    } catch (error) {
        console.error(error, 'Error deleting book from home page in middleware')
    }
  };

  export const getLast10Books = async () => {
    try {
        const response = await fetch(`${BASE}/books/admin/dash`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });

          const result = await response.json();
          return result;
    } catch (error) {
        console.error(error, 'Error getting last 10 books in middleware');
    }
  };

  export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${BASE}/upload`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
      
        return result;
    } catch (error) {
        console.error(error, 'Error uploading book image in middleware');
    }
};




  
  