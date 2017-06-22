import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";

@Component({
    selector: "book-view-page",
    template: `
        <div *ngIf="book" class="book-view">
            <h2> {{book.Title}} </h2>
            <p (click)="showAuthorBooks(book.Author.Id)">Author: {{book.Author.Name}}</p>
            <p (click)="showAuthorBooks(book.Author.Id)">Category: {{book.Category.Name}}</p>
            <p> {{book.Description}} </p>
            <p> {{book.Price}} <button>Buy</button></p>
        </div>
    `
})

export class BookViewPage {
    book: Book;

    constructor(private bookService: BookService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.bookService.get(id).subscribe(
                book => { this.book = book; }
            );
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    showAuthorBooks(authorId: string) {
        this.router.navigate(["books/author/", authorId]);
    }

}