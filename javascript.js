function Book(title, author, pages, readYet) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

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
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);

console.log(theHobbit.info());