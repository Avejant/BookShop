import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";

@Component({
    selector: "book-view-page",
    templateUrl: "./../templates/book-view.page.html"
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