const divBooks = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book > button");
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        for (const property in book) {
            const bookParagraph = document.createElement("p");
            bookParagraph.textContent = book[property];
            bookCard.appendChild(bookParagraph);
        }
        return bookCard;
}

function displayAllBooks(arrayOfBooks) {
    arrayOfBooks.forEach(book => divBooks.appendChild(createBookCard(book)));
}

addBookToLibrary(new Book("Tittel", "forfatter", 123, true));
addBookToLibrary(new Book("Tittel", "forfatter", 321, true));
displayAllBooks(myLibrary);
