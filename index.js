// Get inputs value
const titleInput = document.querySelector('.title-value');
const authorInput = document.querySelector('.author-value');

let booksObject = [];

// Get the books from the local storage
const getBooks = () => {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    booksObject = books;
  }
};

getBooks();

// Pouplate the HTML with the books
const populateHTML = (books) => {
  const booksContainer = document.createElement('div');
  booksContainer.innerHTML = '';
  books.forEach((book) => {
    booksContainer.innerHTML += `
            <div class="book" id="book${book.id}">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <button type="button" class="remove-btn" id="${book.id}">Remove</button>
                <hr/>
            </div>
            `;
  });
  document.querySelector('.books').appendChild(booksContainer);
};

populateHTML(booksObject);

// Add event listener to button
document.getElementsByClassName('add-books')[0].addEventListener('click', () => {
  booksObject.push({
    title: titleInput.value,
    author: authorInput.value,
    id: booksObject.length + 1,
  });
  // Clear the input fields
  titleInput.value = '';
  authorInput.value = '';

  // Add books object to local storage
  localStorage.setItem('books', JSON.stringify(booksObject));

  // Clear the books container
  document.querySelector('.books').innerHTML = '';
  // Populate the HTML with the new books
  populateHTML(booksObject);
});

// Add event listener to each remove button
document.getElementsByClassName('books')[0].addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const book = e.target.parentElement;
    book.remove();
    // Remove the book from the books object
    booksObject = booksObject.filter((b) => b.title !== book.querySelector('.title').textContent);
    // Add books object to local storage
    localStorage.setItem('books', JSON.stringify(booksObject));
  }
});
