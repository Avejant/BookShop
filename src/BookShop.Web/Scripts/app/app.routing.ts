import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookViewPage } from "./pages/book-view.page";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { ExtendedSearchPage } from "./pages/extended-search.page";
import { NotFoundPage } from "./pages/not-found.page";
import { CategoryBooksListPage } from "./pages/category-books-list.page"
import { AuthorListPage } from "./pages/author-list.page";

const appRoutes: Routes = [
    {
        path: "",
        component: HomePage
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "search",
        component: ExtendedSearchPage
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "book/:id",
        component: BookViewPage
    },
    {
        path: "books/category/:id",
        component: CategoryBooksListPage
    },
    {
        path: "authors",
        component: AuthorListPage
    },
    {
        path: "**",
        component: NotFoundPage
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);