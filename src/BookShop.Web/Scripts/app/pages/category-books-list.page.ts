import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";

@Component({
    selector: "category-books-list-page",
    templateUrl: "./../templates/category-books-list.page.html"
})

export class CategoryBooksListPage {
    category: Category;

    constructor(private categoryService: CategoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe((params) => {
            var id = +params["id"];
            if (id) {
                this.categoryService.get(id).subscribe(
                    category => { this.category = category; }
                );
                console.log("Category with Id=" + id + " was loaded");
            }
            else {
                console.log("Invalid id: routing back to home...");
                this.router.navigate([""]);
            }
        });
    }
}