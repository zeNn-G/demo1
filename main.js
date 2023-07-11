import "./style.css";

const formSelector = document.querySelector("form");
const bookListRef = document.getElementById("book-list");

let bookList = [];

const addBook = (book) => {
  bookList = [...bookList, book];
};

const deleteBook = (isbn) => {
  bookList = bookList.filter((book) => book.isbn !== isbn);
};

const toast = (message) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  const className =
    message === "Book added successfully" ? "success" : "delete";
  toast.classList.add(`toast-${className}`);

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
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
  displayBooks();
  toast("Book added successfully");

  e.target.reset();
});

const displayBooks = () => {
  bookListRef.innerHTML = "";

  bookList.forEach((book) => {
    const bookItem = document.createElement("tr");

    bookItem.classList.add("book-item");

    bookItem.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td class="action">
            ${book.isbn}
            <button class="btn btn-delete" data-isbn="${book.isbn}">X</button>
        </td>
        `;

    bookListRef.appendChild(bookItem);
  });

  const deleteBtns = document.querySelectorAll(".btn-delete");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const isbn = e.target.dataset.isbn;
      deleteBook(isbn);
      displayBooks();
      toast("Book deleted successfully");
    });
  });
};

displayBooks();
