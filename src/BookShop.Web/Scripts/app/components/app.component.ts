import { Component } from "@angular/core";

@Component({
    selector: "bookshop",
    template: `
        <h1>{{title}}</h1>
            <div class="menu">
                <a class="home" [routerLink]="['']">Home</a>
                | <a class="login" [routerLink]="['login']">Login</a>
                | <a class="search" [routerLink]="['search']">Search</a>
            </div>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {
    title = "Book Shop";
}