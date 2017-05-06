import { Component, Input, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";
import { Query } from "../models/query";

@Component({
    selector: "book-list",
    template: `
        <h2>{{title}}</h2>
        <ul class="books">
            <li *ngFor="let book of books" 
                [class.selected]="book === selectedBook">
                <span>{{book.Title}}</span> by 
                <span>{{book.Author.Name}}</span>
                <span>{{book.Category.Name}}</span>
                Price: 
                <span>{{book.Price}}</span>
                <button (click)="onSelect(book)">Buy</button>
            </li>
        </ul>
    `
})

export class BookListComponent {
    @Input() class: string;
    @Input('query') query: Query;
    title: string;
    selectedBook: Book;

    books: Book[];
    errorMessage: string;

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
        this.getBooks();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            if (propName == "query") {
                this.query = changedProp.currentValue;
                this.getBooks();
            }
        }
    }

    getBooks() {
        var s = null;
        switch (this.class) {
            case "latest":
            default:
                this.title = "Newest Books";
                s = this.bookService.getLatest();
                break;
            case "most-viewed":
                this.title = "Most Viewed Books";
                s = this.bookService.getMostViewed();
                break;
            case "random":
                this.title = "Random Books";
                s = this.bookService.getRandom();
                break;
            case "custom":
                this.title = "Searched Books";
                s = this.bookService.getCustom(this.query);
                break;
        }

        s.subscribe(
            books => this.books = books,
            error => this.errorMessage = <any>error
        );
    }

    onSelect(book: Book) {
        this.selectedBook = book;
        console.log("book with Id " + this.selectedBook.Id + " has been selected.");
        this.router.navigate(["book", this.selectedBook.Id]);
    }
}