const BASE = 'http://localhost:8080/api';

// deployment`
// const BASE = 'api';

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