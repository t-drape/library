// function Book(id, title, author, pages, have_read) {
//   if(!new.target) {
//     throw Error("Must use new!");
//   }
//   this.id = id;
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.have_read = have_read;
//   this.bookInfo = function() {
//     return title + " by " + author + ", " + pages + " pages." + "\nBook Status: " + have_read;
//   };
// };

class Book {
  static myBooks = [];

  static addBookToCollection(title, author, pages, have_read) {
    const newBook = new Book(title, author, pages, have_read);
    Book.myBooks.push(newBook);
  }

  static removeAllBooks(lib) {
    while (lib.firstChild) {
      lib.removeChild(lib.firstChild);
    };
  }

  static viewCollection() {
    const lib = document.querySelector(".library");
    Book.removeAllBooks(lib);
    for (let b of Book.myBooks) {
      lib.appendChild(b.createNewCard());
    };
  }

  static adjustStatus(event) {
    let changeBook = Book.myBooks.find((book) => book.id === event.target.parentElement.parentElement.dataset.book);
    changeBook.toggleStatus();
    Book.viewCollection();
  }

  static removeBook(event) {
    const delBook = Book.myBooks.find((book) => book.id === event.target.parentElement.parentElement.dataset.book);
    Book.myBooks.splice(Book.myBooks.indexOf((delBook)), 1);
    Book.viewCollection();
  }

  constructor(title, author, pages, have_read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
  }

  toggleStatus() {
    if (this.have_read === true) {
      this.have_read = false;
    } else {
      this.have_read = true;
    }
  }

  createNewCard() {
    let newBook = document.createElement('div');
    let bookTitle = document.createElement('p');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookStatus = document.createElement('p');
    let buttons = document.createElement("div");
    let button = document.createElement('button');
    let changeStatus = document.createElement('button');
    newBook.setAttribute("data-book", this.id);
    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    bookPages.textContent = this.pages;
    if (this.have_read === true) {
      bookStatus.textContent = "Finished";
    } else {
      bookStatus.textContent = "Not Finished";
    }
    button.textContent = "Remove Book";
    changeStatus.textContent = "Change Status";
    button.addEventListener("click", Book.removeBook);
    changeStatus.addEventListener("click", Book.adjustStatus);
    buttons.appendChild(button);
    buttons.appendChild(changeStatus);
    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(bookStatus);
    newBook.appendChild(buttons);
    newBook.classList.add("card");
    buttons.classList.add("buttons-container");
    return newBook;
  }

}

function addNewBook(event) {
  event.preventDefault();
  const data = new FormData(form);
  let status;
  status = (data.get("status") === "true") ? true : false;
  Book.addBookToCollection(data.get("title"), data.get("author"), data.get("pages"), status);
  Book.viewCollection();
  form.reset();
  showHide();
}

function showHide() {
  showButton.classList.toggle("show");
  form.classList.toggle("show");
}

const form = document.querySelector("form");
const submitter = document.querySelector("input[type=submit]");
const data = new FormData(form);
const showButton = document.querySelector("button");
  showButton.addEventListener("click", showHide);
form.addEventListener("submit", addNewBook);



