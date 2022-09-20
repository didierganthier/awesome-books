class Book {
  constructor(title, author, add, remove) {
    this.title = title;
    this.author = author;
    this.add = add;
    this.remove = remove;
  }

  addBook() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
  }

  removeBook() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const filteredBooks = books.filter((book) => book.title !== this.title);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
}

const titleInput = document.querySelector('.title-value');
const authorInput = document.querySelector('.author-value');

const displayBooks = () => {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const booksContainer = document.querySelector('.books');
  booksContainer.innerHTML = '';
  books.forEach((book) => {
    booksContainer.innerHTML += `
      <div class="book">
        <div class="data-container">
          <p class="title">${book.title}</p>
          <p class="author">${book.author}</p>
        </div>
        <button type="button" class="remove-btn">Remove</button>
      </div>
    `;
  });
};

const addBook = () => {
  const book = new Book(titleInput.value, authorInput.value);
  book.addBook();
  titleInput.value = '';
  authorInput.value = '';
  displayBooks();
};

const removeBook = (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const book = e.target.parentElement;
    const bookToRemove = new Book(book.querySelector('.title').textContent);
    bookToRemove.removeBook();
    book.remove();
  }
};

document.querySelector('.add-books').addEventListener('click', addBook);
document.querySelector('.books').addEventListener('click', removeBook);

displayBooks();
