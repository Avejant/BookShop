import { Component, OnInit } from "@angular/core";
import { BookService } from "../services/book.service";
import { Query } from "../models/query";

@Component({
    selector: "book-search",
    template: `
        <form #thisForm="ngForm">
        <label>
            By title:
            <input [(ngModel)]="query.Title" name="title" type="text">
        </label>
        <br>
        <label>
            By ID:
            <input [(ngModel)]="query.Id" name="id" type="text">
        </label>
        <br>
        <label>
            By author:
            <input [(ngModel)]="query.Author" name="author" type="text">
        </label>
        <br>
        <input type="button" value="Search" (click)="search(query)">
        </form>
        <short-book-list [class]='class' [query]='typedQuery'></short-book-list>
    `
})


export class ExtendedSearchComponent {
    query: Query;
    typedQuery: Query;
    class: string;

    ngOnInit() {
        this.class = "latest";
        this.query = new Query("", "", 0);
    }

    search(query: Query) {
        this.typedQuery = new Query(query.Author, query.Title, query.Id);
        this.class = "custom";
    }
}