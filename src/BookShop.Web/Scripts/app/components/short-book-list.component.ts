import { Component, Input, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";
import { Query } from "../models/query";

@Component({
    selector: "short-book-list",
    template: `
        <div class="panel panel-info"> 
            <div class="panel-heading"> 
                <h3 class="panel-title text-center"><b>{{title}}</b></h3>
            </div> 
            <div class="panel-body">
            <div class="row">
                <div class="col-md-1"></div>
                <ul class="books-list col-md-10">     
                <li class="col-md-3" *ngFor="let book of books" [class.selected]="book === selectedBook">
					<div class="thumbnail">
						<img src="http://placehold.it/200x200" alt="">
					</div>
					<div class="caption">
                            <center>
                            <p><i>{{book.Author}}</i></p>
						    <a class="link-without-href" (click)="onSelect(book)"><p><b>{{book.Title}}</b></p></a>
							<p>Price: {{book.Price}}</p>
                            <button type="button" class="btn btn-primary btn-sm">
                                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Buy
                            </button>
                            </center>
					</div>
                </li>
                </ul>
                <div class="col-md-1"></div>
            </div>
        </div>

    `
})

export class ShortBookListComponent {
    @Input() class: string;
    @Input('query') query: Query;
    title: string;
    selectedBook: Book;
    itemVisibility: boolean[];
    books: Book[];
    errorMessage: string;

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
        this.getBooks();

    }

    //ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    //    for (let propName in changes) {
    //        let changedProp = changes[propName];
    //        if (propName == "query") {
    //            this.query = changedProp.currentValue;
    //            this.getBooks();
    //        }
    //    }
    //}

    getBooks() {
        var s = null;
        switch (this.class) {
            case "latest":
            default:
                this.title = "Newest Books";
                s = this.bookService.getLatest();
                console.log("Load newest books")
                break;
            case "most-viewed":
                this.title = "Most Viewed Books";
                s = this.bookService.getMostViewed();
                console.log("Load Most Viewed books")
                break;
            case "random":
                this.title = "Random Books";
                s = this.bookService.getRandom();
                console.log("Load Random books")
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