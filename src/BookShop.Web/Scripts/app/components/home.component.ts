import { Component } from "@angular/core";

@Component({
    selector: "home",
    template: `     
       <category-list></category-list>
       <div class="col-md-9">
        <short-book-list class="latest"></short-book-list>
        <short-book-list class="most-viewed"></short-book-list>
        <short-book-list class="random"></short-book-list>
       </div>
    `
})

export class HomeComponent { }