function Book(id, title, author, pages, have_read) {
  if(!new.target) {
    throw Error("Must use new!");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = have_read;
  this.bookInfo = function() {
    return title + " by " + author + ", " + pages + " pages." + "\nBook Status: " + have_read;
  };
};

function addBookToCollection(title, author, pages, have_read, arr) {
  newBook = new Book(crypto.randomUUID(), title, author, pages, have_read);
  arr.push(newBook);
}

function createNewCard(book) {
  let newBook = document.createElement('div');
  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let bookPages = document.createElement('p');
  let bookStatus = document.createElement('p');
  let buttons = document.createElement("div");
  let button = document.createElement('button');
  let changeStatus = document.createElement('button');
  newBook.setAttribute("data-book", book.id);
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  if (book.have_read === true) {
    bookStatus.textContent = "Finished";
  } else {
    bookStatus.textContent = "Not Finished";
  }
  button.textContent = "Remove Book";
  changeStatus.textContent = "Change Status";
  button.addEventListener("click", removeBook);
  changeStatus.addEventListener("click", adjustStatus);
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

function removeAllBooks(lib) {
  while (lib.firstChild) {
    lib.removeChild(lib.firstChild);
  };
};


function viewCollection(books) {
  const lib = document.querySelector(".library");
  removeAllBooks(lib);
  for (book of books) {
    lib.appendChild(createNewCard(book));
  };
}

function addNewBook(event) {
  event.preventDefault();
  const data = new FormData(form);
  let status;
  status = (data.get("status") === "true") ? true : false;
  addBookToCollection(data.get("title"), data.get("author"), data.get("pages"), status, myBooks);
  viewCollection(myBooks);
  form.reset();
}

function removeBook(event) {
  let delBook = myBooks.find((book) => book.id === event.target.parentElement.parentElement.dataset.book);
  myBooks.splice(myBooks.indexOf((delBook)), 1);
  viewCollection(myBooks);
}

Book.prototype.toggleStatus = function() {
  console.log()
  if (this.have_read === true) {
    this.have_read = false;
  } else {
    this.have_read = true;
  }
}

function adjustStatus(event) {
  let changeBook = myBooks.find((book) => book.id === event.target.parentElement.parentElement.dataset.book);
  changeBook.toggleStatus();
  viewCollection(myBooks);
}

myBooks = [];


const form = document.querySelector("form");
const submitter = document.querySelector("input[type=submit]");
const data = new FormData(form);
const inputs = document.querySelectorAll("input");
form.addEventListener("submit", addNewBook);



