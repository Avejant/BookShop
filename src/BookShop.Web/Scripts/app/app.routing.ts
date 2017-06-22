import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookViewComponent } from "./components/book-view.component";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { ExtendedSearchComponent } from "./components/extended-search.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import { AuthorComponent } from "./components/author.component";
import { CategoryBooksComponent } from "./components/category-books.component"

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
        component: ExtendedSearchComponent
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
        path: "books/category/:id",
        component: CategoryBooksComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);