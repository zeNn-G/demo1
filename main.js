import "./style.css";

const formSelector = document.querySelector("form");
const bookListSelector = document.querySelector(".book-list");

let bookList = [];

const addBook = (book) => {
  bookList = [...bookList, book];
};

formSelector.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const title = formData.get("title");
  const author = formData.get("author");
  const isbn = formData.get("isbn");

  const book = {
    title,
    author,
    isbn,
  };

  addBook(book);
});
