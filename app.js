class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    static displayBooks() {
        const StoreBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434',
            },

            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '45665889',
            }
        ];

        const books = StoreBooks;

        books.forEach((book) => UI.addBookToList(book));        
    }

    static showAlert(message, classname){
        const div = document.createElement('div');
        // div.classList.add(`alert alert-${classname}`);
        div.className = `alert alert-${classname}`;
        div.append(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }



    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <a href='#' class='btn btn-danger btn-sm delete' >X</a>
            </td> 
        `;
        list.append(row);

        
    }

    static deleteBooks(el) {
        if(el.classList.contains('delete')){
            el.closest('tr').remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        
    }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    if(title == '' || author == '' || isbn == ''){
        UI.showAlert('Please Fill All the fields', 'danger');
    }else{
        UI.showAlert('Book Added', 'success');
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);

        UI.clearFields();
    }
})


document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBooks(e.target);
    UI.showAlert('Book Removed', 'warning');
})