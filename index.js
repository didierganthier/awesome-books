// Get inputs value
const titleInput = document.querySelector('.title-value');
const authorInput = document.querySelector('.author-value');
console.log(titleInput, authorInput);

let booksObject = [];

// Pouplate the HTML with the books
const populateHTML = (books) => {
    const booksContainer = document.createElement('div');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        booksContainer.innerHTML += `
            <div class="book">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <button type="button" class="remove-btn">Remove</button>
                <hr/>
            </div>
            `;
    });
    document.querySelector('.books').appendChild(booksContainer);
}

populateHTML(booksObject);

// // Add event listener to button
document.getElementsByClassName('add-books')[0].addEventListener('click', function() {
    booksObject.push({
        title: titleInput.value,
        author: authorInput.value
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