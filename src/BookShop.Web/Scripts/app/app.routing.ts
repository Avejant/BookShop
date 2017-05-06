import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookListComponent } from "./components/book-list.component";
import { BookViewComponent } from "./components/book-view.component";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { BookSearchComponent } from "./components/book-search.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import { AuthorComponent } from "./components/author.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "search",
        component: BookSearchComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "book/:id",
        component: BookViewComponent
    },
    {
        path: "books/author/:id",
        component: AuthorComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);