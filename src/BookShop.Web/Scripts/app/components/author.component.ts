import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BookService } from "../services/book.service";
import { Book } from "../models/book";

@Component({
    selector: "author",
    template: `
        <h2>{{title}} <span>{{authorName}}</span></h2>
        <ul class="books">
            <li *ngFor="let book of books" 
                [class.selected]="book === selectedBook">
                <span>{{book.Title}}</span> by 
                <span>{{book.Author.Name}}</span>
                Price: 
                <span>{{book.Price}}</span>
                <button (click)="onSelect(book)">Buy</button>
            </li>
        </ul>
`
})

export class AuthorComponent {
    title: string;
    authorName: string;
    books: Book[];
    errorMessage: string;

    constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        var authorId = this.activatedRoute.snapshot.params["id"];

        this.bookService.getByAuthor(authorId).subscribe(
            books => { this.books = books; this.authorName = books[0].Author.Name; },
            error => this.errorMessage = <any>error
        );
        this.title = "Books by ";
    }

}