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
        bookParagraph.textContent = property.toUpperCase() + ": " + book[property];
        bookCard.appendChild(bookParagraph);
    }
    return bookCard;
}

function displayAllBooks(arrayOfBooks) {

    arrayOfBooks.forEach(book => divBooks.appendChild(createBookCard(book)));
}

function displayNewBook(newBook) {
    divBooks.appendChild(createBookCard(newBook));
}

// Adding new books

const form = document.createElement("form");
form.innerHTML = 
    `
    <input type="text" id="title" placeholder="Title" required>
    <input type="text" id="author" placeholder="Author" required>
    <input type="number" id="pages" placeholder="Pages" required>
    <div>
        <label>Read?</label> 
        <input type="checkbox" id="read">
    </div>
    <button id="submit-button" type="submit">Submit</button>
    `;

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const read = form.querySelector("#read").checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayNewBook(newBook);

    // remove form from page after submitting
    form.remove();
});

addBookButton.addEventListener("click", () => {

    document.querySelector("body").appendChild(form);
});




// testing
const book = new Book("Tittel", "forfatter", 123, true);
const book2 = new Book("Tittel", "forfatter", 321, true);
addBookToLibrary(book);
addBookToLibrary(book2);
displayAllBooks(myLibrary);

console.log(book);
