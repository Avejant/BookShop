import { Component } from "@angular/core";

@Component({
    selector: "category-books-list-page",
    template: `        
       <category-list></category-list>
       <paginated-book-list></paginated-book-list>
    `
})

export class CategoryBooksListPage { }