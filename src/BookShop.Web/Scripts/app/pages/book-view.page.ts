import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";

@Component({
    selector: "book-view-page",
    template: `
        <category-list></category-list>
        <div class="col-md-8">
        <div *ngIf="book" class="book-view">
        <div class="panel panel-default">
        <div class="panel-heading"><b>{{book.Title}}</b></div>
            <div class="panel-body">
                <p> {{book.Description}} </p>
                <p> {{book.Price}} <button>Buy</button></p>
            </div>
        </div>
        </div>
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