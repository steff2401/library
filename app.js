const divBooks = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book > button");

class Library {

    constructor() {

        this.arrayOfBooks = [];
    }

    addBook(book) {

        this.arrayOfBooks.push(book);
    }

    deleteBook(book) {

        const index = this.arrayOfBooks.indexOf(book);
        if (index !== -1) {
            this.arrayOfBooks.splice(index, 1);
        }
    }

    displayAllBooks() {

        this.arrayOfBooks.forEach((book) => divBooks.appendChild(book.createBookCard()));
    }

    displayNewBook(newBook) {

        divBooks.appendChild(newBook.createBookCard());
    }
}

class Book {

    constructor(title, author, pages, read) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus(readButton) {

        if (this.read) {
            readButton.textContent = "Not read";
            this.read = false;

        } else {
            readButton.textContent = "Read";
            this.read = true;
        }
    }

    createBookCard() {

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        for (const property in this) {
            if (property === "read") {

                const readDiv = document.createElement("div");
                readDiv.classList.add("read-div");
                const readButton = document.createElement("button");

                const readLabel = document.createElement("p");
                readLabel.textContent = "STATUS: ";
                readDiv.appendChild(readLabel);

                if (this[property]) {
                    readButton.textContent = "Read";

                } else {
                    readButton.textContent = "Not read";
                }

                readDiv.appendChild(readButton);
                bookCard.appendChild(readDiv);
                readButton.addEventListener("click", () => this.changeReadStatus(readButton));
                continue;

            } else {
                
                const bookInfo = document.createElement("p");
                bookInfo.textContent = property.toUpperCase() + ": " + this[property];
                bookCard.appendChild(bookInfo);
            }
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        bookCard.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            myLibrary.deleteBook(this);
            bookCard.remove();
        });

        return bookCard;
    }
}

const myLibrary = new Library();

addBookButton.addEventListener("click", () => {
    document.querySelector("body").appendChild(form);
});

const form = document.createElement("form");

form.innerHTML = `
  <input type="text" id="title" placeholder="Title" required>
  <input type="text" id="author" placeholder="Author" required>
  <input type="number" id="pages" placeholder="Pages" required>
  <div>
      <label for="read">Read?</label> 
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
    myLibrary.addBook(newBook);
    myLibrary.displayNewBook(newBook);
    form.remove();
});

myLibrary.displayAllBooks();
