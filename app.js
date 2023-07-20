const divBooks = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book > button");
let numberOfBooks = 0;
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

function changeReadStatus(book, button) {

    if (book.read) {
        button.textContent = "Not read";
        book.read = false;

    } else {
        button.textContent = "Read";
        book.read = true;
    }
}

function createBookCard(book) {

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    for (const property in book) {

        if (property === "read") {

            const readButton = document.createElement("button");

            if (book[property]) { // true if read, else false
                readButton.textContent = "Read";

            } else {
                readButton.textContent = "Not read";
            }

            bookCard.appendChild(readButton);
            readButton.addEventListener("click", () => changeReadStatus(book, readButton));
            continue;
        }

        const bookParagraph = document.createElement("p");
        bookParagraph.textContent = book[property];
        bookCard.appendChild(bookParagraph);
    }
    return bookCard;
}

function displayAllBooks(arrayOfBooks) {

    arrayOfBooks.forEach(book => divBooks.appendChild(createBookCard(book)));
}

// testing
const book = new Book("Tittel", "forfatter", 123, true);
const book2 = new Book("Tittel", "forfatter", 321, true);
addBookToLibrary(book);
addBookToLibrary(book2);
displayAllBooks(myLibrary);

console.log(book);