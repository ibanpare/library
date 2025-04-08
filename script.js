const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

/*

Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
*/
const bookContainer = document.querySelector(".book-grid")

function displayBooks(libraryArray) {
    for(const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.textContent = book.title;
        bookContainer.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "read");
addBookToLibrary("1984", "George Orwell", 328, "unread");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "read");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, "unread");


