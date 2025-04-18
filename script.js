let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.changeStatus = function() {
    if(this.read === "read") {
        this.read = "unread"
    } else this.read = "read";
  }
}

// Adds a new Book object to the library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Show the modal form when the "Add New Book" button is clicked
const addNewBookButton = document.querySelector(".add-new");
const dialog = document.querySelector("dialog");
addNewBookButton.addEventListener("click", () => dialog.showModal());

// Form inputs and container for rendering book cards
const bookContainer = document.querySelector(".book-grid");
const bookTitleInput = document.querySelector("input[id=book_title]");
const bookAuthorInput = document.querySelector("input[id=book_author]");
const bookPageInput = document.querySelector("input[id=book_pages]");
const bookStatusInput = document.querySelector("input[id=book_status]");

// Handle new book submission from modal form
const submitNewBook = document.querySelector(".submit-book");
submitNewBook.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("what now");
    const readNewBook = bookStatusInput.checked ? "read" : "not read";
    addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, bookPageInput.value, readNewBook)
    dialog.close();
    cleanLibrary()
    displayBooks(myLibrary);
})

// Generate visual cards for each book so users can see their library on the page
function displayBooks(libraryArray) {
  for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookContainer.appendChild(bookCard);
    bookCard.setAttribute("data-id", book.id)

    const bookTitle = document.createElement("p");
    bookCard.appendChild(bookTitle);
    bookTitle.textContent = book.title;
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("p");
    bookCard.appendChild(bookAuthor);
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add("book-author");

    const bookPages = document.createElement("p");
    bookCard.appendChild(bookPages);
    bookPages.textContent = `${book.pages}`;
    bookPages.classList.add("book-pages");
    
    const bookRead = document.createElement("p");
    bookCard.appendChild(bookRead);
    bookRead.textContent = book.read;
    bookRead.classList.add("book-read");

    const removeBook = document.createElement("button");
    bookCard.appendChild(removeBook);
    removeBook.classList.add("remove-button");
    removeBook.setAttribute("data-id", book.id)

    const trashIcon = document.createElement("span");
    removeBook.appendChild(trashIcon);
    trashIcon.textContent = "delete";
    trashIcon.setAttribute("data-id", book.id)
    trashIcon.classList.add("material-symbols-outlined");

    removeBook.addEventListener("click", (e) => {
        const myId = e.target.getAttribute("data-id");
        myLibrary = myLibrary.filter((item) => item.id !== myId);
        cleanLibrary();
        displayBooks();
    })

    const readBook = document.createElement("button");
    bookCard.appendChild(readBook);
    readBook.classList.add("read-button");
    readBook.setAttribute("data-id", book.id)

    const bookIcon = document.createElement("span");
    bookIcon.textContent = "auto_stories";
    bookIcon.classList.add("material-symbols-outlined");
    bookIcon.setAttribute("data-id", book.id)
    readBook.appendChild(bookIcon);

    readBook.addEventListener("click", (e) => {
        const myId = e.target.getAttribute("data-id");
        const myBook = myLibrary.find((element) => element.id == myId);
        myBook.changeStatus();
        cleanLibrary();
        displayBooks(myLibrary);
    })
  }
}

function cleanLibrary() {
    const allCards = document.querySelectorAll(".book-card");
    allCards.forEach((element) => element.remove());
}

// Pre-populate the library with some books for testing purposes
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "read");
addBookToLibrary("1984", "George Orwell", 328, "unread");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "read");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, "unread");

// Render the initial book list
displayBooks(myLibrary);