///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import "rxjs/Rx";

import { AppComponent } from "./components/app.component";
import { BookListComponent } from "./components/book-list.component";
import { BookViewComponent } from "./components/book-view.component";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { BookSearchComponent } from "./components/book-search.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import { AuthorComponent } from "./components/author.component";
import { CategoryListComponent } from "./components/category-list.component";

import { AppRouting } from "./app.routing";
import { BookService } from "./services/book.service";
import { AuthorService } from "./services/author.service";
import { CategoryService } from "./services/category.service";
import { AuthService } from "./services/auth.service";
import { AuthHttp } from "./wrappers/auth.http";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        BookListComponent,
        BookViewComponent,
        BookSearchComponent,
        HomeComponent,
        LoginComponent,
        PageNotFoundComponent,
        AuthorComponent,
        CategoryListComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppRouting
    ],
    // providers
    providers: [
        BookService,
        AuthorService,
        CategoryService,
        AuthService,
        AuthHttp
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }