﻿import { Component, OnInit } from "@angular/core";
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
        <div class="panel-heading"><b>Buy book</b></div>
            <div class="panel-body">
                <div class="media">
                <div class="media-left">
                    <img src="http://placehold.it/200x260">
                    <br>
                    <center><p><b>Rating:</b> <span class="badge"><b>10</b></span></p></center>
                    <b>Rate: </b> <span *ngFor="#number of [1,2,3,4,5,6,7,8,9,10]" class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                </div>
                <div class="media-body">
                    <div class="col-md-1"></div>
                    <div class="col-md-11">
                    <h3 class="media-heading"><b>{{book.Title}}</b></h3>
                    <p> <b>Author:</b> {{book.Author}}</p>
                    <p> <b>Category:</b> {{book.Category}}</p>
                    <p> <b>ISBN:</b> {{book.ISBN}}</p>
                    <p> <b>Year of publication:</b> {{book.YearOfPublication}} </p> 
                    <p> <b>Page count: </b> {{book.PageCount}}</p>
                    <p> <b>Price:</b>{{book.Price}}</p>
                    <p><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Buy</button></p>
                    </div>
                </div>
            </div>
            <br>

                <p> {{book.Description}} </p>
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