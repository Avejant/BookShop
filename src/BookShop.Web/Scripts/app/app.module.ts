///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import "rxjs/Rx";

//Components
import { AppComponent } from "./components/app.component";
import { ShortBookListComponent } from "./components/short-book-list.component";
import { LoginComponent } from "./components/login.component";
import { CategoryListComponent } from "./components/category-list.component";
import { SearchComponent } from "./components/search.component";
import { CartComponent } from "./components/cart.component";
import { PaginatedBookListComponent } from "./components/paginated-book-list.component";

//Pages 
import { BookViewPage } from "./pages/book-view.page";
import { CategoryBooksListPage } from "./pages/category-books-list.page";
import { ExtendedSearchPage } from "./pages/extended-search.page";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { NotFoundPage } from "./pages/not-found.page";
import { AuthorListPage } from "./pages/author-list.page";

//Routing
import { AppRouting } from "./app.routing";

// Services
import { BookService } from "./services/book.service";
import { AuthorService } from "./services/author.service";
import { CategoryService } from "./services/category.service";
import { AuthService } from "./services/auth.service";

//Wrappers
import { AuthHttp } from "./wrappers/auth.http";

@NgModule({
    // directives, components, pages and pipes
    declarations: [
        AppComponent,
        ShortBookListComponent,
        BookViewPage,
        ExtendedSearchPage,
        HomePage,
        LoginComponent,
        LoginPage,
        NotFoundPage,
        CategoryListComponent,
        CategoryBooksListPage,
        SearchComponent,
        CartComponent,
        PaginatedBookListComponent
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