function Book(id, title, author, pages, readYet) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readYet = readYet;

    this.info = function(){
        if (this.readYet){
            return `${this.title} by ${this.author}, ${this.pages}, read`
        } else {
            return `${this.title} by ${this.author}, ${this.pages}, not read yet`
        }
    };

    this.changeStatus = function() {
        if (this.readYet) {
            this.readYet = false;
        } else {
            this.readYet = true;
        }
        console.log("book status: " + this.readYet);
    }
}

function addBookToLibrary(title, author, pages, readYet){
    myLibrary.push(new Book(crypto.randomUUID(), title, author, pages, readYet));
}

function displayLibrary(){
    for (let book of myLibrary) {
        displayBook(book);
    }
}

function displayBook(book){
    let newRow = bookTableBody.insertRow(-1);
    newRow.id = book.id;
    let idCell = newRow.insertCell(0).textContent = book.id;
    let titleCell = newRow.insertCell(1).textContent = book.title;
    let authorCell = newRow.insertCell(2).textContent = book.author;
    let pagesCell = newRow.insertCell(3).textContent = book.pages;
    let statusCell = newRow.insertCell(4);

    if (book.readYet) {
        statusCell.textContent = "read";
    } else {
        statusCell.textContent = "unread";
    }

    statusCell.id = "status" + book.id;
    statusCell.addEventListener("click", () =>{
        book.changeStatus();
        if (book.readYet) {
            statusCell.textContent = "read";
        } else {
            statusCell.textContent = "unread";
        }
    });

    let removeCell = newRow.insertCell(5);
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        myLibrary.splice(index, 1);
        newRow.remove();
    });
    removeCell.appendChild(removeBtn);

}

function sortLibrary() {
    myLibrary.sort((a, b) => a.title.localeCompare(b.title));
}

const myLibrary = [];

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", false);
addBookToLibrary("2001: A Space Odyssey", "Arthur C. Clark", "221", false);
addBookToLibrary("Fahrenheit 459", "Ray Bradbury", "156", true);

sortLibrary();

const bookTableBody = document.getElementById("bookTableBody");

displayLibrary();

let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (e) {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;

    let readYet = false;
    
    if (status.toUpperCase() == "Y"){
        readYet = true;  
    }
    
    addBookToLibrary(title, author, pages, readYet);
    
    displayBook(myLibrary.at(-1));
});