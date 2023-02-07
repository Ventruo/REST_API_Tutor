// models for books
// structure of the book object
// {
//     "id": "",
//     "title": "",
//     "author": "",
//     "published_date": "",
//     "status": true, // true for available, false for unavailable
// }

// NO DATABASE NEEDED!
// array of books
let books = [];

module.exports = {
    getAllBooks: (title) => {
        // return all books (status = true)
        // if title is provided, return the book with contains that title
        // else return all books
        if (title){
            return books.filter(
                (book) =>
                    book.title.toLowerCase().includes(title.toLowerCase()) &&
                    book.status
            );
        }
        return books.filter((book) => book.status);
    },

    getBook: (id) => {
        // get a book by id
        return books.find((book) => book.id == id && book.status);
    },

    addBook: (title, author, published_date) => {
        // add a new book
        const newBook = {
            id: books.length + 1,
            title: title,
            author,
            published_date,
            status: true,
        };
        books.push(newBook);
        return books;
    },

    updateBook: (id, title, author, published_date) => {
        // update a book
        const book = books.find((book) => book.id == id);
        if (book){
            if (book.status) {
                book.title = title;
                book.author = author;
                book.published_date = published_date;
            }
        }
        return book;
    },

    deleteBook: (id) => {
        // delete a book (change status to false)
        const book = books.find((book) => book.id == id);
        if (book) {
            if (book.status) book.status = false;
            else return null;
        }
        return book;
    },
};
