class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
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

  if (books.length === 0) {
    booksContainer.innerHTML = '<p class="no-books">No books added yet</p>';
    // Remove border from books container
    booksContainer.style.border = 'none';
  } else {
    booksContainer.style.border = '2px solid #000';
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
      booksContainer.innerHTML += `
      <div class="book">
        <div class="data-container">
          <p class="title">${book.title}</p>
          <span>by</span>
          <p class="author">${book.author}</p>
        </div>
        <button type="button" class="remove-btn">Remove</button>
      </div>
    `;
      // Different background for odd and even books
      if (index % 2 === 0) {
        booksContainer.lastElementChild.style.backgroundColor = '#DDD';
      } else {
        booksContainer.lastElementChild.style.backgroundColor = '#fff';
      }
    });
  }
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
    // Remove border from books container if no books left
    if (document.querySelector('.books').children.length === 0) {
      document.querySelector('.books').style.border = 'none';
      // Add no books message
      document.querySelector('.books').innerHTML = '<p class="no-books">No books added yet</p>';
    }
  }
};

document.querySelector('.add-books').addEventListener('click', addBook);
document.querySelector('.books').addEventListener('click', removeBook);

displayBooks();
