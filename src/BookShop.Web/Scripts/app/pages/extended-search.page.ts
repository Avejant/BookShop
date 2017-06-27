import { Component, OnInit } from "@angular/core";
import { BookService } from "../services/book.service";
import { Query } from "../models/query";

@Component({
    selector: "extended-search-page",
    templateUrl: "./../templates/extended-search.page.html"
})


export class ExtendedSearchPage {
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